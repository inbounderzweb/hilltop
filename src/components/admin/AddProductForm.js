import React from 'react';

export default function AddProductForm({ onSwitchTab, categories }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Product Successfully Added! (Dummy Action)");
        // e.target.reset(); // clear form
        // onSwitchTab('product-list'); // optionally switch directly to list
    };

    return (
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-white mb-8 tracking-wide">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Product Name <span className="text-red-500">*</span></label>
                            <input required placeholder="e.g. Classic White Marble" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Category <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]">
                                    <option value="" disabled selected hidden>Select Category</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Origin <span className="text-red-500">*</span></label>
                            <input required placeholder="e.g. Italy, Brazil, India" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]" />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Color Family <span className="text-red-500">*</span></label>
                            <input required placeholder="e.g. White, Black, Gold" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Description <span className="text-red-500">*</span></label>
                            <textarea required rows="4" placeholder="Brief description of the product and its best uses..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition resize-none ring-0 focus:ring-1 focus:ring-[#eba14d]"></textarea>
                        </div>
                    </div>
                </div>

                {/* Full Width */}
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Product Image <span className="text-red-500">*</span></label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-white/10 border-dashed rounded-xl cursor-pointer bg-[#1a1a1a] hover:bg-white/5 hover:border-[#eba14d]/50 transition duration-300">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-white/40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-white/60"><span className="font-semibold text-white/90">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-white/40">PNG, JPG or WEBP (MAX. 5MB)</p>
                            </div>
                            <input required type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                    <p className="mt-2 text-xs text-white/40 italic">Note: Only one main image is strictly required.</p>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button type="submit" className="bg-[#eba14d] hover:bg-[#d89243] text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
