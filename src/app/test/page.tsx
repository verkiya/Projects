"use client";

import { Navigation } from "@/components/navigation";
import { Play, Clock, ArrowRight, Search, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function TestLayoutsPage() {
  const learnings = useQuery(api.learnings.getAllLearnings);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  const channels = learnings?.flatMap(n => n.channels.map(c => ({ ...c, category: n.title }))) || [];
  const videos = learnings?.flatMap(n => n.channels.flatMap(c => c.videos.map(v => ({ ...v, channelId: c._id })))) || [];

  useEffect(() => {
    if (channels.length > 0 && !activeChannel) {
      setActiveChannel(channels[0]._id);
    }
  }, [channels, activeChannel]);

  if (!learnings) return <div className="min-h-screen bg-background pt-32 text-center text-white">Loading database...</div>;

  const MOCK_CHANNELS = channels.map(c => ({
    id: c._id,
    name: c.name,
    subscribers: "10K+",
    category: c.category,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random&color=fff`
  }));

  const MOCK_VIDEOS = videos.map(v => ({
    id: v._id,
    channelId: v.channelId,
    title: v.title,
    duration: "10:00",
    img: `https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`
  }));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-white pt-32 pb-24 px-6 md:px-12 overflow-hidden">
        
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Channel-Centric Layouts
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Exploring designs that specifically emphasize the relationship between YouTube Channels and their Videos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Layout Idea 4: The Master-Detail Sidebar */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-500" /> Idea 4: The Channel Sidebar (App-like)</h2>
              <p className="text-text-secondary mt-2">Provides a highly functional, desktop-app feel. Users select a channel on the left to instantly see its videos on the right. Extremely scalable for hundreds of channels.</p>
            </div>
            
            <div className="flex flex-col md:flex-row h-[600px] border border-white/10 rounded-3xl overflow-hidden bg-surface/30 backdrop-blur-xl">
              {/* Sidebar */}
              <div className="md:w-1/3 border-r border-white/10 bg-black/20 flex flex-col">
                <div className="p-6 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                    <input type="text" placeholder="Search channels..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-violet-500 transition-colors" />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-2 custom-scrollbar">
                  {MOCK_CHANNELS.map(channel => (
                    <button 
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center gap-4 transition-all ${activeChannel === channel.id ? 'bg-violet-500/20 border-violet-500/50 border' : 'hover:bg-white/5 border border-transparent'}`}
                    >
                      <img src={channel.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-sm">{channel.name}</div>
                        <div className="text-xs text-white/50">{channel.category} • {channel.subscribers}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Pane */}
              <div className="md:w-2/3 flex-1 overflow-y-auto custom-scrollbar p-8">
                {MOCK_CHANNELS.filter(c => c.id === activeChannel).map(channel => (
                  <div key={channel.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Channel Header */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                       <img src={channel.avatar} alt="" className="w-20 h-20 rounded-full object-cover ring-4 ring-white/5" />
                       <div>
                         <h2 className="text-3xl font-bold mb-2">{channel.name}</h2>
                         <div className="flex gap-3">
                           <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium">{channel.category}</span>
                           <span className="flex items-center gap-1 text-xs text-white/50"><Video className="w-3 h-3"/> {channel.subscribers}</span>
                         </div>
                       </div>
                    </div>

                    {/* Channel Videos */}
                    <h3 className="font-bold text-lg mb-6">Saved Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_VIDEOS.filter(v => v.channelId === channel.id).map(vid => (
                        <div key={vid.id} className="group cursor-pointer">
                          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/10">
                            <img src={vid.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
                                <Play className="w-4 h-4 ml-0.5 text-white" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-[10px] font-medium">
                              {vid.duration}
                            </div>
                          </div>
                          <h4 className="font-bold text-sm line-clamp-2 group-hover:text-violet-400 transition-colors">{vid.title}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Layout Idea 5: The Accordion / Stacking Sections */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500" /> Idea 5: Channel Stacks</h2>
              <p className="text-text-secondary mt-2">A scroll-heavy, highly visual layout where each channel gets a massive dedicated "block" on the page. Great for storytelling and immersive browsing.</p>
            </div>
            
            <div className="space-y-12">
              {MOCK_CHANNELS.map(channel => (
                <div key={channel.id} className="p-8 rounded-3xl bg-gradient-to-b from-surface/50 to-transparent border border-white/5">
                  <div className="flex justify-between items-end mb-8">
                    <div className="flex items-center gap-4">
                      <img src={channel.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <h3 className="text-2xl font-bold">{channel.name}</h3>
                        <p className="text-sm text-text-secondary">{channel.category}</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1">
                      Explore All <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MOCK_VIDEOS.filter(v => v.channelId === channel.id).map((vid, idx) => (
                      <div key={vid.id} className={`group cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                        <div className={`relative rounded-2xl overflow-hidden mb-3 border border-white/10 ${idx === 0 ? 'aspect-[2/1]' : 'aspect-video'}`}>
                          <img src={vid.img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className={`font-bold group-hover:text-orange-400 transition-colors ${idx === 0 ? 'text-2xl line-clamp-2 mb-2' : 'text-sm line-clamp-1 mb-1'}`}>{vid.title}</h4>
                            <div className="flex items-center gap-2 text-white/70 text-xs">
                              <Clock className="w-3 h-3" /> {vid.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
