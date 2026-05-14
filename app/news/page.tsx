"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewsPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero11.png"
          alt="Church News & Updates"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Stay Informed
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            News & Updates
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            The latest stories, announcements, and testimonies from the New Testament Church of God Kenya. Discover what God is doing in our community.
          </p>
        </div>
      </section>

      {/* 2. Content Section (Placeholder) */}
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-12 md:p-20 bg-zinc-900/30 rounded-[3rem] border border-dashed border-zinc-800 text-center space-y-8 overflow-hidden group">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-amber-500 shadow-xl shadow-amber-500/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Our Newsroom is <span className="text-amber-500">Preparing</span></h2>
                  <p className="text-[11px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold">Bringing you the latest updates very soon</p>
                </div>

                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto font-medium">
                  We are currently curating stories of faith, mission reports, and community announcements to share with you. Our news portal will be live shortly with inspiring content from across our regions.
                </p>

                <div className="pt-4">
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95"
                  >
                    Back to Home
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Newsletter Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="m22 9-10 7L2 9"/></svg>
        </div>
        <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Get the Scoop</h3>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Stay in the <span className="text-amber-500">Loop</span></h2>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
              Be the first to know when we launch our newsroom and receive exclusive updates on church life, events, and testimonies.
            </p>
          </div>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <button className="px-8 py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20">
              Notify Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
