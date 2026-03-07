import React from 'react';

export default function DashboardOverview() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-semibold tracking-wide text-white mb-8">
                Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#222222] p-6 rounded-2xl border border-white/5 hover:border-[#eba14d]/30 transition-all shadow-lg group">
                    <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">Total Products</h3>
                    <p className="text-4xl font-bold text-white group-hover:text-[#eba14d] transition-colors">124</p>
                </div>
                <div className="bg-[#222222] p-6 rounded-2xl border border-white/5 hover:border-[#eba14d]/30 transition-all shadow-lg group">
                    <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">Active Categories</h3>
                    <p className="text-4xl font-bold text-white group-hover:text-[#eba14d] transition-colors">8</p>
                </div>
                <div className="bg-[#222222] p-6 rounded-2xl border border-white/5 hover:border-[#eba14d]/30 transition-all shadow-lg group">
                    <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">New Inquiries</h3>
                    <p className="text-4xl font-bold text-white group-hover:text-[#eba14d] transition-colors">12</p>
                </div>
            </div>

            <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white/90">Recent Activity</h2>
                </div>
                <div className="p-6 space-y-4 text-sm w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
                        <div>
                            <span className="font-semibold text-white/90">New User Login</span>
                            <p className="text-white/40 mt-1">Admin successfully logged into the system.</p>
                        </div>
                        <div className="text-white/50 mt-2 sm:mt-0 text-xs text-right whitespace-nowrap">Just now</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
