"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const MissionSection = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden group shadow-2xl">
            <Image
              src="/aboutImages/about1.png"
              alt="Our Mission"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
            <div className="absolute bottom-8 left-8 right-8 z-[3]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-2">
                Est. 1977 in Kenya
              </div>
              <h3 className="text-base md:text-lg font-bold text-white">Dedicated to Excellence in Ministry</h3>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
                Our Purpose
              </h2>
              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white leading-[1.1]">
                Empowering Lives Through <br />
                <span className="text-zinc-400">Authentic Faith.</span>
              </h3>
            </div>
            
            <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed font-medium">
              We believe that every individual has a unique purpose and a divine calling. Our mission is to provide a nurturing environment where faith is strengthened, community is built, and lives are transformed by the grace of God.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <h4 className="text-[11px] md:text-xs font-bold text-white">Integrity & Care</h4>
                <p className="text-[9px] md:text-[10px] text-zinc-500 leading-normal">
                  We lead with honesty and prioritize the well-being of our community above all else.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h4 className="text-[11px] md:text-xs font-bold text-white">Evangelism</h4>
                <p className="text-[9px] md:text-[10px] text-zinc-500 leading-normal">
                  Sharing the message of hope and love to every corner of our nation with passion.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white hover:gap-4 transition-all"
              >
                Learn more about our journey
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
