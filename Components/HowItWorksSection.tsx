'use client';
import { UserPlus, Search, Handshake, CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const steps = [
    {
        icon: UserPlus,
        title: 'Create Account',
        description: 'Sign up as a Client or Tasker. Complete your profile with skills and location.',
        details: ['2-minute signup', 'Free registration', 'Choose your role'],
        color: 'from-[#E8F2E1] to-white',
    },
    {
        icon: Search,
        title: 'Find or Post Tasks',
        description: 'Clients post tasks with details. Taskers browse available jobs in their area.',
        details: ['Post tasks in 60 seconds', 'Browse local jobs', 'Set your price'],
        color: 'from-[#D0EBC0] to-[#E8F2E1]',
    },
    {
        icon: Handshake,
        title: 'Connect & Agree',
        description: 'Review bids, chat with users, and agree on terms. Built-in chat makes it easy.',
        details: ['Secure messaging', 'Review profiles', 'Agree on terms'],
        color: 'from-[#E8F2E1] to-white',
    },
    {
        icon: CreditCard,
        title: 'Complete & Pay Securely',
        description: 'Task gets done, client approves, and payment is released automatically.',
        details: ['Escrow payment protection', 'Rate each other', 'Build reputation'],
        color: 'from-[#D0EBC0] to-[#E8F2E1]',
    },
];

export default function HowItWorksSection() {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
                        How <span className="text-[#1A3609] bg-[#E8F2E1] px-3 rounded-lg">NeighborTask</span> Works
                    </h2>
                    <p className="text-xl text-[#1A3609]/70 max-w-3xl mx-auto">
                        Simple, secure, and community-focused. Get started in minutes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredStep(index)}
                            onHoverEnd={() => setHoveredStep(null)}
                            className="relative"
                        >
                            {/* Animated connecting line */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    animate={{ width: hoveredStep === index ? '80%' : '60%' }}
                                    className="hidden lg:block absolute top-12 right-0 transform translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#1A3609]/20 to-transparent"
                                />
                            )}

                            {/* Step Number */}
                            <motion.div
                                animate={{ scale: hoveredStep === index ? 1.1 : 1 }}
                                className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-[#1A3609] text-white flex items-center justify-center font-bold text-xl shadow-lg z-10"
                            >
                                {index + 1}
                            </motion.div>

                            <div className={`bg-gradient-to-b ${step.color} p-8 rounded-2xl border border-[#1A3609]/10 h-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                                {/* Hover effect background */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredStep === index ? 0.1 : 0 }}
                                    className="absolute inset-0 bg-[#1A3609]"
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        animate={{ rotate: hoveredStep === index ? 360 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A3609] to-[#1A3609]/80 flex items-center justify-center mb-6 mx-auto shadow-lg"
                                    >
                                        <step.icon className="w-10 h-10 text-white" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-[#1A3609] mb-4 text-center">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#1A3609]/80 mb-6 text-center">
                                        {step.description}
                                    </p>

                                    {/* Details */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ 
                                            height: hoveredStep === index ? 'auto' : 0,
                                            opacity: hoveredStep === index ? 1 : 0
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-2 pt-4 border-t border-[#1A3609]/10">
                                            {step.details.map((detail, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-[#1A3609]" />
                                                    <span className="text-sm text-[#1A3609]/70">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Learn More Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ 
                                            opacity: hoveredStep === index ? 1 : 0,
                                            y: hoveredStep === index ? 0 : 10
                                        }}
                                        className="mt-6"
                                    >
                                        <button className="w-full py-2.5 bg-[#1A3609] text-white rounded-lg hover:bg-[#1A3609]/90 transition-colors text-sm font-medium">
                                            Learn More
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Get Started Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <button className="px-8 py-3.5 bg-gradient-to-r from-[#1A3609] to-[#1A3609]/80 text-white text-lg font-medium rounded-lg hover:shadow-xl transition-all shadow-lg hover:scale-105">
                        Get Started for Free
                    </button>
                    <p className="text-[#1A3609]/60 mt-4">
                        No hidden fees. Join 10,000+ neighbors today.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}