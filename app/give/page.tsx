"use client";

import React from "react";
import Image from "next/image";

const givingMethods = [
  {
    type: "M-Pesa Paybill",
    title: "Safaricom M-Pesa",
    details: [
      { label: "Business No", value: "000000" },
      { label: "Account No", value: "TITHE / OFFERING / PROJECT" },
    ],
    icon: (
      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <div className="w-5 h-5 rounded-sm bg-emerald-500" />
      </div>
    ),
  },
  {
    type: "Bank Transfer",
    title: "Equity Bank",
    details: [
      { label: "Account Name", value: "NTCOG Kenya" },
      { label: "Account No", value: "0000 0000 0000 0000" },
      { label: "Branch", value: "Karen Branch" },
    ],
    icon: (
      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
      </div>
    ),
  },
];

const categories = [
  { name: "Tithe", desc: "Honoring God with the first fruits of our labor." },
  { name: "General Offering", desc: "Supporting the day-to-day operations of the church." },
  { name: "Missions", desc: "Empowering our outreach programs and global missions." },
  { name: "Church Building", desc: "Contributing to our infrastructure and growth projects." },
];

const GivePage = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero3.png"
          alt="Giving"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-6">
            Generosity & Faith
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
            Supporting the <br />
            <span className="text-amber-500">Work of God.</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Every gift helps us extend our reach and impact lives across Kenya. Thank you for your faithful support.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left: Giving Methods */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Ways to Give</h2>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Direct Contributions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {givingMethods.map((method) => (
                  <div key={method.title} className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-6 group hover:border-amber-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      {method.icon}
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{method.type}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{method.title}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Official Channel</p>
                    </div>
                    <div className="space-y-4 pt-2">
                      {method.details.map((detail) => (
                        <div key={detail.label} className="flex flex-col gap-1">
                          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">{detail.label}</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Secure Giving</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500">All transactions are encrypted and processed through official bank and mobile network channels.</p>
                </div>
              </div>
            </div>

            {/* Right: Categories */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Categories</h2>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Purposeful Giving</h3>
              </div>
              
              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-2">{cat.name}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-relaxed">{cat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 text-center md:text-left">
                <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-loose">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." <br />
                  <span className="text-zinc-900 dark:text-zinc-300">— 2 Corinthians 9:7</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default GivePage;
