"use client";
import { motion } from "framer-motion";
import { Clock, Globe, DollarSign, ArrowRight } from "lucide-react";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status: string;
  clientId: string;
  createdAt: string;
}

export default function TaskCard({ task, index }: { task: Task; index: number }) {
  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-secondary rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      {/* Header: Category & Status */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {task.category}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${statusColors[task.status] || "bg-slate-100"}`}>
          {task.status.replace("-", " ")}
        </span>
      </div>

      {/* Body: Title & Description */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {task.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Meta: Budget & Location */}
      <div className="flex items-center gap-4 py-4 border-y border-slate-50 mb-4">
        <div className="flex items-center text-slate-700 font-semibold">
          <DollarSign size={16} className="text-emerald-500" />
          <span>{task.budget.toLocaleString()} BDT</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <Globe size={14} className="mr-1" />
          {task.location}
        </div>
      </div>

      {/* Footer: Date & Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-slate-400 text-xs">
          <Clock size={12} className="mr-1" />
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
        <button className="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          View Details <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}