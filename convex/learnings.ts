import { query, mutation } from "./_generated/server";
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    requireAdmin(identity);
    await ctx.db.patch(args.id, {
      title: args.title,
      url: args.url,
      videoId: args.videoId,
    });
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
