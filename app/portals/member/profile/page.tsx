"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { toast } from "sonner";
import api from "@/lib/axios";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  // Local state for profile form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    homeCounty: "",
    churchName: "Karen Chapel", // Default or current church
    ministry: "Worship Team",
    address: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        homeCounty: user.homeCounty || "",
        churchName: user.churchName || "",
        ministry: user.ministry || "",
        address: user.address || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.patch("/users/me", formData);
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 md:pt-2 md:p-8 lg:pt-2 lg:p-12 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">

      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">My Profile</h1>
        <p className="text-zinc-500 text-sm">Manage your personal information and church details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Profile Avatar Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-zinc-900/50 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.05),transparent_50%)]" />

          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-4xl font-black text-black shadow-2xl shadow-amber-500/20">
              {formData.fullName ? formData.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "M"}
            </div>
            <button type="button" className="absolute bottom-1 right-1 p-2 rounded-full bg-zinc-800 border border-white/10 text-white hover:bg-amber-500 hover:text-black transition-all shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
            </button>
          </div>

          <div className="text-center md:text-left space-y-2 relative z-10">
            <h2 className="text-xl font-bold text-white">{formData.fullName || "Member Name"}</h2>
            <p className="text-zinc-400 text-sm">{formData.email || "member@ntcogk.org"}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{user?.role || "MEMBER"}</span>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Basic Information */}
          <div className="space-y-6 p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-5 py-3 bg-zinc-950/50 border border-white/5 rounded-2xl text-sm text-zinc-500 cursor-not-allowed outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 7..."
                  className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Church & Community */}
          <div className="space-y-6 p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Church & Community</h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Local Church</label>
                <input
                  type="text"
                  name="churchName"
                  value={formData.churchName}
                  onChange={handleChange}
                  placeholder="e.g. Busia Possibility Center"
                  className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Home County</label>
                <input
                  type="text"
                  name="homeCounty"
                  value={formData.homeCounty}
                  onChange={handleChange}
                  placeholder="e.g. Busia"
                  className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Primary Ministry</label>
                <input
                  type="text"
                  name="ministry"
                  value={formData.ministry}
                  onChange={handleChange}
                  placeholder="e.g. Youth Ministry"
                  className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="md:col-span-2 space-y-6 p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Personal Biography</h3>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">About Me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="w-full px-5 py-3 bg-zinc-950 border border-white/5 rounded-2xl text-sm text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 rounded-2xl text-xs font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-10 py-3 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 uppercase tracking-widest text-[11px] disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Profile Changes"}
          </button>
        </div>
      </form>

      {/* Bottom Spacer */}
      <div className="h-10" />
    </div>
  );
}
