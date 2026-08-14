"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function CategoryChart() {
  const stats = useQuery(api.learnings.getDashboardStats);

  if (!stats) {
    return (
      <div className="w-full h-[200px] bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
    );
  }

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
    <div className="w-full h-[200px] relative">
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
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
  );
}
