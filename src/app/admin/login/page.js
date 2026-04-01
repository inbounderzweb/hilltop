'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('2026@hilltop');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials
        if (username === 'admin' && password === '2026@hilltop') {
            // Set an admin_auth cookie
            document.cookie = "admin_auth=true; path=/; max-age=86400;";
            router.push('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#222222] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10">
                <h1 className="text-3xl font-semibold text-white text-center mb-2 tracking-wide">
                    Admin Login
                </h1>
                <p className="text-white/50 text-center mb-6 text-sm">
                    Enter your credentials to access the admin portal
                </p>

                {/* <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-center">
                    <p className="text-xs text-white/60 mb-1">Demo Credentials:</p>
                    <p className="text-sm text-white/90 font-mono">Username: <span className="text-[#eba14d]">admin</span></p>
                    <p className="text-sm text-white/90 font-mono">Password: <span className="text-[#eba14d]">admin123</span></p>
                </div> */}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#eba14d] focus:ring-1 focus:ring-[#eba14d] transition-all"
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] pl-4 pr-12 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#eba14d] focus:ring-1 focus:ring-[#eba14d] transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#eba14d] hover:bg-[#d89243] text-[#1b1b1b] font-semibold rounded-xl px-4 py-3 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
