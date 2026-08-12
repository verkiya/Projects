"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import ytpl from "ytpl";
import { api } from "./_generated/api";

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
