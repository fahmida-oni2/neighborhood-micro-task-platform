'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log("Attempting login with:", email);

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log("SignIn result:", result);

            if (result?.error) {
                if (result.error.includes("credentials")) {
                    setError('Invalid email or password');
                } else if (result.error.includes("callback")) {
                    setError('Authentication server error. Please try again.');
                } else {
                    setError(result.error);
                }
            } else if (result?.ok) {
                console.log("Login successful, redirecting...");
                router.push('/');
                router.refresh();
            } else {
                setError('Something went wrong');
            }
        } catch (error: any) {
            console.error("Login catch error:", error);
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);
            setError('');
            
            const result = await signIn('google', {
                callbackUrl: '/',
                redirect: true,
            });

            if (result?.error) {
                setError('Google sign-in failed. Please try again.');
            }
        } catch (error: any) {
            setError(error.message || 'Google sign-in failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D0EBC0] to-[#E8F2E1] flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A3609] to-[#0F2505] mb-4">
                        <span className="text-2xl font-bold text-white">NG</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1A3609]">Welcome Back</h1>
                    <p className="text-[#1A3609]/70 mt-2">Sign in to your NeighborGig account</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    {/* Google Sign In Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            <FcGoogle className="w-5 h-5" />
                            <span className="font-medium text-gray-700">
                                {googleLoading ? 'Connecting...' : 'Continue with Google'}
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3609] focus:border-[#1A3609] outline-none"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3609] focus:border-[#1A3609] outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#1A3609] focus:ring-[#1A3609] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            
                            <Link 
                                href="/forgot-password" 
                                className="text-sm text-[#1A3609] hover:text-[#0F2505] font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#1A3609] to-[#0F2505] text-white font-medium py-3.5 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>

                    {/* Registration Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                href="/register" 
                                className="text-[#1A3609] font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                        
                        <p className="text-xs text-gray-500 mt-4">
                            By signing in, you agree to our{' '}
                            <Link href="/terms" className="text-[#1A3609] hover:underline">
                                Terms
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-[#1A3609] hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;