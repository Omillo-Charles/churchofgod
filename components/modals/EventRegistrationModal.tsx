"use client";

import React, { useState } from "react";
import Modal from "./modal";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    fee?: string;
  } | null;
}

type Tab = "bio" | "church" | "payment";

export default function EventRegistrationModal({ isOpen, onClose, event }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("bio");
  const [loading, setLoading] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    region: "",
    district: "",
    church: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let isValid = true;
    if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (name === "phone") {
      isValid = /^(?:\+254|0)[17]\d{8}$/.test(value);
    } else if (name === "name") {
      isValid = value.trim().length >= 3;
    } else {
      isValid = value.trim().length > 0;
    }
    setErrors(prev => ({ ...prev, [name]: !isValid }));
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    validateField(e.target.name, e.target.value);
  };

  if (!event) return null;

  const isFree = !event.fee || event.fee.toLowerCase().includes("free");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const finalValue = name === "email" ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const nextTab = () => {
    if (activeTab === "bio") {
      if (!formData.name || !formData.phone || !formData.email) {
        return toast.error("Please fill in basic contact details.");
      }
      setActiveTab("church");
    } else if (activeTab === "church") {
      if (!formData.church) {
        return toast.error("Please provide your church name.");
      }
      if (isFree) {
        handleCompleteRegistration();
      } else {
        setActiveTab("payment");
      }
    }
  };

  const prevTab = () => {
    if (activeTab === "church") setActiveTab("bio");
    if (activeTab === "payment") setActiveTab("church");
  };

  const handleCompleteRegistration = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful! See you at the event.");
      onClose();
      setActiveTab("bio");
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        gender: "",
        region: "",
        district: "",
        church: "",
      });
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Event Registration"
      subtitle={event.title}
      maxWidth="max-w-[480px]"
    >
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {[
            { id: "bio", label: "Bio Data" },
            { id: "church", label: "Church" },
            { id: "payment", label: "Payment", hidden: isFree },
          ].map((step, idx) => (
            !step.hidden && (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 ${
                    activeTab === step.id 
                      ? "bg-amber-500 text-white ring-4 ring-amber-500/20" 
                      : idx < (isFree && activeTab === "church" ? 2 : ["bio", "church", "payment"].indexOf(activeTab))
                        ? "bg-emerald-500 text-white" 
                        : "bg-zinc-800 text-zinc-500"
                  }`}>
                    {idx < (isFree && activeTab === "church" ? 2 : ["bio", "church", "payment"].indexOf(activeTab)) ? "✓" : idx + 1}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${activeTab === step.id ? "text-white" : "text-zinc-600"}`}>
                    {step.label}
                  </span>
                </div>
                {idx < (isFree ? 1 : 2) && (
                  <div className={`flex-1 h-[1px] mb-4 mx-2 ${idx < (isFree && activeTab === "church" ? 1 : ["bio", "church", "payment"].indexOf(activeTab)) ? "bg-emerald-500" : "bg-zinc-800"}`} />
                )}
              </React.Fragment>
            )
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[280px]">
          {activeTab === "bio" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Full Name</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="John Doe" 
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.name ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Phone Number</label>
                  <input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    onBlur={handleBlur}
                    type="tel" 
                    placeholder="0712..." 
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    onBlur={handleBlur}
                    type="email" 
                    placeholder="john@example.com" 
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.email ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Age Group</label>
                  <select 
                    name="age" 
                    value={formData.age} 
                    onChange={handleInputChange} 
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.age ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer`}
                  >
                    <option className="bg-zinc-900" value="">Select Age</option>
                    <option className="bg-zinc-900" value="12-17">12-17</option>
                    <option className="bg-zinc-900" value="18-24">18-24</option>
                    <option className="bg-zinc-900" value="25-35">25-35</option>
                    <option className="bg-zinc-900" value="35+">35+</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleInputChange} 
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.gender ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer`}
                  >
                    <option className="bg-zinc-900" value="">Select Gender</option>
                    <option className="bg-zinc-900" value="Male">Male</option>
                    <option className="bg-zinc-900" value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "church" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Region</label>
                <input 
                  name="region" 
                  value={formData.region} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="e.g. Nairobi" 
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.region ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">District</label>
                <input 
                  name="district" 
                  value={formData.district} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="e.g. Karen" 
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.district ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Church Name</label>
                <input 
                  name="church" 
                  value={formData.church} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="High Life Cathedral" 
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border ${errors.church ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all`} 
                />
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center space-y-2">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Total to Pay</p>
                <p className="text-3xl font-black text-white">{event.fee}</p>
              </div>
              
              <div className="space-y-4">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">Select Payment Method</label>
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00be00] flex items-center justify-center overflow-hidden text-white font-black text-xs">
                      M
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">M-Pesa Express</p>
                      <p className="text-[9px] text-zinc-400">STK Push to your phone</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-amber-500 bg-white" />
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    toast.info(`STK Push sent to ${formData.phone}`);
                    setHasPaid(true);
                  }}
                  className="w-full py-4 rounded-xl bg-[#00be00] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#00a000] transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                >
                  Pay Now
                </button>
              </div>
              
              <p className="text-[9px] text-zinc-500 text-center leading-relaxed italic">
                {hasPaid 
                  ? "Payment initiated. Please check your phone." 
                  : "Click 'Pay Now' to receive an M-Pesa prompt on your phone."}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
          <button
            onClick={activeTab === "bio" ? onClose : prevTab}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-4 transition-colors"
          >
            {activeTab === "bio" ? "Cancel" : "Back"}
          </button>
          
          <button
            onClick={activeTab === "payment" || (isFree && activeTab === "church") ? handleCompleteRegistration : nextTab}
            disabled={loading || (activeTab === "payment" && !hasPaid)}
            className="flex-1 py-4 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
            {loading 
              ? "Processing..." 
              : activeTab === "payment" || (isFree && activeTab === "church") 
                ? `Complete Registration` 
                : "Next Step"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
