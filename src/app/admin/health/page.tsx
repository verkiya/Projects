"use client";

/**
 * AdminHealthPage
 * 
 * Displays a list of videos that have been flagged as "dead" (404/403) by the
 * weekly Convex cron job. Allows the admin to quickly bulk-delete broken embeds 
 * to ensure the public Learnings page always has functioning content.
 */

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Trash, RefreshCcw, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminHealthPage() {
  const deadVideos = useQuery(api.learnings.getDeadVideos) || [];
  const bulkUpdate = useMutation(api.learnings.bulkUpdateVideos);
  const runCheck = useAction(api.actions.runManualHealthCheck);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRunningCheck, setIsRunningCheck] = useState(false);

  const handleManualCheck = async () => {
    setIsRunningCheck(true);
    try {
      toast.info("Health check started. This may take a minute...");
      await runCheck();
      toast.success("Health check completed successfully!");
    } catch (error) {
      toast.error("Health check failed. Check console for details.");
      console.error(error);
    } finally {
      setIsRunningCheck(false);
    }
  };

  // This is a UI-triggered manual check (simulating what the cron does)
  // Usually, you'd trigger the action, but for this demo, we'll just list what's already flagged.

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${deadVideos.length} dead videos?`)) return;
    setIsDeleting(true);
    try {
      await bulkUpdate({ videoIds: deadVideos.map(v => v._id), delete: true });
      toast.success(`Successfully deleted ${deadVideos.length} dead videos.`);
    } catch (error) {
      toast.error("Failed to delete videos.");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Health & Availability</h1>
          <p className="text-text-secondary mt-2">
            Review videos that are marked as dead, private, or no longer available on YouTube.
          </p>
        </div>
        <button 
          onClick={handleBulkDelete}
          disabled={deadVideos.length === 0 || isDeleting}
          className="px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl hover:bg-rose-500/20 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <Trash className="w-4 h-4" />
          {isDeleting ? "Deleting..." : "Delete All Dead Links"}
        </button>
      </div>
      
      <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 mt-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-rose-400 mb-1 flex items-center gap-2"><RefreshCcw className={`w-4 h-4 ${isRunningCheck ? 'animate-spin' : ''}`} /> Automated Checker</h2>
          <p className="text-sm text-rose-200/70">The background checker runs weekly to ping the YouTube API and update this list.</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handleManualCheck}
            disabled={isRunningCheck}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            {isRunningCheck ? "Running..." : "Run Manual Check"}
          </button>
          <div className="text-3xl font-black text-rose-500">{deadVideos.length}</div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {deadVideos.length === 0 ? (
          <div className="text-center p-12 border border-white/10 border-dashed rounded-2xl text-text-secondary">
            All your saved videos are currently healthy and active! 🎉
          </div>
        ) : (
          deadVideos.map(video => (
            <div key={video._id} className="p-4 bg-surface/30 border border-white/5 rounded-xl flex items-center justify-between">
              <div>
                <a href={video.url} target="_blank" rel="noreferrer" className="font-medium hover:text-rose-400 transition-colors flex items-center gap-2">
                  {video.title} <ExternalLink className="w-3 h-3" />
                </a>
                <div className="text-xs text-text-secondary mt-1">
                  {video.channelName} • {video.notebookId}
                </div>
              </div>
              <button 
                onClick={() => bulkUpdate({ videoIds: [video._id], delete: true })}
                className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
