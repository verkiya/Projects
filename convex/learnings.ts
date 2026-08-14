import { query, mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Query that fetches everything and reconstructs the nested structure for LearningsView
export const getAllLearnings = query({
  args: {},
  handler: async (ctx) => {
    const notebooks = await ctx.db.query("notebooks").collect();
    const channels = await ctx.db.query("channels").collect();
    const videos = await ctx.db.query("videos").collect();

    // Reconstruct the nested structure to match the frontend expectations
    return notebooks.map((notebook) => {
      const notebookChannels = channels.filter(c => c.notebookId === notebook.id);
      
      return {
        _id: notebook._id,
        id: notebook.id,
        title: notebook.title,
        description: notebook.description,
        channels: notebookChannels.map(channel => ({
          _id: channel._id,
          name: channel.name,
          videos: videos.filter(v => v.notebookId === notebook.id && v.channelName === channel.name).map(v => ({
            _id: v._id,
            title: v.title,
            videoId: v.videoId,
            url: v.url
          }))
        }))
      };
    });
  },
});

export const addVideo = mutation({
  args: {
    notebookId: v.string(),
    channelName: v.string(),
    channelUrl: v.optional(v.string()),
    title: v.string(),
    videoId: v.optional(v.string()),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated. Please sign in to add videos.");
    }
    
    // Email whitelist check
    // Ensure the signed-in user's email matches the allowed admin emails
    // You can set ADMIN_EMAILS in the Convex dashboard settings (comma separated)
    const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (allowedEmails.length > 0 && identity.email) {
      if (!allowedEmails.includes(identity.email)) {
        throw new Error("Unauthorized. Your email is not allowed to make changes.");
      }
    } else if (allowedEmails.length > 0 && !identity.email) {
      throw new Error("Unauthorized. Could not verify email address.");
    }

    // Ensure notebook exists
    const notebook = await ctx.db
      .query("notebooks")
      .withIndex("by_notebook_id", (q) => q.eq("id", args.notebookId))
      .first();
      
    if (!notebook) {
      throw new Error(`Notebook '${args.notebookId}' not found in database.`);
    }

    // Ensure channel exists
    const channel = await ctx.db
      .query("channels")
      .withIndex("by_notebook_id", (q) => q.eq("notebookId", args.notebookId))
      .filter((q) => q.eq(q.field("name"), args.channelName))
      .first();

    if (!channel) {
      // Auto-create channel if it doesn't exist
      await ctx.db.insert("channels", {
        notebookId: args.notebookId,
        name: args.channelName,
        url: args.channelUrl,
      });
    }

    // Check for duplicate video in the same notebook (by videoId or title)
    if (args.videoId) {
      const existingById = await ctx.db
        .query("videos")
        .filter((q) =>
          q.and(
            q.eq(q.field("notebookId"), args.notebookId),
            q.eq(q.field("videoId"), args.videoId)
          )
        )
        .first();
      if (existingById) {
        return; // Skip duplicate
      }
    }

    const existingByTitle = await ctx.db
      .query("videos")
      .filter((q) =>
        q.and(
          q.eq(q.field("notebookId"), args.notebookId),
          q.eq(q.field("title"), args.title)
        )
      )
      .first();
    if (existingByTitle) {
      return; // Skip duplicate
    }

    await ctx.db.insert("videos", {
      notebookId: args.notebookId,
      channelName: args.channelName,
      title: args.title,
      videoId: args.videoId,
      url: args.url,
    });
  },
});

// Admin helpers
export const createNotebook = mutation({
  args: {
    id: v.string(),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    await ctx.db.insert("notebooks", {
      id: args.id,
      title: args.title,
      description: args.description,
    });
  }
});

function requireAdmin(identity: any) {
  if (!identity) throw new Error("Unauthenticated.");
  const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  if (allowedEmails.length > 0 && identity.email) {
    if (!allowedEmails.includes(identity.email)) {
      throw new Error("Unauthorized. Your email is not allowed to make changes.");
    }
  } else if (allowedEmails.length > 0 && !identity.email) {
    throw new Error("Unauthorized. Could not verify email address.");
  }
}

export const editVideo = mutation({
  args: {
    id: v.id("videos"),
    title: v.string(),
    url: v.string(),
    videoId: v.optional(v.string()),
    notebookId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);
    const patchData: any = {
      title: args.title,
      url: args.url,
      videoId: args.videoId,
    };
    if (args.notebookId !== undefined) {
      patchData.notebookId = args.notebookId;
    }
    await ctx.db.patch(args.id, patchData);
  }
});

