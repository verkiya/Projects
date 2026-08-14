"use node";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import ytpl from "ytpl";
import { api, internal } from "./_generated/api";

export const importPlaylist = action({
  args: {
    playlistUrl: v.string(),
    notebookId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated.");
    const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (allowedEmails.length > 0 && identity.email) {
      if (!allowedEmails.includes(identity.email)) throw new Error("Unauthorized.");
    }

    try {
      const playlist = await ytpl(args.playlistUrl, { limit: 100 });
      const channelName = playlist.author.name;
      const channelUrl = playlist.author.url;

      for (const item of playlist.items) {
        await ctx.runMutation(api.learnings.addVideo, {
          notebookId: args.notebookId,
          channelName: channelName,
          channelUrl: channelUrl,
          title: item.title,
          url: item.shortUrl,
          videoId: item.id,
        });
      }
      return { success: true, count: playlist.items.length };
    } catch (err: any) {
      throw new Error(`Failed to import playlist: ${err.message}`);
    }
  }
});

export const checkVideoAvailability = internalAction({
  args: {},
  handler: async (ctx) => {
    // 1. Get a batch of stale videos
    const videos = await ctx.runQuery(internal.learnings.getStaleVideos, { limit: 50 });
    
    // 2. Check each video
    for (const video of videos) {
      let isDead = false;
      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}`;
        const response = await fetch(oembedUrl);
        if (response.status === 404 || response.status === 401 || response.status === 403) {
          isDead = true;
        }
      } catch (err) {
        // Network error, don't mark as dead, try again later
        continue;
      }
      
      // 3. Update status
      await ctx.runMutation(internal.learnings.updateVideoStatus, {
        id: video._id,
        status: isDead ? "dead" : "active",
      });
    }
  }
});
