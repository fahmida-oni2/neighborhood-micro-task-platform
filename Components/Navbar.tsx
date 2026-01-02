'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname?.startsWith(path);
// console.log(session)
    // console.log(session);

    // Close mobile menu on route change
    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    // Navigation links
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/tasks', label: 'Browse Tasks' },
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/contact', label: 'Contact' },
    ];

    // User dropdown links
    const userLinks = [
        { href: '/client/dashboard/profile', label: 'Profile', icon: '👤' },
        { href: '/client/dashboard', label: 'Dashboard', icon: '📊' },
        { href: '/client/dashboard/tasks', label: 'My Tasks', icon: '✅' },
        { href: '/earnings', label: 'Earnings', icon: '💰' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-[#D0EBC0] shadow-lg z-50 px-4 md:px-10 py-3 border-b border-[#1A3609]/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-[#1A3609]/10 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-[#1A3609]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.png" 
                                    alt="NeighborGig Logo"
                                    fill
                                    sizes="32px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#1A3609]">NeighborGig</h1>
                                <p className="text-xs text-[#1A3609]/70">Community Platform</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`font-medium px-3 py-2 rounded-lg transition-colors ${isActive(href)
                                    ? 'bg-[#1A3609] text-white'
                                    : 'text-[#1A3609] hover:bg-[#1A3609]/10 hover:text-[#1A3609]'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}

                        {session?.user?.role === 'tasker' && (
                            <Link
                                href="/tasks/post"
                                className="px-4 py-2 bg-[#E8F2E1] text-[#1A3609] font-medium rounded-lg hover:bg-[#E8F2E1]/80 border border-[#1A3609]/20 transition-colors"
                            >
                                Post Task
                            </Link>
                        )}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="relative group">
                                <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-[#1A3609]/20 hover:shadow-md transition-shadow">
                                    {session.user?.image ? (
                                        <Image
                                            width={36}
                                            height={36}
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-[#1A3609]"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#1A3609] flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div className="hidden lg:block text-left">
                                        <p className="font-medium text-[#1A3609] text-sm">{session.user?.name}</p>
                                        <p className="text-xs text-[#1A3609]/70 capitalize">{session.user?.role}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-[#1A3609]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[#1A3609]/20">
                                    <div className="px-4 py-3 border-b border-[#1A3609]/10">
                                        <p className="font-medium text-[#1A3609]">{session.user?.name}</p>
                                        <p className="text-sm text-[#1A3609]/70">{session.user?.email}</p>
                                        <div className="mt-1">
                                            <span className="inline-block px-2 py-1 text-xs bg-[#D0EBC0] text-[#1A3609] rounded-full">
                                                {session.user?.role || 'User'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        {userLinks.map(({ href, label, icon }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                className="flex items-center gap-3 px-4 py-2.5 text-[#1A3609] hover:bg-[#D0EBC0] transition-colors"
                                            >
                                                <span className="text-lg">{icon}</span>
                                                <span>{label}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-[#1A3609]/10 pt-2">
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                                        >
                                            <span className="text-lg">🚪</span>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-[#1A3609] font-medium hover:bg-[#1A3609]/10 rounded-lg transition-colors border border-[#1A3609]/30"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2 bg-[#1A3609] text-white font-medium rounded-lg hover:bg-[#1A3609]/90 transition-colors shadow-sm"
                                >
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden pt-20 bg-[#D0EBC0]">
                    <div className="p-4 border-t border-[#1A3609]/20">

                        {/* Mobile Navigation */}
                        <div className="space-y-1 mb-6">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(href)
                                        ? 'bg-[#1A3609] text-white'
                                        : 'text-[#1A3609] hover:bg-[#1A3609]/10'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}

                            {session?.user?.role === 'tasker' && (
                                <Link
                                    href="/tasks/post"
                                    className="flex items-center gap-3 px-4 py-3 bg-[#E8F2E1] text-[#1A3609] rounded-lg hover:bg-[#E8F2E1]/80"
                                >
                                    📝 Post Task
                                </Link>
                            )}
                        </div>

                        {/* Mobile Auth */}
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg mb-6 border border-[#1A3609]/20">
                                    {session.user?.image ? (
                                        <Image
                                            width={40}
                                            height={40}
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-[#1A3609]"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-[#1A3609] flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-[#1A3609]">{session.user?.name}</p>
                                        <p className="text-sm text-[#1A3609]/70">{session.user?.email}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[#D0EBC0] text-[#1A3609] rounded-full">
                                            {session.user?.role || 'User'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1 bg-white rounded-lg border border-[#1A3609]/20 overflow-hidden">
                                    {userLinks.map(({ href, label, icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="flex items-center gap-3 px-4 py-3 text-[#1A3609] hover:bg-[#D0EBC0] transition-colors"
                                        >
                                            <span className="text-lg">{icon}</span>
                                            {label}
                                        </Link>
                                    ))}

                                    <div className="border-t border-[#1A3609]/10">
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <span className="text-lg">🚪</span>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    href="/login"
                                    className="block px-4 py-3 text-center text-[#1A3609] font-medium border-2 border-[#1A3609] rounded-lg hover:bg-[#1A3609]/5 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-4 py-3 text-center bg-[#1A3609] text-white font-medium rounded-lg hover:bg-[#1A3609]/90 transition-colors"
                                >
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add padding to account for fixed navbar */}
            <div className="h-16"></div>
        </>
    );
};

export default Navbar;