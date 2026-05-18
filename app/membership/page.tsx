"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const MembershipApplicationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    assembly: "",
    waterBaptized: "Yes",
    holyGhostBaptized: "Yes",
    agreement: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.dob || !formData.assembly) {
      toast.error("Please fill in all required personal and assembly details.");
      return;
    }

    if (!formData.agreement) {
      toast.error("You must agree to uphold the Articles of Faith to apply.");
      return;
    }

    // Success response - Client side only
    toast.success("Membership application logged successfully!");
    setSubmitted(true);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero2.png"
          alt="Church Membership"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Covenant & Fellowship
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Official Membership
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Apply for official membership to commit to spiritual accountability, stewardship, and fellowship within the NTCOGK family.
          </p>
        </div>
      </section>

      {/* Form Content Section */}
      <section className="py-20 px-6 max-w-3xl container mx-auto">
        {submitted ? (
          /* Success Card */
          <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-emerald-500/20 backdrop-blur-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Application Submitted!</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>, for committing your spiritual walk with NTCOGK. Your application for <span className="text-white font-bold">{formData.assembly}</span> has been logged on the client-side and is awaiting review.
              </p>
            </div>
            <div className="pt-4 flex gap-3 justify-center">
              <Link
                href="/hq"
                className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-200"
              >
                Visit HQ
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    dob: "",
                    gender: "Male",
                    assembly: "",
                    waterBaptized: "Yes",
                    holyGhostBaptized: "Yes",
                    agreement: false,
                  });
                }}
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all duration-200"
              >
                Apply Again
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section Header */}
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Membership Application</h3>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wide">Please complete all fields carefully.</p>
              </div>

              {/* Personal Information Group */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">1. Personal Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    />
                  </div>

                  {/* DOB */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Spiritual background Group */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">2. Spiritual Fellowship</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Home Assembly */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Preferred Local Assembly *</label>
                    <input
                      type="text"
                      required
                      value={formData.assembly}
                      onChange={(e) => setFormData({ ...formData, assembly: e.target.value })}
                      placeholder="e.g. Karen Assembly, Eldoret Assembly"
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    />
                  </div>

                  {/* Water Baptized */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Water Baptized by Immersion?</label>
                    <select
                      value={formData.waterBaptized}
                      onChange={(e) => setFormData({ ...formData, waterBaptized: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Holy Ghost Baptized */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider pl-1">Baptized with the Holy Ghost?</label>
                    <select
                      value={formData.holyGhostBaptized}
                      onChange={(e) => setFormData({ ...formData, holyGhostBaptized: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Agreement checkbox */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-black border border-white/5">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.agreement}
                    onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-black text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="agreement" className="text-[10px] text-zinc-400 leading-normal font-medium cursor-pointer select-none">
                    I solemnly covenant to uphold the 14 Articles of Faith, actively support the spiritual mission, support my local church through giving, and maintain Christian fellowship with the New Testament Church of God Kenya.
                  </label>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 hover:text-white hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-amber-500/10"
                >
                  Submit Official Application
                </button>
              </div>

            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default MembershipApplicationPage;