export const editNotebook = mutation({
  args: {
    id: v.id("notebooks"),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);

    const notebook = await ctx.db.get(args.id);
    if (!notebook) throw new Error("Notebook not found.");

    const oldSlug = notebook.id;
    const newSlug = args.title.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

    // Update the notebook document
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      id: newSlug,
    });

    // If slug changed, cascade to channels and videos
    if (oldSlug !== newSlug) {
      const channels = await ctx.db.query("channels")
        .withIndex("by_notebook_id", q => q.eq("notebookId", oldSlug))
        .collect();
      for (const channel of channels) {
        await ctx.db.patch(channel._id, { notebookId: newSlug });
      }

      const videos = await ctx.db.query("videos")
        .filter(q => q.eq(q.field("notebookId"), oldSlug))
        .collect();
      for (const video of videos) {
        await ctx.db.patch(video._id, { notebookId: newSlug });
      }
    }
  }
});

export const editChannel = mutation({
  args: {
    id: v.id("channels"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);

    const channel = await ctx.db.get(args.id);
    if (!channel) throw new Error("Channel not found.");

    const oldName = channel.name;
    const newName = args.name.trim();

    await ctx.db.patch(args.id, { name: newName });

    // Cascade the name change to all videos under this channel
    if (oldName !== newName) {
      const videos = await ctx.db.query("videos")
        .withIndex("by_channel", q => q.eq("notebookId", channel.notebookId).eq("channelName", oldName))
        .collect();
      for (const video of videos) {
        await ctx.db.patch(video._id, { channelName: newName });
      }
    }
  }
});

export const deleteVideo = mutation({
  args: { id: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);
    await ctx.db.delete(args.id);
  }
});

export const deleteChannel = mutation({
  args: { id: v.id("channels") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);
    const channel = await ctx.db.get(args.id);
    if (!channel) return;
    
    const videos = await ctx.db.query("videos")
      .withIndex("by_channel", q => q.eq("notebookId", channel.notebookId).eq("channelName", channel.name))
      .collect();
    for (const video of videos) {
      await ctx.db.delete(video._id);
    }
    await ctx.db.delete(args.id);
  }
});

export const deleteNotebook = mutation({
  args: { id: v.id("notebooks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);
    const notebook = await ctx.db.get(args.id);
    if (!notebook) return;

    const channels = await ctx.db.query("channels")
      .withIndex("by_notebook_id", q => q.eq("notebookId", notebook.id))
      .collect();
    for (const channel of channels) {
      await ctx.db.delete(channel._id);
    }

    const videos = await ctx.db.query("videos")
      .filter(q => q.eq(q.field("notebookId"), notebook.id))
      .collect();
    for (const video of videos) {
      await ctx.db.delete(video._id);
    }
    await ctx.db.delete(args.id);
  }
});

export const deduplicateVideos = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);

    const allVideos = await ctx.db.query("videos").collect();
    const seen = new Set<string>();
    let removed = 0;

    for (const video of allVideos) {
      const key = `${video.notebookId}::${video.title}`;
      if (seen.has(key)) {
        await ctx.db.delete(video._id);
        removed++;
      } else {
        seen.add(key);
      }
    }

    return { removed };
  }
});

export const internalDeduplicateVideos = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allVideos = await ctx.db.query("videos").collect();
    const seen = new Set<string>();
    let removed = 0;

    for (const video of allVideos) {
      const key = `${video.notebookId}::${video.title}`;
      if (seen.has(key)) {
        await ctx.db.delete(video._id);
        removed++;
      } else {
        seen.add(key);
      }
    }

    return { removed };
  }
});

export const getStaleVideos = internalQuery({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    const staleThreshold = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    let stale = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("lastCheckedAt"), undefined))
      .take(args.limit);
      
    if (stale.length < args.limit) {
      const more = await ctx.db
        .query("videos")
        .withIndex("by_last_checked")
        .filter((q) => q.lt(q.field("lastCheckedAt"), staleThreshold))
        .take(args.limit - stale.length);
      stale = stale.concat(more);
    }
    
    return stale;
  }
});

export const updateVideoStatus = internalMutation({
  args: { 
    id: v.id("videos"), 
    status: v.union(v.literal("active"), v.literal("dead"), v.literal("private")) 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      lastCheckedAt: Date.now()
    });
  }
});

export const getVideosForTable = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("videos").collect();
  }
});

export const getDeadVideos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("videos")
      .withIndex("by_status")
      .filter((q) => q.eq(q.field("status"), "dead"))
      .collect();
  }
});

export const bulkUpdateVideos = mutation({
  args: { 
    videoIds: v.array(v.id("videos")),
    delete: v.optional(v.boolean()),
    notebookId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    for (const id of args.videoIds) {
      if (args.delete) {
        await ctx.db.delete(id);
      } else if (args.notebookId) {
        await ctx.db.patch(id, { notebookId: args.notebookId });
      } else {
        await ctx.db.patch(id, { status: "active" });
      }
    }
  }
});

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").collect();
    const channels = await ctx.db.query("channels").collect();
    const notebooks = await ctx.db.query("notebooks").collect();

    return {
      totalVideos: videos.length,
      totalChannels: channels.length,
      totalNotebooks: notebooks.length,
      videos: videos.map(v => ({ _creationTime: v._creationTime, notebookId: v.notebookId })),
      notebooks: notebooks.map(n => ({ id: n.id, title: n.title }))
    };
  }
});
