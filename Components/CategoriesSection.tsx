'use client';
import { Home, Truck, Wrench, Heart, Monitor, Book, Utensils, Car, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
    { 
        icon: Home, 
        name: 'Home Services', 
        tasks: 245, 
        color: 'from-blue-100 to-blue-50', 
        iconColor: 'text-blue-600',
        trending: true,
        avgPay: '₹800'
    },
    { 
        icon: Truck, 
        name: 'Delivery', 
        tasks: 189, 
        color: 'from-green-100 to-green-50', 
        iconColor: 'text-green-600',
        trending: true,
        avgPay: '₹300'
    },
    { 
        icon: Wrench, 
        name: 'Repair & Assembly', 
        tasks: 156, 
        color: 'from-orange-100 to-orange-50', 
        iconColor: 'text-orange-600',
        trending: false,
        avgPay: '₹1,200'
    },
    { 
        icon: Heart, 
        name: 'Pet Care', 
        tasks: 98, 
        color: 'from-pink-100 to-pink-50', 
        iconColor: 'text-pink-600',
        trending: true,
        avgPay: '₹500'
    },
    { 
        icon: Monitor, 
        name: 'Tech Help', 
        tasks: 134, 
        color: 'from-purple-100 to-purple-50', 
        iconColor: 'text-purple-600',
        trending: false,
        avgPay: '₹1,000'
    },
    { 
        icon: Book, 
        name: 'Tutoring', 
        tasks: 76, 
        color: 'from-indigo-100 to-indigo-50', 
        iconColor: 'text-indigo-600',
        trending: true,
        avgPay: '₹700'
    },
    { 
        icon: Utensils, 
        name: 'Cooking', 
        tasks: 67, 
        color: 'from-red-100 to-red-50', 
        iconColor: 'text-red-600',
        trending: false,
        avgPay: '₹900'
    },
    { 
        icon: Car, 
        name: 'Car Wash', 
        tasks: 112, 
        color: 'from-cyan-100 to-cyan-50', 
        iconColor: 'text-cyan-600',
        trending: true,
        avgPay: '₹400'
    },
];

export default function CategoriesSection() {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A3609] mb-4">
                        Popular <span className="text-[#1A3609] bg-[#E8F2E1] px-3 rounded-lg">Task Categories</span>
                    </h2>
                    <p className="text-xl text-[#1A3609]/70 max-w-3xl mx-auto">
                        Find the perfect task or service in your neighborhood
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setHoveredCategory(index)}
                            onHoverEnd={() => setHoveredCategory(null)}
                            className="relative"
                        >
                            <Link
                                href={`/tasks?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            >
                                <div className="bg-white p-6 rounded-xl border border-[#1A3609]/10 hover:border-[#1A3609]/30 hover:shadow-2xl transition-all duration-300 h-full group">
                                    {/* Trending Badge */}
                                    {category.trending && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: hoveredCategory === index ? 1 : 0.7, x: 0 }}
                                            className="absolute -top-2 -left-2"
                                        >
                                            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
                                                <TrendingUp className="w-3 h-3" />
                                                Trending
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="flex flex-col items-center text-center">
                                        {/* Icon */}
                                        <motion.div
                                            animate={{ 
                                                rotate: hoveredCategory === index ? 360 : 0,
                                                scale: hoveredCategory === index ? 1.1 : 1
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl`}
                                        >
                                            <category.icon className={`w-10 h-10 ${category.iconColor}`} />
                                        </motion.div>

                                        {/* Name */}
                                        <h3 className="text-lg font-bold text-[#1A3609] mb-2">
                                            {category.name}
                                        </h3>

                                        {/* Tasks Count */}
                                        <div className="mb-3">
                                            <span className="text-2xl font-bold text-[#1A3609]">
                                                {category.tasks}
                                            </span>
                                            <span className="text-sm text-[#1A3609]/70 ml-1">
                                                tasks
                                            </span>
                                        </div>

                                        {/* Average Pay */}
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ 
                                                opacity: hoveredCategory === index ? 1 : 0,
                                                height: hoveredCategory === index ? 'auto' : 0
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex items-center justify-center gap-1 mb-3">
                                                <span className="text-sm text-[#1A3609]/60">Avg. pay:</span>
                                                <span className="text-sm font-bold text-[#1A3609]">{category.avgPay}</span>
                                            </div>
                                        </motion.div>

                                        {/* Explore Button */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ 
                                                opacity: hoveredCategory === index ? 1 : 0,
                                                y: hoveredCategory === index ? 0 : 10
                                            }}
                                            className="w-full"
                                        >
                                            <div className="w-full py-2 bg-gradient-to-r from-[#1A3609] to-[#1A3609]/80 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
                                                Explore
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Hover effect background */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCategory === index ? 0.05 : 0 }}
                                    className="absolute inset-0 bg-[#1A3609] rounded-xl -z-10"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 bg-gradient-to-r from-[#1A3609] to-[#1A3609]/90 rounded-2xl p-8 text-white"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-[#D0EBC0]">Task Categories</div>
                            <p className="text-sm text-white/80 mt-2">From gardening to tech support</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">1000+</div>
                            <div className="text-[#D0EBC0]">Active Taskers</div>
                            <p className="text-sm text-white/80 mt-2">Verified community members</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">₹50L+</div>
                            <div className="text-[#D0EBC0]">Total Earnings</div>
                            <p className="text-sm text-white/80 mt-2">Paid to taskers this month</p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="/categories">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#E8F2E1] text-[#1A3609] font-medium rounded-xl hover:bg-[#D0EBC0] transition-all shadow-lg hover:shadow-xl"
                        >
                            <Sparkles className="w-5 h-5" />
                            View All Categories
                            <span className="text-xl">→</span>
                        </motion.div>
                    </Link>
                    <p className="text-[#1A3609]/60 mt-4">
                        Can't find your category? <a href="/contact" className="text-[#1A3609] font-medium hover:underline">Suggest one!</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}