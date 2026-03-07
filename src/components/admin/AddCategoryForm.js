import React from 'react';

export default function AddCategoryForm({ categories, setCategories }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCat = e.target.categoryName.value.trim();
        if (newCat && !categories.includes(newCat)) {
            setCategories([newCat, ...categories]);
            alert(`Category "${newCat}" Successfully Added!`);
            e.target.reset();
        } else {
            alert("Category already exists or is empty!");
        }
    };

    return (
        <div className="bg-[#222222] rounded-2xl border border-white/5 shadow-xl p-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">Manage Categories</h2>
            <p className="text-white/50 text-sm mb-8">Add new categories to organize your products.</p>

            <form onSubmit={handleSubmit} className="mb-10">
                <label className="block text-sm font-medium text-white/70 mb-2">New Category Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input name="categoryName" required placeholder="e.g. Limestone" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#eba14d] outline-none transition ring-0 focus:ring-1 focus:ring-[#eba14d]" />
                    <button type="submit" className="bg-[#eba14d] hover:bg-[#d89243] text-black font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md whitespace-nowrap">
                        Add Category
                    </button>
                </div>
            </form>

            <div>
                <h3 className="text-sm font-medium text-white/70 mb-4 px-1">Active Categories ({categories.length})</h3>
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full">
                            <span className="text-sm text-white/90">{cat}</span>
                            <button className="text-white/30 hover:text-red-500 transition-colors ml-2" onClick={() => setCategories(categories.filter(c => c !== cat))}>
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
