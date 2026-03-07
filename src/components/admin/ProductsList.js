import React from 'react';

export default function ProductsList() {
    const dummyProducts = [
        { id: 1, name: "Cosmopolitan", category: "Quartzite", color: "Red", origin: "Brazil", date: "Mar 6, 2026" },
        { id: 2, name: "Cristallo Blue", category: "Quartzite", color: "Silver", origin: "Italy", date: "Mar 5, 2026" },
        { id: 3, name: "Crystal Venato", category: "Marble", color: "Black", origin: "India", date: "Mar 4, 2026" },
        { id: 4, name: "Iron Blue", category: "Granite", color: "Black", origin: "Norway", date: "Mar 1, 2026" },
        { id: 5, name: "Jacaranda", category: "Quartzite", color: "Yellow", origin: "Brazil", date: "Feb 28, 2026" },
    ];

    return (
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-white/90">Added Products</h2>
                <div className="flex gap-3 w-full sm:w-auto">
                    <input
                        placeholder="Search products..."
                        className="bg-[#1a1a1a] border border-white/10 text-sm rounded-lg px-4 py-2 text-white placeholder:text-white/30 outline-none focus:border-[#eba14d] transition w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-[#1a1a1a] border-b border-white/10">
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 w-16">ID</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">Details</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">Category</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">Color</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50">Origin</th>
                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/50 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {dummyProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-4 text-sm font-medium text-white/50">#{p.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-white/90">{p.name}</div>
                                    <div className="text-xs text-white/40 mt-0.5">Added: {p.date}</div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-white/80 border border-white/10">
                                        {p.category}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-white/70">{p.color}</td>
                                <td className="p-4 text-sm text-white/70 flex items-center gap-2">
                                    {p.origin}
                                </td>
                                <td className="p-4 text-sm text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className="text-[#eba14d] hover:text-[#d89243] font-medium transition cursor-pointer">Edit</button>
                                        <button className="text-red-500 hover:text-red-400 font-medium transition cursor-pointer">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Dummy */}
            <div className="p-4 border-t border-white/10 bg-[#1a1a1a] flex items-center justify-between text-sm">
                <span className="text-white/50">Showing 1 to 5 of 124 entries</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/50 cursor-not-allowed">Prevent</button>
                    <button className="px-3 py-1 rounded bg-[#eba14d] text-black font-medium">1</button>
                    <button className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition">2</button>
                    <button className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition">3</button>
                    <button className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition">Next</button>
                </div>
            </div>
        </div>
    );
}
