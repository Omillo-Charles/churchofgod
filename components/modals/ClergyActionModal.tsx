"use client";

import React, { useState } from "react";
import Modal from "@/components/modals/modal";
import { toast } from "sonner";

type ClergyActionType = "announcement" | "event" | "finance" | "sermon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ClergyActionType;
}

export default function ClergyActionModal({ isOpen, onClose, type }: Props) {
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    eventName: "",
    eventDate: "",
    location: "",
    reportType: "Monthly Summary",
    period: "",
    speaker: "",
    sermonDate: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    const isValid = value.trim().length > 0;
    setErrors(prev => ({ ...prev, [name]: !isValid }));
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    validateField(e.target.name, e.target.value);
  };
  
  const titles = {
    announcement: { title: "Add Announcement", subtitle: "Publish to members" },
    event: { title: "Create Event", subtitle: "Organize new activity" },
    finance: { title: "Finance Report", subtitle: "Stewardship breakdown" },
    sermon: { title: "Upload Sermon", subtitle: "Share word with others" },
  };

  const handleAction = () => {
    setLoading(true);
    // Simulate action
    setTimeout(() => {
      setLoading(false);
      toast.success(`${titles[type].title} processed successfully!`);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[type].title}
      subtitle={titles[type].subtitle}
    >
      <div className="space-y-5">
        {/* --- ANNOUNCEMENT FORM --- */}
        {type === "announcement" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Announcement Title</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text" 
                placeholder="e.g. Special Sunday Service" 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.title ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`} 
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Message Content</label>
              <textarea 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={4} 
                placeholder="Write your announcement message here..." 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.content ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none`} 
              />
            </div>
          </>
        )}

        {/* --- EVENT FORM --- */}
        {type === "event" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Event Name</label>
              <input 
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text" 
                placeholder="e.g. Youth Camp 2026" 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.eventName ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`} 
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Date</label>
              <input 
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="date" 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.eventDate ? 'border-red-500' : 'border-white/10'} text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`} 
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Location</label>
              <input 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text" 
                placeholder="Main Sanctuary or Online Link" 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.location ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`} 
              />
            </div>
            <div className="group relative cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.03] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Upload Event Banner</p>
                  <p className="text-[9px] text-zinc-600 mt-1">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- FINANCE FORM --- */}
        {type === "finance" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Report Type</label>
                <div className="relative">
                  <select 
                    name="reportType"
                    value={formData.reportType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-zinc-900 text-white">Monthly Summary</option>
                    <option className="bg-zinc-900 text-white">Tithes & Offerings</option>
                    <option className="bg-zinc-900 text-white">Expenditure</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Period</label>
                <input 
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="month" 
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.period ? 'border-red-500' : 'border-white/10'} text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`} 
                />
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center">Export Format</p>
              <div className="flex gap-2">
                {["PDF", "CSV", "Excel"].map((fmt) => (
                  <button key={fmt} type="button" className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-zinc-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/30 transition-all duration-300">{fmt}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- SERMON FORM --- */}
        {type === "sermon" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Sermon Title</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="text" 
                placeholder="e.g. Walking in Grace" 
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.title ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Speaker</label>
                <input 
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="Pastor Name" 
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.speaker ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Date</label>
                <input 
                  name="sermonDate"
                  value={formData.sermonDate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  type="date" 
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.sermonDate ? 'border-red-500' : 'border-white/10'} text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`} 
                />
              </div>
            </div>
            <div className="group relative cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.03] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Upload Sermon Media</p>
                  <p className="text-[9px] text-zinc-600 mt-1">MP3, WAV or MP4 (Max 50MB)</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- ACTIONS --- */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
          <button onClick={onClose} className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors px-2">Discard</button>
          <button onClick={handleAction} disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-[10px] font-black text-white uppercase tracking-[0.15em] transition-all active:scale-[0.97] shadow-xl shadow-sky-500/20 disabled:opacity-50">
            {loading ? "Processing..." : type === "announcement" ? "Publish Announcement" : type === "event" ? "Create Event" : type === "finance" ? "Generate Report" : "Save Sermon"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
