import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Extract videoId from YouTube URL
const extractVideoId = (link: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = link.match(regExp);
  return (match && match[2].length === 11) ? match[2] : undefined;
};

export const seedLearnings = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data (optional, but good for idempotency)
    const existingNotebooks = await ctx.db.query("notebooks").collect();
    for (const nb of existingNotebooks) await ctx.db.delete(nb._id);
    const existingChannels = await ctx.db.query("channels").collect();
    for (const ch of existingChannels) await ctx.db.delete(ch._id);
    const existingVideos = await ctx.db.query("videos").collect();
    for (const v of existingVideos) await ctx.db.delete(v._id);

    const learnings = [
      {
        id: "system-design",
        title: "System Design",
        description: "Concepts and case studies for building scalable, resilient, and distributed systems.",
        channels: [
          {
            name: "Hello Interview",
            videos: [
              { title: "Kafka System Design Deep Dive w/ a Ex-Meta Staff Engineer", url: "https://www.youtube.com/watch?v=DU8o-OTeoCc", videoId: "DU8o-OTeoCc" },
              { title: "DB Indexing in System Design Interviews - B-tree, Geospatial, Inverted Index, and more!", url: "https://www.youtube.com/watch?v=BHCSL_ZifI0", videoId: "BHCSL_ZifI0" },
              { title: "Kafka vs RabbitMQ", url: "https://www.youtube.com/watch?v=1HOVtQ-_fcE", videoId: "1HOVtQ-_fcE" },
              { title: "Message Queues in System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=1ISRd0bS714", videoId: "1ISRd0bS714" },
              { title: "Distributed Transactions Explained: 2 Phase Commit vs Saga Pattern", url: "https://www.youtube.com/watch?v=DOFflggE_0Q", videoId: "DOFflggE_0Q" },
              { title: "API Design in System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=DQ57zYedMdQ", videoId: "DQ57zYedMdQ" },
              { title: "Data Modeling in System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=TUcPS6dsWx4", videoId: "TUcPS6dsWx4" },
              { title: "Sharding in System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=L521gizea4s", videoId: "L521gizea4s" },
              { title: "Concurrency in Low-level Design Interviews w/ Staff Engineer", url: "https://www.youtube.com/watch?v=d8rmosXttTE", videoId: "d8rmosXttTE" },
              { title: "Networking Essentials for System Design Interviews w/ Ex Meta Senior Manager", url: "https://www.youtube.com/watch?v=SHkbPm1Wrno", videoId: "SHkbPm1Wrno" },
              { title: "Object Storage in System Design Interviews w/ Ex-Meta Staff Engineer", url: "https://www.youtube.com/watch?v=RvaMHMxHjp4", videoId: "RvaMHMxHjp4" },
              { title: "Consistent Hashing: Easy Explanation for System Design Interviews", url: "https://www.youtube.com/watch?v=vccwdhfqIrI", videoId: "vccwdhfqIrI" },
              { title: "CAP Theorem in System Design Interviews", url: "https://www.youtube.com/watch?v=VdrEq0cODu4", videoId: "VdrEq0cODu4" },
              { title: "How to Prepare for System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=Ru54dxzCyD0", videoId: "Ru54dxzCyD0" },
              { title: "Caching in System Design Interviews w/ Meta Staff Engineer", url: "https://www.youtube.com/watch?v=1NngTUYPdpI", videoId: "1NngTUYPdpI" },
            ]
          },
          {
            name: "ByteByteGo",
            videos: [
              {
                title: "How to Answer Any System Design Interview Question",
                url: "https://www.youtube.com/watch?v=bUHFg8CZFws"
              },
              {
                title: "What is Rate Limiting?",
                url: "https://www.youtube.com/watch?v=FU4WlwfS3G0"
              }
            ]
          }
        ]
      },
      {
        id: "dsa",
        title: "Data Structures & Algorithms",
        description: "Deep dives into algorithms and problem-solving patterns.",
        channels: [
          {
            name: "NeetCode",
            videos: [
              {
                title: "Top K Frequent Elements",
                url: "https://www.youtube.com/watch?v=YPTqKIgVk-k"
              }
            ]
          }
        ]
      },
      {
        id: "full-stack",
        title: "Full Stack Web Development",
        description: "Notes on modern frameworks, databases, and deployment strategies.",
        channels: [
          {
            name: "Jack Herrington",
            videos: [
              {
                title: "Next.js App Router Authentication",
                url: "https://www.youtube.com/watch?v=iHj4j6cEQ8Y"
              }
            ]
          }
        ]
      }
    ];

    for (const notebook of learnings) {
      await ctx.db.insert("notebooks", {
        id: notebook.id,
        title: notebook.title,
        description: notebook.description,
      });

      for (const channel of notebook.channels) {
        await ctx.db.insert("channels", {
          notebookId: notebook.id,
          name: channel.name,
        });

        for (const video of channel.videos) {
          const videoId = (video as any).videoId || extractVideoId(video.url);
          await ctx.db.insert("videos", {
            notebookId: notebook.id,
            channelName: channel.name,
            title: video.title,
            videoId,
            url: video.url,
          });
        }
      }
    }
  },
});
