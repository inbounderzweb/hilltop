'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    PlusCircle,
    Layers,
    Palette,
    List,
    FileText,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Settings,
    MessageSquare,
    Briefcase
} from 'lucide-react';
import { Quicksand } from "next/font/google";

import DashboardOverview from '@/components/admin/DashboardOverview';
import AddProductForm from '@/components/admin/AddProductForm';
import AddCategoryForm from '@/components/admin/AddCategoryForm';
import ProductsList from '@/components/admin/ProductsList';
import ManageVariationsForm from '@/components/admin/ManageVariationsForm';
import AddBlogForm from '@/components/admin/AddBlogForm';
import BlogsList from '@/components/admin/BlogsList';
import EnquiriesList from '@/components/admin/EnquiriesList';
import AddTestimonialForm from '@/components/admin/AddTestimonialForm';
import TestimonialsList from '@/components/admin/TestimonialsList';

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Check cookie on mount
        const hasAuthCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('admin_auth='))
            ?.split('=')[1];

        if (hasAuthCookie !== 'true') {
            router.push('/admin/login');
        } else {
            // Push to the end of the event loop to avoid synchronous state update during render Phase
            setTimeout(() => {
                setIsAuthenticated(true);
            }, 0);
        }
    }, [router]);

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab('add-product');
    };

    const handleEditBlog = (blog) => {
        setEditingBlog(blog);
        setActiveTab('add-blog');
    };

    const handleEditTestimonial = (testimonial) => {
        setEditingTestimonial(testimonial);
        setActiveTab('add-testimonial');
    };

    const handleLogout = () => {
        document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
        router.push('/admin/login');
    };

    const resetStates = () => {
        setEditingProduct(null);
        setEditingBlog(null);
        setEditingTestimonial(null);
    };

    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={14} />, reset: true },
        { id: 'add-product', label: 'Add Product', icon: <PlusCircle size={14} />, reset: true, hideOnEdit: true },
        { id: 'add-category', label: 'Categories', icon: <Layers size={14} />, reset: true },
        { id: 'variations', label: 'Variations', icon: <Palette size={14} />, reset: true },
        { id: 'product-list', label: 'Products List', icon: <List size={14} />, reset: true },
        { id: 'add-blog', label: 'Add Blog', icon: <FileText size={14} />, reset: true, hideOnEdit: true },
        { id: 'blogs-list', label: 'Blogs List', icon: <List size={14} />, reset: true },
        { id: 'add-testimonial', label: 'Add Testimonial', icon: <PlusCircle size={14} />, reset: true },
        { id: 'testimonials-list', label: 'Testimonials List', icon: <List size={14} />, reset: true },
        { id: 'customer-enquiries', label: 'Customer Enquiries', icon: <MessageSquare size={14} />, reset: true },
        { id: 'career-enquiries', label: 'Career Applications', icon: <Briefcase size={14} />, reset: true },
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#eba14d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row ${quicksand.className}`}>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-[#151515] border-b border-white/5 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#eba14d]/10 rounded-lg flex items-center justify-center border border-[#eba14d]/20">
                        <Settings size={16} className="text-[#eba14d]" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">Hilltop <span className="text-[#eba14d]">Admin</span></span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-white/5 rounded-lg border border-white/10"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-60 bg-[#151515] border-r border-white/5 z-40 transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 flex flex-col shrink-0
            `}>
                <div className="p-5 hidden md:block">
                    <div className="flex items-center gap-2.5 mb-6">
                        <div className="w-8 h-8 bg-[#eba14d]/10 rounded-lg flex items-center justify-center border border-[#eba14d]/20 shadow-lg shadow-[#eba14d]/5">
                            <Settings size={16} className="text-[#eba14d]" />
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-tight leading-none">Hilltop <span className="text-[#eba14d]">Admin</span></div>
                            <div className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em] mt-1">Control Center</div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-0.5">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        // For add-product/add-blog, highlight if editing too
                        const isEffectivelyActive = isActive ||
                            (item.id === 'add-product' && editingProduct) ||
                            (item.id === 'add-blog' && editingBlog) ||
                            (item.id === 'add-testimonial' && editingTestimonial);

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (item.reset) resetStates();
                                    setActiveTab(item.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 group
                                    ${isEffectivelyActive
                                        ? 'bg-[#eba14d]/10 text-[#eba14d] border border-[#eba14d]/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}
                                `}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className={`transition-colors duration-300 ${isEffectivelyActive ? 'text-[#eba14d]' : 'text-white/20 group-hover:text-white/60'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-xs font-semibold tracking-wide">
                                        {item.id === 'add-product' && editingProduct ? 'Edit Product' :
                                            item.id === 'add-blog' && editingBlog ? 'Edit Blog' :
                                                item.id === 'add-testimonial' && editingTestimonial ? 'Edit Testimonial' :
                                                    item.label}
                                    </span>
                                </div>
                                {isEffectivelyActive && <ChevronRight size={12} className="opacity-40" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full bg-red-500/5 hover:bg-red-500/10 text-red-500/70 hover:text-red-500 border border-red-500/10 hover:border-red-500/20 px-3 py-2.5 rounded-xl transition-all duration-300 font-semibold text-[10px] tracking-widest uppercase"
                    >
                        <LogOut size={14} />
                        Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                <div className="p-5 md:p-8 lg:p-10 max-w-[1400px] mx-auto min-h-screen">
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="text-white text-lg font-bold tracking-tight mb-1 leading-none uppercase">
                                {activeTab === 'dashboard' ? 'Welcome back, Admin' :
                                    activeTab === 'add-product' ? (editingProduct ? 'Update Slab' : 'New Slab') :
                                        activeTab === 'add-category' ? 'Categories' :
                                            activeTab === 'variations' ? 'Manage Colors' :
                                                activeTab === 'product-list' ? 'Inventory' :
                                                    activeTab === 'add-blog' ? (editingBlog ? 'Edit Story' : 'New Story') :
                                                        activeTab === 'blogs-list' ? 'Insights' : 
                                                            activeTab === 'add-testimonial' ? (editingTestimonial ? 'Edit Testimonial' : 'New Testimonial') :
                                                                activeTab === 'testimonials-list' ? 'Testimonials' : 'Dashboard'}
                            </div>
                            <div className="text-white/30 text-[9px] font-semibold uppercase tracking-widest">
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        {activeTab === 'dashboard' && (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-[10px] text-white/30 font-black uppercase tracking-widest leading-none">Status</span>
                                    <span className="text-sm font-bold text-[#eba14d] flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#eba14d] animate-pulse" />
                                        System Active
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
                        {activeTab === 'add-product' && <AddProductForm onSwitchTab={setActiveTab} initialData={editingProduct} />}
                        {activeTab === 'add-category' && <AddCategoryForm />}
                        {activeTab === 'variations' && <ManageVariationsForm />}
                        {activeTab === 'product-list' && <ProductsList onEdit={handleEditProduct} />}
                        {activeTab === 'add-blog' && <AddBlogForm onSwitchTab={setActiveTab} initialData={editingBlog} />}
                        {activeTab === 'blogs-list' && <BlogsList onEdit={handleEditBlog} />}
                        {activeTab === 'add-testimonial' && <AddTestimonialForm onSwitchTab={setActiveTab} initialData={editingTestimonial} />}
                        {activeTab === 'testimonials-list' && <TestimonialsList onEdit={handleEditTestimonial} />}
                        {activeTab === 'customer-enquiries' && <EnquiriesList type="contact" />}
                        {activeTab === 'career-enquiries' && <EnquiriesList type="career" />}
                    </div>
                </div>
            </main>
        </div>
    );
}
