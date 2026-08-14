import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notebooks: defineTable({
    id: v.string(), // e.g. "system-design"
    title: v.string(),
    description: v.string(),
  }).index("by_notebook_id", ["id"]),
  
  channels: defineTable({
    notebookId: v.string(), // matches notebook.id
    name: v.string(), // e.g. "Hello Interview"
    url: v.optional(v.string()),
  }).index("by_notebook_id", ["notebookId"]),
  
  videos: defineTable({
    notebookId: v.string(), // matches notebook.id
    channelName: v.string(), // matches channel.name
    title: v.string(),
    videoId: v.optional(v.string()),
    url: v.string(),
    status: v.optional(v.union(v.literal("active"), v.literal("dead"), v.literal("private"))), // Tracks video availability
    lastCheckedAt: v.optional(v.number()), // Timestamp of last availability check
  }).index("by_channel", ["notebookId", "channelName"])
    .index("by_status", ["status"])
    .index("by_last_checked", ["lastCheckedAt"]),
});
