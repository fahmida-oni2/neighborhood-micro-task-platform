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
    // Close mobile menu on route change
    useEffect(() => setIsMobileMenuOpen(false), [pathname]);

    // Navigation links
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/course', label: 'All Task' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    // User dropdown links
    const userLinks = [
        { href: '/client/dashboard/profile', label: 'Profile', icon: '👤' },
        { href: '/client/dashboard', label: 'Dashboard', icon: '📊' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 md:px-10 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                        
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Micro-Task
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ href, label }) => (
                            <Link 
                                key={href}
                                href={href} 
                                className={`font-medium ${isActive(href) ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2">
                                    {session.user?.image ? (
                                        <Image 
                                            width={40}
                                            height={40}
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-purple-500"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    {/* <span className="hidden md:inline font-medium text-gray-700">
                                        {session.user?.name}
                                    </span> */}
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border">
                                    <div className="px-4 py-3 border-b">
                                        <p className="font-medium">{session.user?.name}</p>
                                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                                    </div>
                                    {userLinks.map(({ href, label, icon }) => (
                                        <Link 
                                            key={href}
                                            href={href} 
                                            className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                        >
                                            <span>{icon}</span> {label}
                                        </Link>
                                    ))}
                                    <button 
                                        onClick={() => signOut()} 
                                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-lg"
                                    >
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link 
                                    href="/login" 
                                    className="px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden pt-20 bg-white">
                    <div className="p-4 border-t">
                        
                        {/* Mobile Navigation */}
                        <div className="space-y-1 mb-6">
                            {navLinks.map(({ href, label }) => (
                                <Link 
                                    key={href}
                                    href={href} 
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(href) ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Auth */}
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg mb-6">
                                    {session.user?.image ? (
                                        <Image 
                                            width={40}
                                            height={40}
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">{session.user?.name}</p>
                                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {userLinks.map(({ href, label, icon }) => (
                                        <Link 
                                            key={href}
                                            href={href} 
                                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg"
                                        >
                                            <span>{icon}</span> {label}
                                        </Link>
                                    ))}
                                    <button 
                                        onClick={() => signOut()} 
                                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3">
                                <Link 
                                    href="/login" 
                                    className="block px-4 py-3 text-center text-purple-600 font-medium border-2 border-purple-600 rounded-lg hover:bg-purple-50"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="block px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;