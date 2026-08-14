"use client";

/**
 * AdminOverviewPage
 * 
 * The main entry point for the Admin Dashboard.
 * Displays high-level analytics including total curated content, a 14-day activity heatmap,
 * and a category distribution pie chart using Recharts.
 */

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

export default function AdminOverviewPage() {
  const stats = useQuery(api.learnings.getDashboardStats);

  if (!stats) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // 1. Process data for the Activity Bar Chart (last 14 days)
  const activityData = Array.from({ length: 14 }).map((_, i) => {
    const date = startOfDay(subDays(new Date(), 13 - i));
    const count = stats.videos.filter(v => {
      const vDate = startOfDay(new Date(v._creationTime));
      return vDate.getTime() === date.getTime();
    }).length;
    
    return {
      date: format(date, "MMM dd"),
      count
    };
  });

  // 2. Process data for the Category Pie Chart
  const categoryCounts = stats.videos.reduce((acc: any, video) => {
    const title = stats.notebooks.find(n => n.id === video.notebookId)?.title || "Unknown";
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});
  
  const categoryData = Object.keys(categoryCounts).map(key => ({
    name: key,
    value: categoryCounts[key]
  }));
  
  const COLORS = ['#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#eab308'];

  return (
    <div className="flex flex-col gap-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Overview & Analytics</h1>
        <p className="text-text-secondary">
          High-level statistics and curation insights for your database.
        </p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-surface/30 border border-white/5 rounded-3xl">
          <h3 className="text-sm font-medium text-text-secondary mb-1">Total Curated Videos</h3>
          <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {stats.totalVideos}
          </div>
        </div>
        <div className="p-6 bg-surface/30 border border-white/5 rounded-3xl">
          <h3 className="text-sm font-medium text-text-secondary mb-1">Tracked Channels</h3>
          <div className="text-4xl font-black text-white">
            {stats.totalChannels}
          </div>
        </div>
        <div className="p-6 bg-surface/30 border border-white/5 rounded-3xl">
          <h3 className="text-sm font-medium text-text-secondary mb-1">Learning Categories</h3>
          <div className="text-4xl font-black text-white">
            {stats.totalNotebooks}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-surface/30 border border-white/5 rounded-3xl">
          <h3 className="font-bold text-lg mb-6">Learning Activity (Last 14 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff10' }}
                  contentStyle={{ backgroundColor: '#000000', borderRadius: '12px', border: '1px solid #ffffff20' }} 
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="p-6 bg-surface/30 border border-white/5 rounded-3xl">
          <h3 className="font-bold text-lg mb-6">Category Breakdown</h3>
          <div className="h-64 relative">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000000', borderRadius: '12px', border: '1px solid #ffffff20' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                No categorized videos yet.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
