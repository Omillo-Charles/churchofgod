"use client";

import React from "react";
import Image from "next/image";

const HeadquartersPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/aboutImages/about2.png"
          alt="National Headquarters"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            NTCOGK National Center
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            National Headquarters
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Welcome to the administrative and spiritual heart of the New Testament Church of God Kenya, coordinating our growth and community outreach.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Our Location</h2>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Karen, Nairobi</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Situated in the tranquil suburb of Karen, the National Headquarters serves as the central administrative hub, supporting over 224 congregations and coordinating national ministries across Kenya.
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                {/* Physical Address */}
                <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/5 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Physical Address</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      New Testament Church of God Kenya HQ,<br />
                      Off Ndege Road, Karen,<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/5 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Office Hours</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Monday – Friday: 8:00 AM – 5:00 PM<br />
                      Weekends & Holidays: Closed
                    </p>
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/5 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Contacts</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Phone: +254 20 2341234<br />
                      Email: info@ntcogk.or.ke
                    </p>
                  </div>
                </div>
              </div>

              {/* Helpful Guideline */}
              <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10">
                <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">Driving Directions</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  From Ngong Road, proceed past the Karen Roundabout onto Langata Road, turn onto Ndege Road at the main intersection. The HQ is situated approximately 1.2 kilometers down Ndege Road on your right side.
                </p>
              </div>
            </div>

            {/* Right Column: Google Maps (7 cols) */}
            <div className="lg:col-span-7 h-[500px] md:h-[600px] w-full relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl group hover:border-amber-500/20 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7106783393597!2d36.724445375531516!3d-1.3501151986371007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05fe35e5f7ad%3A0x62943ed49175acb5!2sNew%20Testament%20Church%20Of%20God%20HQ!5e0!3m2!1sen!2ske!4v1779097106896!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeadquartersPage;
