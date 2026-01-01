'use client';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Heart, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Here you would typically make an API call
            console.log('Subscribed:', email);
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const companyLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
        { href: '/blog', label: 'Blog' },
    ];

    const taskerLinks = [
        { href: '/tasker/signup', label: 'Become a Tasker' },
        { href: '/tasker/earnings', label: 'How to Earn' },
        { href: '/tasker/safety', label: 'Safety Guidelines' },
        { href: '/tasker/success-stories', label: 'Success Stories' },
        { href: '/tasker/resources', label: 'Tasker Resources' },
    ];

    const clientLinks = [
        { href: '/client/signup', label: 'Post a Task' },
        { href: '/client/how-to-hire', label: 'How to Hire' },
        { href: '/client/pricing', label: 'Pricing' },
        { href: '/client/safety', label: 'Safety & Trust' },
        { href: '/client/help-center', label: 'Help Center' },
    ];

    const supportLinks = [
        { href: '/contact', label: 'Contact Us' },
        { href: '/help', label: 'Help & Support' },
        { href: '/faq', label: 'FAQ' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/community-guidelines', label: 'Community Guidelines' },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    ];

    const trustBadges = [
        { icon: Shield, label: 'Secure Payments', description: 'SSL Encrypted' },
        { icon: Award, label: 'Verified Users', description: 'ID Verified' },
        { icon: Users, label: 'Community Trust', description: '98% Satisfaction' },
        { icon: Heart, label: 'Safe Platform', description: '24/7 Support' },
    ];

    const cities = [
        'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
        'Chandigarh', 'Bhopal', 'Indore', 'Patna', 'Guwahati'
    ];

    return (
        <footer className="bg-gradient-to-b from-[#1A3609] to-[#0F2505] text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    {/* Brand & Description */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#D0EBC0] to-[#E8F2E1] flex items-center justify-center">
                                <span className="text-2xl font-bold text-[#1A3609]">NG</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">NeighborGig</h2>
                                <p className="text-[#D0EBC0]/80">Community Task Platform</p>
                            </div>
                        </div>
                        <p className="text-[#D0EBC0]/80 mb-6">
                            Connecting neighbors for trusted micro-tasks. Earn extra income or find reliable help in your local community. 
                            Building stronger neighborhoods one task at a time.
                        </p>
                        
                        {/* Newsletter Subscription */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#D0EBC0]"
                                    required
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-[#D0EBC0] to-[#E8F2E1] text-[#1A3609] font-semibold rounded-lg hover:shadow-lg transition-shadow"
                                >
                                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                                </motion.button>
                            </form>
                            <p className="text-sm text-[#D0EBC0]/60 mt-2">
                                Get weekly task opportunities & community updates
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            {trustBadges.map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D0EBC0] to-[#E8F2E1] flex items-center justify-center">
                                        <badge.icon className="w-5 h-5 text-[#1A3609]" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{badge.label}</div>
                                        <div className="text-xs text-[#D0EBC0]/60">{badge.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {companyLinks.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-[#D0EBC0]/80 hover:text-[#E8F2E1] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-[#D0EBC0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                For Taskers
                            </h3>
                            <ul className="space-y-3">
                                {taskerLinks.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-[#D0EBC0]/80 hover:text-[#E8F2E1] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-[#D0EBC0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                For Clients
                            </h3>
                            <ul className="space-y-3">
                                {clientLinks.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-[#D0EBC0]/80 hover:text-[#E8F2E1] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-[#D0EBC0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                {supportLinks.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-[#D0EBC0]/80 hover:text-[#E8F2E1] transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-[#D0EBC0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8"></div>

                {/* Cities Section */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-6 text-center">Available in Cities Across India</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {cities.map((city, index) => (
                            <motion.span
                                key={city}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                            >
                                {city}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#D0EBC0]" />
                            <div>
                                <div className="text-sm text-[#D0EBC0]/60">Email</div>
                                <a href="mailto:support@neighborgig.com" className="hover:text-[#D0EBC0] transition-colors">
                                    support@neighborgig.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#D0EBC0]" />
                            <div>
                                <div className="text-sm text-[#D0EBC0]/60">Phone</div>
                                <a href="tel:+911800123456" className="hover:text-[#D0EBC0] transition-colors">
                                    +91 1800 123 456
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[#D0EBC0]" />
                            <div>
                                <div className="text-sm text-[#D0EBC0]/60">Office</div>
                                <span>Bangalore, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#D0EBC0]/80">Follow us:</span>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-[#0F2505] py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-[#D0EBC0]/60 text-sm">
                                © {new Date().getFullYear()} NeighborGig Community Platform. All rights reserved.
                            </p>
                            <p className="text-[#D0EBC0]/40 text-xs mt-1">
                                Building stronger neighborhoods through trusted local connections.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-[#D0EBC0]/60">
                                    <span className="font-semibold">2,548</span> tasks completed today
                                </span>
                            </div>
                            <div className="text-xs text-[#D0EBC0]/60">
                                Made with <Heart className="w-3 h-3 inline text-red-400" /> in India
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Link href="/tasks/post">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-[#D0EBC0] to-[#E8F2E1] text-[#1A3609] font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
                    >
                        <span className="text-xl">📝</span>
                        Post a Task
                    </motion.button>
                </Link>
            </motion.div>
        </footer>
    );
}