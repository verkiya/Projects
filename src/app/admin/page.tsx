"use client";

import { useState } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navigation } from "@/components/navigation";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";
import { fetchLikedVideos } from "../actions/youtube";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

function CategorySelector({ 
  value, 
  onChange, 
  learnings 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  learnings: any[]; 
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex items-center w-full justify-between px-4 py-3 h-[46px] rounded-xl bg-surface border border-white/10 text-text-primary hover:bg-surface/80 font-normal hover:text-white cursor-pointer outline-none text-left"
      >
        <span className="truncate">{value || "Ignore (Do not sync)"}</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-surface-elevated border-white/10 rounded-xl" align="start">
        <Command>
          <CommandInput
            placeholder="Search or create..."
            value={search}
            onValueChange={setSearch}
            className="text-white h-11"
          />
          <CommandList className="max-h-[200px] overflow-y-auto custom-scrollbar">
            <CommandEmpty className="py-3 text-center text-sm text-text-secondary">
              No category found.
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="ignore_do_not_sync"
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <Check className={cn("mr-2 h-4 w-4", !value ? "opacity-100" : "opacity-0")} />
                Ignore (Do not sync)
              </CommandItem>
              {learnings?.map((n) => (
                <CommandItem
                  key={n.id}
                  value={n.title}
                  onSelect={() => {
                    onChange(n.title);
                    setOpen(false);
                  }}
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === n.title ? "opacity-100" : "opacity-0")} />
                  {n.title}
                </CommandItem>
              ))}
            </CommandGroup>
            {search && !learnings?.some(n => n.title.toLowerCase() === search.toLowerCase()) && (
              <div
                className="p-2 px-4 text-sm cursor-pointer hover:bg-white/10 text-white flex items-center gap-2 border-t border-white/10"
                onClick={() => {
                  onChange(search);
                  setOpen(false);
                }}
              >
                <span className="bg-accent text-black px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
                Create "{search}"
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function AdminPage() {
  const [notebookId, setNotebookId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New States for CRUD and Importer
  const [activeTab, setActiveTab] = useState<"single" | "playlist" | "liked">("single");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingLiked, setIsFetchingLiked] = useState(false);
  const [fetchedLikedVideos, setFetchedLikedVideos] = useState<any[] | null>(null);
  const [channelCategoryMapping, setChannelCategoryMapping] = useState<Record<string, string>>({});
  const [comboOpen, setComboOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [channelComboOpen, setChannelComboOpen] = useState(false);
  const [channelSearch, setChannelSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<{
    type: "notebook" | "channel" | "video";
    data: any;
  } | null>(null);

  const addVideo = useMutation(api.learnings.addVideo);
  const deleteVideo = useMutation(api.learnings.deleteVideo);
  const deleteChannel = useMutation(api.learnings.deleteChannel);
  const deleteNotebook = useMutation(api.learnings.deleteNotebook);
  const editVideo = useMutation(api.learnings.editVideo);
  const createNotebook = useMutation(api.learnings.createNotebook);
  const importPlaylist = useAction(api.actions.importPlaylist);

  const learnings = useQuery(api.learnings.getAllLearnings);

  // Need to extract the videoId from a youtube URL
  const extractVideoId = (link: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : undefined;
  };

  const slugify = (text: string) => text.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Auto-fetch video title and channel details via YouTube oEmbed
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      if (!oembedRes.ok) throw new Error("Could not fetch video details from YouTube. Check the URL.");
      const oembedData = await oembedRes.json();

      const videoTitle = oembedData.title;
      const fetchedChannelName = oembedData.author_name;
      const fetchedChannelUrl = oembedData.author_url;

      const finalChannelName = channelName || fetchedChannelName;
      const finalChannelUrl = fetchedChannelUrl;
      const computedNotebookId = slugify(notebookId);

      if (!learnings?.some(n => n.id === computedNotebookId)) {
        await createNotebook({
          id: computedNotebookId,
          title: notebookId,
          description: `Videos related to ${notebookId}`
        });
      }

      await addVideo({
        notebookId: computedNotebookId,
        channelName: finalChannelName,
        channelUrl: finalChannelUrl,
        title: videoTitle,
        url,
        videoId: extractVideoId(url),
      });
      alert(`Video '${videoTitle}' added successfully!`);
      setUrl("");
      // Keep category and channel details for quick consecutive additions
      if (!channelName) setChannelName(finalChannelName);
    } catch (err: any) {
      alert("Error adding video: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);
    try {
      const computedNotebookId = slugify(notebookId);
      
      if (!learnings?.some(n => n.id === computedNotebookId)) {
        await createNotebook({
          id: computedNotebookId,
          title: notebookId,
          description: `Videos related to ${notebookId}`
        });
      }

      const res = await importPlaylist({ playlistUrl, notebookId: computedNotebookId });
      alert(`Successfully imported ${res.count} videos!`);
      setPlaylistUrl("");
    } catch (err: any) {
      alert("Error importing playlist: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleFetchLiked = async () => {
    setIsFetchingLiked(true);
    try {
      const videos = await fetchLikedVideos();
      setFetchedLikedVideos(videos);
      
      const initialMapping: Record<string, string> = {};
      const uniqueChannels = Array.from(new Set(videos.map(v => v.channelName || "Unknown")));
      
      uniqueChannels.forEach((channel: any) => {
        const existingNotebook = learnings?.find(n => n.channels.some((c: any) => c.name === channel));
        if (existingNotebook) {
          initialMapping[channel] = existingNotebook.title;
        }
      });
      setChannelCategoryMapping(initialMapping);
    } catch (err: any) {
      alert("Error fetching liked videos: " + err.message);
    } finally {
      setIsFetchingLiked(false);
    }
  };

  const handleSync = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fetchedLikedVideos) return;
    
    setIsSyncing(true);
    try {
      let successCount = 0;
      const createdCategories = new Set<string>();

      for (const video of fetchedLikedVideos) {
        const channelName = video.channelName || "Unknown";
        const category = channelCategoryMapping[channelName];
        if (!category) continue; // Ignore if no category selected

        try {
          const computedNotebookId = slugify(category);
          
          if (!createdCategories.has(computedNotebookId) && !learnings?.some(n => n.id === computedNotebookId)) {
            await createNotebook({
              id: computedNotebookId,
              title: category,
              description: `Videos related to ${category}`
            });
            createdCategories.add(computedNotebookId);
          }

          await addVideo({
            notebookId: computedNotebookId,
            channelName,
            title: video.title,
            url: video.url,
            videoId: video.videoId,
          });
          successCount++;
        } catch (err) {
          console.error("Error adding video", video.title, err);
        }
      }
      alert(`Successfully synced ${successCount} videos!`);
      setFetchedLikedVideos(null);
    } catch (err: any) {
      alert("Error syncing liked videos: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (type: "video" | "channel" | "notebook", id: string) => {
    try {
      if (type === "video") await deleteVideo({ id: id as any });
      if (type === "channel") await deleteChannel({ id: id as any });
      if (type === "notebook") await deleteNotebook({ id: id as any });
    } catch (err: any) {
      alert("Error deleting: " + err.message);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || selectedItem.type !== "video") return;
    try {
      let newNotebookId = selectedItem.data.notebookId;
      const newCategoryTitle = selectedItem.data.categoryTitle;

      if (newCategoryTitle) {
        newNotebookId = slugify(newCategoryTitle);
        if (!learnings?.some(n => n.id === newNotebookId)) {
          await createNotebook({
            id: newNotebookId,
            title: newCategoryTitle,
            description: `Videos related to ${newCategoryTitle}`
          });
        }
      }

      await editVideo({
        id: selectedItem.data._id,
        title: selectedItem.data.title,
        url: selectedItem.data.url,
        videoId: extractVideoId(selectedItem.data.url),
        notebookId: newNotebookId,
      });
      setSelectedItem(null);
    } catch (err: any) {
      alert("Error editing video: " + err.message);
    }
  };

  const uniqueChannels = Array.from(new Set(learnings?.flatMap(n => n.channels.map(c => c.name)) || []));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="w-full max-w-[1600px] xl:px-12 relative z-10 flex flex-col gap-8">
          <div className="flex items-center justify-end">
            <Show when="signed-in">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-20 h-20" } }} />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-6 py-2 rounded-full cursor-pointer bg-surface-elevated/50 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
            </Show>
          </div>

          <Show when="signed-in">
            <div className="flex flex-col gap-10 items-stretch w-full">

              {/* Database Overview */}
              <div className="p-10 rounded-[2.5rem] border border-white/10 bg-surface-elevated/40 backdrop-blur-3xl relative overflow-hidden flex flex-col min-h-[500px] order-2 w-full">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 relative z-10 shrink-0">Database Overview</h2>

                <div className="overflow-y-auto pr-4 relative z-10 flex-1 custom-scrollbar">
                  {learnings === undefined ? (
                    <div className="animate-pulse flex flex-col gap-4">
                      <div className="h-32 bg-white/5 rounded-2xl w-full"></div>
                      <div className="h-32 bg-white/5 rounded-2xl w-full"></div>
                    </div>
                  ) : learnings.length === 0 ? (
                    <p className="text-text-secondary">No data found in the database.</p>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {learnings.map(notebook => (
                        <div key={notebook.id} className="border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-sm group/notebook">
                          <h3
                            className="text-xl font-bold text-accent flex items-baseline gap-2 mb-4 cursor-pointer hover:text-white transition-colors w-fit"
                            onClick={() => setSelectedItem({ type: "notebook", data: notebook })}
                          >
                            {notebook.title}
                            <span className="text-sm font-normal text-text-secondary">({notebook.id})</span>
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-2 border-white/10 pl-4 ml-2">
                            {notebook.channels.map(channel => (
                              <div key={channel.name} className="group/channel">
                                <h4
                                  className="font-semibold text-text-primary mb-2 flex items-center cursor-pointer hover:text-white transition-colors w-fit"
                                  onClick={() => setSelectedItem({ type: "channel", data: channel })}
                                >
                                  {channel.name}
                                  <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-text-secondary shrink-0 ml-2">{channel.videos.length} videos</span>
                                </h4>
                                <ol className="flex flex-col gap-1.5 list-decimal list-inside ml-2">
                                  {channel.videos.map(video => (
                                    <li
                                      key={video._id}
                                      className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer py-1 pl-1"
                                      onClick={() => setSelectedItem({ type: "video", data: video })}
                                    >
                                      <span className="line-clamp-1 inline">{video.title}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Forms */}
              <div className="flex flex-col gap-4 order-1 w-full">
                <div className="flex bg-surface-elevated/40 p-1 rounded-2xl border border-white/10 backdrop-blur-xl w-fit relative z-10">
                  <button
                    onClick={() => setActiveTab("single")}
                    className={`px-4 py-2.5 p-2 mr-2 rounded-xl font-medium cursor-pointer transition-all duration-300 ${activeTab === 'single' ? 'bg-emerald-400 text-black' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                  >
                    Add Single Video
                  </button>
                  <button
                    onClick={() => setActiveTab("playlist")}
                    className={`px-4 py-2.5 mr-2 rounded-xl font-medium cursor-pointer transition-all duration-300 ${activeTab === 'playlist' ? 'bg-[#f472b6] text-black' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                  >
                    Import Playlist
                  </button>
                  <button
                    onClick={() => setActiveTab("liked")}
                    className={`px-4 py-2.5 rounded-xl font-medium cursor-pointer transition-all duration-300 ${activeTab === 'liked' ? 'bg-[#a855f7] text-black' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                  >
                    Sync Liked Videos
                  </button>
                </div>

                <div className="p-8 rounded-[2.5rem] border border-white/10 bg-surface-elevated/40 backdrop-blur-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />

                  {activeTab === "single" ? (
                    <>

                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 items-end">
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-text-secondary">Category</Label>
                          <Popover open={comboOpen} onOpenChange={setComboOpen}>
                            <PopoverTrigger
                                className="flex items-center w-full justify-between px-4 py-3 h-[46px] rounded-xl bg-surface border border-white/10 text-text-primary hover:bg-surface/80 font-normal hover:text-white cursor-pointer"
                            >
                                {notebookId || "Select or type..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-surface-elevated border-white/10 rounded-xl" align="start">
                              <Command>
                                <CommandInput
                                  placeholder="Search or create..."
                                  value={search}
                                  onValueChange={setSearch}
                                  className="text-white h-11"
                                />
                                <CommandList className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                  <CommandEmpty className="py-3 text-center text-sm text-text-secondary">
                                    No category found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {learnings?.map((n) => (
                                      <CommandItem
                                        key={n.id}
                                        value={n.title}
                                        onSelect={() => {
                                          setNotebookId(n.title);
                                          setComboOpen(false);
                                        }}
                                        className="text-white hover:bg-white/10 cursor-pointer"
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            notebookId === n.title ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {n.title}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  {search && !learnings?.some(n => n.title.toLowerCase() === search.toLowerCase()) && (
                                    <div
                                      className="p-2 px-4 text-sm cursor-pointer hover:bg-white/10 text-white flex items-center gap-2 border-t border-white/10"
                                      onClick={() => {
                                        setNotebookId(search);
                                        setComboOpen(false);
                                      }}
                                    >
                                      <span className="bg-accent text-black px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
                                      Create "{search}"
                                    </div>
                                  )}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-text-secondary">Channel Name (Optional)</Label>
                          <Popover open={channelComboOpen} onOpenChange={setChannelComboOpen}>
                            <PopoverTrigger
                              className="flex items-center w-full justify-between px-4 py-3 h-[46px] rounded-xl bg-surface border border-white/10 text-text-primary hover:bg-surface/80 font-normal hover:text-white cursor-pointer outline-none"
                            >
                              <span className="truncate">{channelName || "Auto-fetched if blank"}</span>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-surface-elevated border-white/10 rounded-xl" align="start">
                              <Command>
                                <CommandInput
                                  placeholder="Search or create..."
                                  value={channelSearch}
                                  onValueChange={setChannelSearch}
                                  className="text-white h-11"
                                />
                                <CommandList className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                  <CommandEmpty className="py-3 text-center text-sm text-text-secondary">
                                    No channel found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {uniqueChannels.map((cName) => (
                                      <CommandItem
                                        key={cName}
                                        value={cName}
                                        onSelect={() => {
                                          setChannelName(cName);
                                          setChannelComboOpen(false);
                                        }}
                                        className="text-white hover:bg-white/10 cursor-pointer"
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            channelName === cName ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {cName}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  {channelSearch && !uniqueChannels.some(c => c.toLowerCase() === channelSearch.toLowerCase()) && (
                                    <div
                                      className="p-2 px-4 text-sm cursor-pointer hover:bg-white/10 text-white flex items-center gap-2 border-t border-white/10"
                                      onClick={() => {
                                        setChannelName(channelSearch);
                                        setChannelComboOpen(false);
                                      }}
                                    >
                                      <span className="bg-accent text-black px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
                                      Create "{channelSearch}"
                                    </div>
                                  )}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-text-secondary">YouTube URL</Label>
                          <Input
                            required
                            type="url"
                            placeholder="https://youtube.com/watch?v=..."
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-surface border border-white/10 focus-visible:ring-accent outline-none text-text-primary transition-colors h-auto"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-auto w-full px-6 py-3 rounded-xl cursor-pointer bg-surface-elevated/50 backdrop-blur-xl border border-emerald-400/30 text-emerald-400 font-bold hover:bg-emerald-400/10 hover:border-emerald-400 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Adding..." : "Add to Portfolio"}
                        </Button>
                      </form>
                    </>
                  ) : (
                    <>

                      <form onSubmit={handleImport} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-end">
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-text-secondary">Category</Label>
                          <Popover open={comboOpen} onOpenChange={setComboOpen}>
                            <PopoverTrigger
                              className="flex items-center w-full justify-between px-4 py-3 h-[46px] rounded-xl bg-surface border border-white/10 text-text-primary hover:bg-surface/80 font-normal hover:text-white cursor-pointer outline-none"
                            >
                              {notebookId || "Select or type..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-surface-elevated border-white/10 rounded-xl" align="start">
                              <Command>
                                <CommandInput
                                  placeholder="Search or create..."
                                  value={search}
                                  onValueChange={setSearch}
                                  className="text-white h-11"
                                />
                                <CommandList className="max-h-[200px] overflow-y-auto custom-scrollbar">
                                  <CommandEmpty className="py-3 text-center text-sm text-text-secondary">
                                    No category found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {learnings?.map((n) => (
                                      <CommandItem
                                        key={n.id}
                                        value={n.title}
                                        onSelect={() => {
                                          setNotebookId(n.title);
                                          setComboOpen(false);
                                        }}
                                        className="text-white hover:bg-white/10 cursor-pointer"
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            notebookId === n.title ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {n.title}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  {search && !learnings?.some(n => n.title.toLowerCase() === search.toLowerCase()) && (
                                    <div
                                      className="p-2 px-4 text-sm cursor-pointer hover:bg-white/10 text-white flex items-center gap-2 border-t border-white/10"
                                      onClick={() => {
                                        setNotebookId(search);
                                        setComboOpen(false);
                                      }}
                                    >
                                      <span className="bg-accent text-black px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span>
                                      Create "{search}"
                                    </div>
                                  )}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium text-text-secondary">Playlist URL</Label>
                          <Input
                            required
                            type="url"
                            placeholder="https://youtube.com/playlist?list=..."
                            value={playlistUrl}
                            onChange={e => setPlaylistUrl(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-surface border border-white/10 focus-visible:ring-accent outline-none text-text-primary transition-colors h-auto"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isImporting}
                          className="h-auto w-full px-6 py-3 rounded-xl cursor-pointer bg-surface-elevated/50 backdrop-blur-xl border border-[#f472b6]/30 text-[#f472b6] font-bold hover:bg-[#f472b6]/10 hover:border-[#f472b6] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isImporting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Importing...
                            </>
                          ) : "Import All Videos"}
                        </Button>
                      </form>
                    </>
                  )}
                  {activeTab === "liked" && (
                    <div className="relative z-10 flex flex-col gap-6 w-full py-2">
                      {!fetchedLikedVideos ? (
                        <div className="flex flex-col gap-6 items-center text-center py-6">
                          <div className="flex flex-col gap-2 max-w-md">
                            <h3 className="text-xl font-bold text-white">Sync Liked Videos</h3>
                            <p className="text-sm text-text-secondary">
                              This will fetch all videos you liked on YouTube. You will then be able to assign a category for each YouTube channel before syncing them to your database.
                            </p>
                          </div>
                          <Button
                            onClick={handleFetchLiked}
                            disabled={isFetchingLiked}
                            className="h-auto w-full max-w-md px-6 py-3 rounded-xl cursor-pointer bg-surface-elevated/50 backdrop-blur-xl border border-[#a855f7]/30 text-[#a855f7] font-bold hover:bg-[#a855f7]/10 hover:border-[#a855f7] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isFetchingLiked ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Fetching from YouTube...
                              </>
                            ) : "Fetch Liked Videos"}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6 w-full">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white">Categorize Channels</h3>
                            <p className="text-sm text-text-secondary">
                              We found {fetchedLikedVideos.length} liked videos across {Array.from(new Set(fetchedLikedVideos.map(v => v.channelName || "Unknown"))).length} channels. Choose a category for each channel.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                            {Array.from(new Set(fetchedLikedVideos.map(v => v.channelName || "Unknown"))).map(channel => (
                              <div key={channel} className="flex flex-col gap-2 p-4 rounded-xl bg-surface/50 border border-white/5">
                                <span className="text-sm font-medium text-white truncate">{channel}</span>
                                <CategorySelector
                                  learnings={learnings || []}
                                  value={channelCategoryMapping[channel] || ""}
                                  onChange={(val) => setChannelCategoryMapping(prev => ({...prev, [channel]: val}))}
                                />
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-4 pt-4 border-t border-white/10">
                            <Button
                              onClick={() => setFetchedLikedVideos(null)}
                              className="px-6 py-3 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSync}
                              disabled={isSyncing}
                              className="flex-1 px-6 py-3 rounded-xl cursor-pointer bg-surface-elevated/50 backdrop-blur-xl border border-[#a855f7]/30 text-[#a855f7] font-bold hover:bg-[#a855f7]/10 hover:border-[#a855f7] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {isSyncing ? "Syncing to Database..." : "Sync Selected to Database"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Manage Modal */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null) }}>
              <DialogContent className="sm:max-w-md bg-surface-elevated/90 backdrop-blur-3xl border border-white/10 text-white rounded-[2.5rem] p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold capitalize">Manage {selectedItem?.type}</DialogTitle>
                </DialogHeader>

                  {selectedItem?.type === "video" ? (
                    <form onSubmit={handleEditSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-text-secondary">Category</Label>
                        <CategorySelector
                          learnings={learnings || []}
                          value={selectedItem.data.categoryTitle !== undefined ? selectedItem.data.categoryTitle : (learnings?.find(n => n.id === selectedItem.data.notebookId)?.title || selectedItem.data.notebookId)}
                          onChange={(val) => setSelectedItem({...selectedItem, data: {...selectedItem.data, categoryTitle: val}})}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-text-secondary">Video Title</Label>
                        <Input
                          required
                          type="text"
                          value={selectedItem.data.title}
                          onChange={e => setSelectedItem({...selectedItem, data: {...selectedItem.data, title: e.target.value}})}
                          className="px-4 py-3 rounded-xl bg-surface border border-white/10 focus-visible:ring-accent outline-none text-text-primary transition-colors h-auto"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-text-secondary">Video URL</Label>
                        <Input
                          required
                          type="url"
                          value={selectedItem.data.url}
                          onChange={e => setSelectedItem({...selectedItem, data: {...selectedItem.data, url: e.target.value}})}
                          className="px-4 py-3 rounded-xl bg-surface border border-white/10 focus-visible:ring-accent outline-none text-text-primary transition-colors h-auto"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Button type="button" variant="destructive" onClick={() => { handleDelete("video", selectedItem.data._id); setSelectedItem(null); }} className="rounded-xl cursor-pointer font-medium h-auto py-3">Delete</Button>
                        <div className="flex gap-4">
                          <Button type="button" variant="ghost" onClick={() => setSelectedItem(null)} className="rounded-xl cursor-pointer text-text-secondary hover:text-white hover:bg-white/5 h-auto py-3">Cancel</Button>
                          <Button type="submit" className="rounded-xl cursor-pointer bg-accent text-black font-bold hover:bg-accent/90 h-auto py-3 px-6">Save Changes</Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <p className="text-text-secondary">
                        You can delete this {selectedItem?.type} and all its contents from the database.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Button type="button" variant="destructive" onClick={() => { handleDelete(selectedItem?.type as any, selectedItem?.data._id); setSelectedItem(null); }} className="rounded-xl cursor-pointer font-medium h-auto py-3">Delete {selectedItem?.type}</Button>
                        <Button type="button" variant="ghost" onClick={() => setSelectedItem(null)} className="rounded-xl cursor-pointer text-text-secondary hover:text-white hover:bg-white/5 h-auto py-3 px-6">Cancel</Button>
                      </div>
                    </div>
                  )}
              </DialogContent>
            </Dialog>
          </Show>

          <Show when="signed-out">
            <div className="p-12 text-center rounded-3xl border border-white/10 bg-surface-elevated/40 backdrop-blur-3xl flex flex-col items-center justify-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h2 className="text-2xl font-medium text-text-secondary">Please sign in to access the dashboard</h2>
            </div>
          </Show>
        </div>
      </main>
    </>
  );
}
