"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LeadershipPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero3.png"
          alt="National Leadership"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Our Leaders
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            National Leadership
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Meet the executive council, diocesan bishops, and administrative leaders guiding the spiritual mission of NTCOGK.
          </p>
        </div>
      </section>

      {/* Main Content & Banner */}
      <section className="py-24 px-6 max-w-6xl container mx-auto">
        <div className="min-h-[350px] flex items-center justify-center p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5">
          <div className="text-center space-y-6 max-w-md mx-auto">
            
            {/* Animated Glowing Icon */}
            <div className="w-20 h-20 bg-amber-500/5 border border-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-amber-500/80 relative shadow-inner">
              <div className="absolute inset-0 rounded-[2rem] bg-amber-500/5 animate-pulse" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            {/* Message Banner */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Leadership Details Coming Soon
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                We are currently cataloging the comprehensive profiles of our executive leaders, regional overseers, and national council members. Please check back soon as we publish the official directory.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-200"
              >
                About NTCOGK
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all duration-200"
              >
                Contact Administration
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
