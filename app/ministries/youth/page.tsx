"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const YouthPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/youthImages/youth2.png" 
          alt="Youth Ministry"
          fill
          className="object-cover opacity-50 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">
            The Next Generation
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Igniting <br />
            <span className="text-amber-500">The Future.</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed font-medium">
            Empowering youth to live out their faith with passion, purpose, and impact in a modern world.
          </p>
          <div className="pt-4">
            <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-500 hover:text-white transition-all active:scale-95">
              Join The Movement
            </button>
          </div>
        </div>
      </section>

      {/* Core Values / Mission */}
      <section className="py-24 px-6 border-b border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Our Mission</h2>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Rising to the <br />Call of Destiny</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The Youth Ministry at NTCOGK is a vibrant community of young people committed to spiritual growth, authentic worship, and social transformation. We believe in providing a safe space where every young person can discover their God-given identity.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-2xl font-black text-white">500+</span>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Youth</p>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-black text-white">28+</span>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Regions</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="/youthImages/youth1.png"
                alt="Youth Community"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[2]" />
              <div className="absolute bottom-8 left-8 right-8 z-[10]">
                <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] italic">
                  "Let no one despise your youth..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery / Life at Youth */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto space-y-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Community Life</h2>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">Moments in <br className="hidden md:block" /> the Movement</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Capturing the energy, passion, and genuine connection within our youth community across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth3.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth4.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth10.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth11.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Row 2 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth5.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth12.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Row 3 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth6.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[4/5] md:col-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth13.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth14.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Row 4 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth7.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth8.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 text-center bg-black">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Connect With Us</h2>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Your Journey Starts Here.</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Ready to find your place in our community? Reach out to our youth leadership team and get involved in our next gathering.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact?dept=youth" 
              className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-500 hover:text-white transition-all"
            >
              Get In Touch
            </Link>
            <a 
              href="#" 
              className="w-full md:w-auto px-10 py-4 border border-zinc-800 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-900 transition-all"
            >
              Follow @ntcogk_youth
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YouthPage;
