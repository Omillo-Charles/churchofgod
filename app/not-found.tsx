"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.03),transparent_50%)]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          {/* Logo or Icon */}
          <div className="relative inline-block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 flex items-center justify-center mx-auto shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 md:w-16 md:h-16">
                <path d="M2 6h20"/><path d="M10 11v11"/><path d="M14 11v11"/><path d="M18 6v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6"/><path d="M4 6V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3"/>
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Lost?
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter opacity-10">404</h1>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight -mt-12 md:-mt-20">
                Page <span className="text-amber-500">Not Found</span>
              </h2>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
              The page you are looking for might have been moved, deleted, or never existed. Let's get you back on the right path.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Back to Home
            </Link>
            <Link 
              href="/contact"
              className="px-10 py-5 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all shadow-xl"
            >
              Contact Support
            </Link>
          </div>

          {/* Decorative Quote */}
          <div className="pt-12">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] italic">
              "Thy word is a lamp unto my feet, and a light unto my path."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
