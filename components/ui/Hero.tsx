"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 mix-blend-luminosity"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Balanced Overlays */}
        <div className="absolute inset-0 bg-black/10 z-[5]" />
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black via-black/70 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        
        {/* Modern Mesh Glows for Atmosphere */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-zinc-800/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-zinc-700/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      {/* Centered Content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-2 animate-in fade-in zoom-in-95 duration-1000">
          <p className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-[0.4em]">
            Welcome to
          </p>
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-amber-500 uppercase tracking-[0.2em] drop-shadow-sm leading-tight">
            New Testament Church of God Kenya
          </h1>
          <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto pt-4">
            An integral part of the Church of God World Missions, headquartered in Cleveland, Tennessee, USA.
            Established in Kenya in 1977, we are a beacon of faith, community care, evangelism, and integrity across the nation.
          </p>
        </div>
      </div>

      {/* Bottom Floating CTAs */}
      <div className="absolute bottom-24 left-0 right-0 z-30 px-6 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        <div className="container mx-auto flex justify-center gap-6">
          <Link
            href="/visit"
            className="group px-8 py-3.5 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Join a Service
          </Link>
          <Link
            href="/ministries"
            className="px-8 py-3.5 bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            Explore Ministries
          </Link>
          <Link
            href="/give"
            className="px-8 py-3.5 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-500 font-bold rounded-2xl hover:bg-amber-500/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            Giving
          </Link>
        </div>
      </div>

      {/* Mobile CTAs (further from text) */}
      <div className="md:hidden pt-40 space-y-3 z-30 px-6 w-full">
        <Link
          href="/visit"
          className="block w-full px-8 py-3 bg-white text-black font-bold rounded-2xl text-center shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Join a Service
        </Link>
        <Link
          href="/ministries"
          className="block w-full px-8 py-3 bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl text-center active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          Explore Ministries
        </Link>
        <Link
          href="/give"
          className="block w-full px-8 py-3 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-500 font-bold rounded-2xl text-center active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          Giving
        </Link>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 md:hidden">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 animate-pulse">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-zinc-500/30 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-2 bg-amber-500 rounded-full animate-scroll-dot" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: scroll-dot 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
