'use client';
import { MapPin, Clock, IndianRupee, Star, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const featuredTasks = [
    {
        id: 1,
        title: 'Lawn Mowing & Garden Maintenance',
        description: 'Need someone to mow lawn and trim hedges in Sector 62. Gardening tools provided.',
        location: 'Noida, Sector 62',
        price: '₹800',
        duration: '2 hours',
        category: 'Home Services',
        rating: 4.9,
        bids: 12,
        urgent: true,
        distance: '0.5 km away',
        posted: '2 hours ago',
    },
    {
        id: 2,
        title: 'Furniture Assembly (IKEA)',
        description: 'Assemble 2 wardrobes and 1 bed frame. All tools and instructions provided.',
        location: 'Delhi, South Extension',
        price: '₹1,500',
        duration: '3 hours',
        category: 'Assembly',
        rating: 4.8,
        bids: 8,
        urgent: false,
        distance: '1.2 km away',
        posted: '5 hours ago',
    },
    {
        id: 3,
        title: 'Grocery Delivery for Elderly',
        description: 'Weekly grocery shopping and delivery for senior citizen. List provided.',
        location: 'Gurgaon, DLF Phase 2',
        price: '₹300',
        duration: '1.5 hours',
        category: 'Delivery',
        rating: 5.0,
        bids: 5,
        urgent: true,
        distance: '0.8 km away',
        posted: '1 hour ago',
    },
    {
        id: 4,
        title: 'Pet Sitting (Weekend)',
        description: 'Take care of 2 friendly cats for 2 days while we are away. Food provided.',
        location: 'Bangalore, Koramangala',
        price: '₹2,000',
        duration: '2 days',
        category: 'Pet Care',
        rating: 4.7,
        bids: 6,
        urgent: false,
        distance: '2.1 km away',
        posted: '8 hours ago',
    },
];

export default function FeaturedTasksSection() {
    const [hoveredTask, setHoveredTask] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FBF5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-12"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A3609] mb-4">
                            Featured <span className="text-[#1A3609] bg-[#E8F2E1] px-3 rounded-lg">Tasks</span> Near You
                        </h2>
                        <p className="text-xl text-[#1A3609]/70">
                            Real tasks from your neighborhood • Updated in real-time
                        </p>
                    </div>
                    <Link href="/tasks">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 text-[#1A3609] font-medium hover:bg-[#1A3609]/10 rounded-lg transition-all border border-[#1A3609] mt-4 md:mt-0"
                        >
                            View All Tasks
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            onHoverStart={() => setHoveredTask(task.id)}
                            onHoverEnd={() => setHoveredTask(null)}
                            className="relative group"
                        >
                            {/* Task Card */}
                            <div className="bg-white rounded-2xl border border-[#1A3609]/10 overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-300">
                                {/* Urgent Badge */}
                                {task.urgent && (
                                    <motion.div
                                        animate={{ scale: hoveredTask === task.id ? 1.1 : 1 }}
                                        className="absolute top-3 right-3 z-10"
                                    >
                                        <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">
                                            <Zap className="w-3 h-3" />
                                            URGENT
                                        </div>
                                    </motion.div>
                                )}

                                {/* Category Banner */}
                                <div className="bg-gradient-to-r from-[#D0EBC0] to-[#E8F2E1] p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="px-3 py-1 bg-white text-[#1A3609] text-sm font-medium rounded-full">
                                            {task.category}
                                        </span>
                                        <div className="text-xs text-[#1A3609]/70 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {task.posted}
                                        </div>
                                    </div>
                                </div>

                                {/* Task Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-[#1A3609] mb-3 line-clamp-2 group-hover:text-[#1A3609]/90">
                                        {task.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#1A3609]/70 mb-6 line-clamp-2">
                                        {task.description}
                                    </p>

                                    {/* Location & Distance */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#1A3609]/60" />
                                            <span className="text-sm text-[#1A3609]">{task.location}</span>
                                        </div>
                                        <span className="text-xs text-[#1A3609]/60 bg-[#E8F2E1] px-2 py-1 rounded-full">
                                            {task.distance}
                                        </span>
                                    </div>

                                    {/* Duration & Bids */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#1A3609]/60" />
                                            <span className="text-sm text-[#1A3609]/70">{task.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-[#1A3609]/60" />
                                            <span className="text-sm text-[#1A3609]/70">{task.bids} bids</span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-[#1A3609]/10 my-4"></div>

                                    {/* Price & Rating */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-[#1A3609]">{task.price}</span>
                                            <span className="text-sm text-[#1A3609]/60">/task</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-bold text-[#1A3609]">{task.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="px-6 pb-6">
                                    <Link href={`/tasks/${task.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3 bg-gradient-to-r from-[#1A3609] to-[#1A3609]/90 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            Bid Now
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>

                            {/* Hover effect overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredTask === task.id ? 0.05 : 0 }}
                                className="absolute inset-0 bg-[#1A3609] rounded-2xl -z-10"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Live Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 bg-gradient-to-r from-[#E8F2E1] to-[#D0EBC0] rounded-2xl p-6"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold text-[#1A3609] mb-2">
                                🚀 New Tasks Posted Every Hour
                            </h3>
                            <p className="text-[#1A3609]/70">
                                Don't miss out on earning opportunities in your area
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-[#1A3609] text-white rounded-lg hover:bg-[#1A3609]/90 transition-all"
                            >
                                Set Task Alerts
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-[#1A3609] rounded-lg hover:bg-[#E8F2E1] transition-all border border-[#1A3609]"
                            >
                                Browse All
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}