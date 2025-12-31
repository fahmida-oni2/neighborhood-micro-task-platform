'use client';
import Link from 'next/link';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState([
        { value: '0+', label: 'Active Members' },
        { value: '0+', label: 'Tasks Completed' },
        { value: '₹0L+', label: 'Earned by Taskers' },
        { value: '0%', label: 'Satisfaction Rate' },
    ]);

    useEffect(() => {
        // Animate stats counter
        const finalStats = [
            { value: '10,000+', label: 'Active Members' },
            { value: '25,000+', label: 'Tasks Completed' },
            { value: '₹50L+', label: 'Earned by Taskers' },
            { value: '98%', label: 'Satisfaction Rate' },
        ];

        const interval = setInterval(() => {
            setStats(prev => {
                const updated = [...prev];
                finalStats.forEach((final, index) => {
                    if (prev[index].value !== final.value) {
                        // Simple animation for demo
                        const num = parseInt(prev[index].value) || 0;
                        const finalNum = parseInt(final.value) || 0;
                        if (num < finalNum) {
                            updated[index].value = `${Math.min(num + 100, finalNum)}+`;
                        }
                    }
                });
                return updated;
            });
        }, 50);

        setTimeout(() => clearInterval(interval), 2000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.href = `/tasks?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#D0EBC0] via-[#E8F2E1] to-white overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-10 left-10 w-72 h-72 bg-[#1A3609] rounded-full mix-blend-multiply filter blur-xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, delay: 0.2 }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-[#1A3609] rounded-full mix-blend-multiply filter blur-xl"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A3609] mb-6"
                    >
                        Earn & Get Things Done in Your{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">Neighborhood</span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute bottom-2 left-0 h-4 bg-[#E8F2E1] -rotate-1 -z-10"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-[#1A3609]/80 mb-10 max-w-3xl mx-auto"
                    >
                        Connect with trusted neighbors for small tasks, quick jobs, and local services.
                        Earn extra income or find reliable help in your community.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-2xl mx-auto mb-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#1A3609]/50" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Search for tasks (e.g., 'lawn mowing', 'furniture assembly', 'delivery')"
                                className="w-full pl-12 pr-32 py-4 text-lg rounded-xl border-2 border-[#1A3609]/20 focus:border-[#1A3609] focus:outline-none bg-white shadow-lg backdrop-blur-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSearch}
                                className="absolute right-2 top-2 px-6 py-2.5 bg-[#1A3609] text-white rounded-lg hover:bg-[#1A3609]/90 transition-all flex items-center gap-2"
                            >
                                Search
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Link href="/register?role=tasker">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-[#1A3609] text-white text-lg font-medium rounded-lg hover:bg-[#1A3609]/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Start Earning as Tasker
                            </motion.div>
                        </Link>
                        <Link href="/register?role=client">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-white text-[#1A3609] text-lg font-medium rounded-lg hover:bg-[#D0EBC0] transition-all border-2 border-[#1A3609] shadow-lg hover:shadow-xl flex items-center gap-3"
                            >
                                <span className="text-xl">📝</span>
                                Post a Task
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-[#1A3609] mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-[#1A3609]/70">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-[#1A3609] rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-[#1A3609] rounded-full mt-2" />
                </div>
            </motion.div>
        </section>
    );
}