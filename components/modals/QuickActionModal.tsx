"use client";

import React, { useState } from "react";
import Modal from "@/components/modals/modal";
import api from "@/lib/axios";
import { toast } from "sonner";

type ActionType = "give" | "feedback" | "prayer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ActionType;
}

export default function QuickActionModal({ isOpen, onClose, type }: Props) {
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    amount: "",
    category: "Tithe",
    method: "M-Pesa",
    subject: type === "feedback" ? "General Feedback" : "",
    message: "",
    details: "",
    isUrgent: false,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: any) => {
    let isValid = true;
    if (typeof value === 'string') {
      isValid = value.trim().length > 0;
    } else if (typeof value === 'number') {
      isValid = value > 0;
    }
    setErrors(prev => ({ ...prev, [name]: !isValid }));
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const titles = {
    give: { title: "Give Online", subtitle: "Stewardship & Support" },
    feedback: { title: "Give Feedback", subtitle: "Help us improve" },
    prayer: { title: "Prayer Request", subtitle: "We are here to pray with you" },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    const val = inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    if (type === "give") {
      toast.info("M-Pesa Express prompt will be sent to your phone.");
      onClose();
      return;
    }

    const payload = type === "feedback" 
      ? { subject: formData.subject, message: formData.message }
      : { subject: formData.subject, details: formData.details, isUrgent: formData.isUrgent };

    if (type === "feedback" && !formData.message.trim()) return toast.error("Please enter a message.");
    if (type === "prayer" && (!formData.subject.trim() || !formData.details.trim())) return toast.error("Please fill in all fields.");

    setLoading(true);
    try {
      const endpoint = type === "feedback" ? "/feedback" : "/prayer";
      const res = await api.post(endpoint, payload);
      toast.success(res.data.message || "Submitted successfully!");
      setFormData({ ...formData, message: "", details: "", subject: type === "feedback" ? "General Feedback" : "", isUrgent: false });
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[type].title}
      subtitle={titles[type].subtitle}
    >
      <div className="space-y-5">
        {/* --- GIVE FORM --- */}
        {type === "give" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Amount (KSh)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. 1000"
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.amount ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Category</label>
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                    <option className="bg-zinc-900 text-white">Tithe</option>
                    <option className="bg-zinc-900 text-white">Offering</option>
                    <option className="bg-zinc-900 text-white">Building Fund</option>
                    <option className="bg-zinc-900 text-white">Missions</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Method</label>
                <div className="relative">
                  <select name="method" value={formData.method} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                    <option className="bg-zinc-900 text-white">M-Pesa</option>
                    <option className="bg-zinc-900 text-white">Card</option>
                    <option className="bg-zinc-900 text-white">Bank Transfer</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">M-Pesa Express</p>
              <p className="text-[9px] text-zinc-600 mt-1">A prompt will be sent to your phone</p>
            </div>
          </>
        )}

        {/* --- FEEDBACK FORM --- */}
        {type === "feedback" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Subject</label>
              <div className="relative">
                <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                  <option className="bg-zinc-900 text-white">General Feedback</option>
                  <option className="bg-zinc-900 text-white">Service Experience</option>
                  <option className="bg-zinc-900 text-white">Ministry Suggestion</option>
                  <option className="bg-zinc-900 text-white">Technical Issue</option>
                  <option className="bg-zinc-900 text-white">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
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
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.message ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all resize-none`}
              />
            </div>
          </>
        )}

        {/* --- PRAYER FORM --- */}
        {type === "prayer" && (
          <>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. Family, Healing, Career"
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.subject ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">Request Details</label>
              <textarea
                name="details"
                rows={4}
                value={formData.details}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Share your request with the clergy..."
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${errors.details ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all resize-none`}
              />
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <input 
                type="checkbox" 
                name="isUrgent"
                checked={formData.isUrgent}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer" 
              />
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mark as urgent</p>
            </div>
          </>
        )}

        {/* --- ACTIONS --- */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors px-2"
          >
            {type === "prayer" ? "Discard" : "Cancel"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[10px] font-black text-white uppercase tracking-[0.15em] transition-all active:scale-[0.97] shadow-xl shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? "Processing..." : type === "give" ? "Complete Giving" : type === "feedback" ? "Send Feedback" : "Submit Request"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
