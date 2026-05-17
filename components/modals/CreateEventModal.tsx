"use client";

import React, { useState } from "react";
import Modal from "@/components/modals/modal";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Tab = "details" | "logistics" | "media";

export default function CreateEventModal({ isOpen, onClose, onSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Worship Service",
    description: "",
    date: "",
    time: "",
    location: "",
    fee: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateTab = (tab: Tab): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (tab === "details") {
      if (!formData.title.trim()) {
        newErrors.title = true;
        isValid = false;
      }
    } else if (tab === "logistics") {
      if (!formData.date.trim()) {
        newErrors.date = true;
        isValid = false;
      }
      if (!formData.location.trim()) {
        newErrors.location = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextTab = () => {
    if (activeTab === "details" && validateTab("details")) {
      setActiveTab("logistics");
    } else if (activeTab === "logistics" && validateTab("logistics")) {
      setActiveTab("media");
    }
  };

  const prevTab = () => {
    if (activeTab === "media") setActiveTab("logistics");
    else if (activeTab === "logistics") setActiveTab("details");
  };

  const handleSubmit = async () => {
    if (!validateTab("details") || !validateTab("logistics")) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("date", formData.date);
      if (formData.time) data.append("time", formData.time);
      data.append("location", formData.location);
      data.append("fee", formData.fee || "0");
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await api.post("/events", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Event created successfully!");
        onClose();
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
          title: "",
          category: "Worship Service",
          description: "",
          date: "",
          time: "",
          location: "",
          fee: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setActiveTab("details");
      } else {
        toast.error(res.data.message || "Failed to create event.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Worship Service",
    "Youth Ministry",
    "Women Ministry",
    "Men Ministry",
    "Community Outreach",
    "Prayer Meeting",
    "Other",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Event"
      subtitle="Organize new activity"
      maxWidth="max-w-[480px]"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 pb-2">
          {(["details", "logistics", "media"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "details") setActiveTab("details");
                else if (tab === "logistics" && validateTab("details")) setActiveTab("logistics");
                else if (tab === "media" && validateTab("details") && validateTab("logistics")) setActiveTab("media");
              }}
              className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all border-b-2 text-center ${
                activeTab === tab
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab === "details" ? "1. Details" : tab === "logistics" ? "2. Logistics" : "3. Media & Cost"}
            </button>
          ))}
        </div>

        {/* Tab Forms */}
        <div className="min-h-[220px]">
          {activeTab === "details" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="e.g. Youth Camp 2026"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                    errors.title ? "border-red-500" : "border-white/10"
                  } text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us what this event is about..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === "logistics" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    type="date"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                      errors.date ? "border-red-500" : "border-white/10"
                    } text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                    Time
                  </label>
                  <input
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    type="time"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="e.g. Karen Chapel Sanctuary"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border ${
                    errors.location ? "border-red-500" : "border-white/10"
                  } text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all`}
                />
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Event Banner / Image
                </label>
                
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 h-36 bg-zinc-900 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl h-36 bg-white/[0.01] hover:bg-white/[0.03] hover:border-sky-500/30 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Choose Event Image</span>
                    <span className="text-[8px] text-zinc-600 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] px-1">
                  Registration Fee (KES)
                </label>
                <input
                  name="fee"
                  value={formData.fee}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="0 (or leave blank for Free)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
          <button
            onClick={activeTab === "details" ? onClose : prevTab}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-4 transition-colors"
          >
            {activeTab === "details" ? "Cancel" : "Back"}
          </button>

          <button
            onClick={activeTab === "media" ? handleSubmit : nextTab}
            disabled={loading}
            className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
            {loading ? "Processing..." : activeTab === "media" ? "Create Event" : "Next Step"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
