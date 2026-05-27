"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/modals/modal";
import { useAuth } from "@/lib/useAuth";
import api from "@/lib/axios";
import { toast } from "sonner";

type ClergyActionType = "announcement" | "event" | "finance" | "sermon" | "feedback";
type ReportTab = "clergy" | "church" | "uploads";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ClergyActionType;
}

export default function ClergyActionModal({ isOpen, onClose, type }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState<ReportTab>("clergy");

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
    subject: "General Feedback",
    message: "",
    // Report specific fields
    clergyName: "",
    clergyEmail: "",
    clergyPhone: "",
    clergyRole: "",
    churchName: "",
    region: "",
    district: "",
    reportMonth: "",
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData(prev => ({
        ...prev,
        clergyName: user.fullName || "",
        clergyEmail: user.email || "",
        clergyPhone: user.phone || "",
        clergyRole: user.role === "ADMIN" ? "Administrator" : "Clergy",
        churchName: user.churchName || "",
      }));
    }
    // Reset tab when modal opens
    if (isOpen) setActiveReportTab("clergy");
  }, [user, isOpen]);

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
    finance: { title: "Submit Report", subtitle: "Stewardship breakdown" },
    sermon: { title: "Upload Sermon", subtitle: "Share word with others" },
    feedback: { title: "Give Feedback", subtitle: "Help us improve" },
  };

  const validateReportTab = (tab: ReportTab): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (tab === "clergy") {
      if (!formData.clergyName.trim()) { newErrors.clergyName = true; isValid = false; }
      if (!formData.clergyEmail.trim()) { newErrors.clergyEmail = true; isValid = false; }
    } else if (tab === "church") {
      if (!formData.churchName.trim()) { newErrors.churchName = true; isValid = false; }
      if (!formData.reportMonth.trim()) { newErrors.reportMonth = true; isValid = false; }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleAction = async () => {
    if (type === "feedback") {
      if (!formData.message.trim()) {
        toast.error("Please enter a message.");
        return;
      }

      setLoading(true);
      try {
        const res = await api.post("/feedback", {
          subject: formData.subject,
          message: formData.message,
        });
        toast.success(res.data.message || "Feedback sent successfully!");
        setFormData(prev => ({ ...prev, message: "", subject: "General Feedback" }));
        onClose();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to send feedback.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (type === "finance") {
      if (activeReportTab === "clergy" && validateReportTab("clergy")) {
        setActiveReportTab("church");
        return;
      }
      if (activeReportTab === "church" && validateReportTab("church")) {
        setActiveReportTab("uploads");
        return;
      }
      if (activeReportTab === "uploads") {
        setLoading(true);
        // Simulate submission
        setTimeout(() => {
          setLoading(false);
          toast.success("Report submitted successfully!");
          onClose();
        }, 1500);
        return;
      }
      return;
    }

    if (type === "announcement") {
      if (!formData.title.trim()) {
        toast.error("Please enter an announcement title.");
        setErrors(prev => ({ ...prev, title: true }));
        return;
      }
      if (!formData.content.trim()) {
        toast.error("Please enter the announcement content.");
        setErrors(prev => ({ ...prev, content: true }));
        return;
      }

      setLoading(true);
      try {
        const res = await api.post("/announcements", {
          title: formData.title,
          body: formData.content,
        });
        toast.success(res.data.message || "Announcement published successfully!");
        setFormData(prev => ({ ...prev, title: "", content: "" }));
        onClose();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to publish announcement.");
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    // Simulate action for other non-implemented types
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
        {/* --- REPORT TABS (Only for finance) --- */}
        {type === "finance" && (
          <div className="flex border-b border-white/5 pb-2 mb-4">
            {(["clergy", "church", "uploads"] as ReportTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === "clergy") setActiveReportTab("clergy");
                  else if (tab === "church" && validateReportTab("clergy")) setActiveReportTab("church");
                  else if (tab === "uploads" && validateReportTab("clergy") && validateReportTab("church")) setActiveReportTab("uploads");
                }}
                className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all border-b-2 text-center ${activeReportTab === tab
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                {tab === "clergy" ? "1. Clergy" : tab === "church" ? "2. Church" : "3. Uploads"}
              </button>
            ))}
          </div>
        )}

        {/* --- FEEDBACK FORM --- */}
        {type === "feedback" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Subject</label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-zinc-900 text-white">General Feedback</option>
                  <option className="bg-zinc-900 text-white">Service Experience</option>
                  <option className="bg-zinc-900 text-white">Ministry Suggestion</option>
                  <option className="bg-zinc-900 text-white">Technical Issue</option>
                  <option className="bg-zinc-900 text-white">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Your Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Tell us what's on your mind..."
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.message ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none`}
              />
            </div>
          </>
        )}

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Upload Event Banner</p>
                  <p className="text-[9px] text-zinc-600 mt-1">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- FINANCE (REPORT) FORM --- */}
        {type === "finance" && (
          <div className="min-h-[280px]">
            {activeReportTab === "clergy" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Clergy Full Name</label>
                  <input
                    name="clergyName"
                    value={formData.clergyName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.clergyName ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Email Address</label>
                  <input
                    name="clergyEmail"
                    value={formData.clergyEmail}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="clergy@ntcogk.org"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.clergyEmail ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Phone Number</label>
                    <input
                      name="clergyPhone"
                      value={formData.clergyPhone}
                      onChange={handleInputChange}
                      type="tel"
                      placeholder="+254..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Position / Role</label>
                    <input
                      name="clergyRole"
                      value={formData.clergyRole}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeReportTab === "church" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Church Name</label>
                  <input
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Busia Possibility Center"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.churchName ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Region</label>
                    <input
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="e.g. Western"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">District</label>
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="e.g. Busia"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Reporting Month</label>
                  <input
                    name="reportMonth"
                    value={formData.reportMonth}
                    onChange={handleInputChange}
                    type="month"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.reportMonth ? 'border-red-500' : 'border-white/10'} text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`}
                  />
                </div>
              </div>
            )}

            {activeReportTab === "uploads" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="group relative cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.03] transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Upload Financial Report</p>
                      <p className="text-[9px] text-zinc-600 mt-1">PDF or Excel (Max 10MB)</p>
                    </div>
                  </div>
                </div>
                <div className="group relative cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.03] transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Ministry Activities Report</p>
                      <p className="text-[9px] text-zinc-600 mt-1">PDF or Word (Max 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
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
          <button
            onClick={type === "finance" && activeReportTab !== "clergy" ? () => {
              if (activeReportTab === "uploads") setActiveReportTab("church");
              else if (activeReportTab === "church") setActiveReportTab("clergy");
            } : onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors px-2"
          >
            {type === "finance" && activeReportTab !== "clergy" ? "Back" : "Discard"}
          </button>
          <button onClick={handleAction} disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-[10px] font-black text-white uppercase tracking-[0.15em] transition-all active:scale-[0.97] shadow-xl shadow-sky-500/20 disabled:opacity-50">
            {loading ? "Processing..." :
              type === "finance" ? (activeReportTab === "uploads" ? "Submit Report" : "Next Step") :
                type === "announcement" ? "Publish Announcement" :
                  type === "event" ? "Create Event" :
                    type === "feedback" ? "Send Feedback" : "Save Sermon"
            }
          </button>
        </div>
      </div>
    </Modal>
  );
}
