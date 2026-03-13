"use client";

import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    Calendar,
    ChevronDown,
    ChevronUp,
    FileText,
    ExternalLink,
    RefreshCw,
    User,
    Briefcase,
    MessageCircle
} from "lucide-react";

export default function EnquiriesList({ type = "contact" }) {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const endpoint = type === "contact" ? "/api/enquiries/contact" : "/api/enquiries/career";
            const res = await fetch(endpoint);
            const data = await res.json();
            if (data.success) {
                setEnquiries(data.enquiries);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, [type]);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading && enquiries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-[#222222] rounded-xl border border-white/5">
                <RefreshCw size={24} className="animate-spin text-[#eba14d] mb-4" />
                <p className="text-white/40 text-sm">Loading enquiries...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#222222] rounded-xl border border-white/5 shadow-xl overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/2">
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                    {type === "contact" ? "Customer Enquiries" : "Career Applications"}
                </span>
                <button
                    onClick={fetchEnquiries}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition"
                >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="divide-y divide-white/5">
                {enquiries.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-white/30 text-sm">No enquiries found.</p>
                    </div>
                ) : (
                    enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="group">
                            <div
                                onClick={() => toggleExpand(enquiry.id)}
                                className={`p-4 cursor-pointer hover:bg-white/2 transition-colors flex items-center justify-between ${expandedId === enquiry.id ? 'bg-white/3' : ''}`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#eba14d]">
                                        {type === "contact" ? <MessageCircle size={16} /> : <Briefcase size={16} />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-bold text-white truncate">
                                            {type === "contact" ? enquiry.name : enquiry.full_name}
                                        </div>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="text-[10px] text-white/40 flex items-center gap-1">
                                                <Mail size={10} /> {enquiry.email}
                                            </span>
                                            {enquiry.phone && (
                                                <span className="text-[10px] text-white/40 flex items-center gap-1">
                                                    <Phone size={10} /> {enquiry.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden md:flex flex-col items-end px-4">
                                        <span className="text-[10px] text-[#eba14d] font-bold uppercase tracking-wider">
                                            {type === "contact" ? enquiry.purpose : enquiry.job_role}
                                        </span>
                                        <span className="text-[9px] text-white/20 flex items-center gap-1 mt-1">
                                            <Calendar size={10} />
                                            {new Date(enquiry.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white/20">
                                    {expandedId === enquiry.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {expandedId === enquiry.id && (
                                <div className="p-5 bg-white/1 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2">
                                            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">
                                                {type === "contact" ? "Message / Requirement" : "Applicant Details"}
                                            </div>
                                            <div className="text-xs text-white/70 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                                                {type === "contact" ? (
                                                    enquiry.message || "No message provided."
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                                            <span className="text-white/40">Applied For:</span>
                                                            <span className="text-white font-medium">{enquiry.job_role}</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                                            <span className="text-white/40">Full Name:</span>
                                                            <span className="text-white font-medium">{enquiry.full_name}</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                                            <span className="text-white/40">Contact Email:</span>
                                                            <span className="text-white font-medium">{enquiry.email}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-white/40">Phone Number:</span>
                                                            <span className="text-white font-medium">+91 {enquiry.phone}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Actions</div>

                                            {type === "career" && enquiry.resume_url && (
                                                <a
                                                    href={enquiry.resume_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full p-2.5 bg-[#eba14d] text-black rounded-lg text-xs font-bold uppercase transition hover:brightness-110"
                                                >
                                                    <FileText size={14} />
                                                    View Resume
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}

                                            <a
                                                href={`mailto:${enquiry.email}`}
                                                className="flex items-center justify-center gap-2 w-full p-2.5 bg-white/5 text-white/70 border border-white/10 rounded-lg text-xs font-bold uppercase transition hover:bg-white/10"
                                            >
                                                <Mail size={14} />
                                                Reply via Email
                                            </a>

                                            <div className="mt-auto pt-4 border-t border-white/5">
                                                <div className="text-[9px] text-white/20">Received on</div>
                                                <div className="text-[10px] text-white/40 font-medium">
                                                    {new Date(enquiry.created_at).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
