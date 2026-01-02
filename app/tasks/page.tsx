"use client";

import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status?: string;
  clientId: string;
  createdAt?: string;
  [key: string]: any;
}

export default function BrowseTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  if (loading)
    return <div className="p-10 text-center text-xl">Loading tasks...</div>;
  if (error)
    return <div className="p-10 text-center text-error">Error: {error}</div>;
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#1A3609] tracking-tight">
              Browse Online Tasks
            </h1>
            <p className="text-[#1A3609] mt-2">
              Find work that matches your skills across the globe.
            </p>
          </div>

          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 ring-indigo-500 outline-none">
              <option>All Categories</option>
              <option>Programming</option>
              <option>Design</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 ring-indigo-500 outline-none">
              <option>Sort by: Newest</option>
              <option>Budget: High to Low</option>
            </select>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id || index}
              task={task as any}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
