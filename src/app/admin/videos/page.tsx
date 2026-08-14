"use client";

/**
 * AdminVideosPage
 * 
 * Provides a "Power User" data table view of all curated videos using TanStack Table.
 * Allows selecting multiple videos at once to perform bulk operations (e.g. bulk delete).
 * This component is intended for desktop use due to the dense data table layout.
 */

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { 
  useTable,
  tableFeatures,
  rowSortingFeature,
  rowSelectionFeature,
  createCoreRowModel, 
  flexRender, 
  createSortedRowModel, 
  SortingState 
} from "@tanstack/react-table";
import { Trash, Edit2, CheckSquare, Square, FolderSync } from "lucide-react";
import { toast } from "sonner";

export default function AdminVideosPage() {
  const videos = useQuery(api.learnings.getVideosForTable) || [];
  const stats = useQuery(api.learnings.getDashboardStats);
  const bulkUpdate = useMutation(api.learnings.bulkUpdateVideos);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Define columns for TanStack Table
  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <button
          onClick={table.getToggleAllRowsSelectedHandler()}
          className="p-1 text-white/50 hover:text-white"
        >
          {table.getIsAllRowsSelected() ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
        </button>
      ),
      cell: ({ row }: any) => (
        <button
          onClick={row.getToggleSelectedHandler()}
          className="p-1 text-white/50 hover:text-white"
        >
          {row.getIsSelected() ? <CheckSquare className="w-5 h-5 text-violet-500" /> : <Square className="w-5 h-5" />}
        </button>
      ),
    },
    {
      accessorKey: "title",
      header: "Video Title",
      cell: (info: any) => (
        <a href={info.row.original.url} target="_blank" rel="noreferrer" className="font-medium hover:text-violet-400">
          {info.getValue()}
        </a>
      ),
    },
    {
      accessorKey: "channelName",
      header: "Channel",
    },
    {
      accessorKey: "notebookId",
      header: "Category",
      cell: (info: any) => (
        <span className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium">
          {info.getValue()}
        </span>
      ),
    },
  ];

  const features = tableFeatures({
    rowSortingFeature,
    rowSelectionFeature,
    coreRowModel: createCoreRowModel(),
    sortedRowModel: createSortedRowModel(),
  });

  // Initialize TanStack Table instance
  const table = useTable({
    features,
    data: videos,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  const selectedRows = table.getSelectedRowModel().rows;
  
  // Handle bulk deletion
  const handleDeleteSelected = async () => {
    if (!window.confirm(`Delete ${selectedRows.length} videos?`)) return;
    
    try {
      const ids = selectedRows.map(r => r.original._id);
      await bulkUpdate({ videoIds: ids, delete: true });
      toast.success(`Deleted ${selectedRows.length} videos`);
      setRowSelection({}); // Clear selection
    } catch (err) {
      toast.error("Failed to delete videos");
    }
  };

  // Handle bulk move
  const handleMoveSelected = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category first");
      return;
    }
    try {
      const ids = selectedRows.map(r => r.original._id);
      await bulkUpdate({ videoIds: ids, notebookId: selectedCategory });
      toast.success(`Moved ${selectedRows.length} videos to new category`);
      setRowSelection({});
      setSelectedCategory("");
    } catch (err) {
      toast.error("Failed to move videos");
    }
  };

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Videos Database</h1>
        <p className="text-text-secondary">
          Power-user view of your curated content. Select rows to perform bulk operations.
        </p>
      </div>
      
      {/* Table Container */}
      <div className="border border-white/10 bg-surface/30 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/20 border-b border-white/10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 font-medium text-text-secondary">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-white/5">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                className={`hover:bg-white/5 transition-colors ${row.getIsSelected() ? 'bg-violet-500/10' : ''}`}
              >
                {row.getAllCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Bulk Actions Toolbar */}
      {selectedRows.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 z-50">
          <span className="font-bold text-violet-400 whitespace-nowrap">{selectedRows.length} selected</span>
          <div className="w-px h-6 bg-white/20" />
          
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="">Select category...</option>
              {stats?.notebooks.map(n => (
                <option key={n.id} value={n.id} className="bg-surface">{n.title}</option>
              ))}
            </select>
            <button 
              onClick={handleMoveSelected}
              disabled={!selectedCategory}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FolderSync className="w-5 h-5" />
              Move
            </button>
          </div>

          <div className="w-px h-6 bg-white/20" />
          
          <button 
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            <Trash className="w-5 h-5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
