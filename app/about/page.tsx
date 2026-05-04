"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { label: "Members", value: "15,000+" },
    { label: "Local Churches", value: "224" },
    { label: "Regional Offices", value: "6" },
    { label: "Districts", value: "28+" },
  ];

  const regions = [
    { name: "North Central", bishop: "Samuel Wainaina", role: "National Secretary" },
    { name: "Nairobi", bishop: "Dickson Tito Mwalili", role: "National Treasurer" },
    { name: "Coast", bishop: "Benea Alukwe Amakhungu", role: "National Education Coordinator" },
    { name: "Western", bishop: "Simon Ngure Ben", role: "National Prayer Coordinator" },
    { name: "North Western", bishop: "Protus Pamba Orima", role: "Regional Bishop" },
    { name: "Nyanza", bishop: "Paul Obadha Ohuare", role: "National Convention Coordinator" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/aboutImages/about2.png"
          alt="About NTCOGK"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Our Story
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            About NTCOGK
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            A vibrant Pentecostal church serving Kenya since 1977, building faith, community, and hope across the nation.
          </p>
        </div>
      </section>

      {/* Identity & Global Connection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Our Identity</h3>
                <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase">Established on Faith</h2>
              </div>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Established in 1977 in Karatina, Nyeri District, the New Testament Church of God Kenya has grown into a strong national presence. We are an integral part of the global Church of God movement, connected to a worldwide mission headquartered in Cleveland, Tennessee.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-5 md:p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">Founded</p>
                  <p className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white">1977 in Karatina</p>
                </div>
                <div className="p-5 md:p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">Global HQ</p>
                  <p className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white">Cleveland, Tennessee</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/aboutImages/about1.png"
                alt="Church Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-[2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-4 md:space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="md:w-[120px] md:h-[120px]"><circle cx="12" cy="12" r="10"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><circle cx="12" cy="12" r="1"/></svg>
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Our Vision</h3>
              <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-tight italic">
                "Build a financially sound and spiritually mature church."
              </p>
              <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Becoming a leading soul-winning Pentecostal church, extending presence and influence throughout Kenya and East Africa.
              </p>
            </div>
            <div className="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-4 md:space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="md:w-[120px] md:h-[120px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Our Mission</h3>
              <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-tight italic">
                "Mobilize and motivate leadership into working towards achieving financial self-reliance."
              </p>
              <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Involving the youth in viable projects and inculcating discipleship formation through Christian Education and training programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline Narrative */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Our History</h3>
            <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase">A Legacy of Faith</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="md:col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 pt-1">1886 Global Origins</div>
              <div className="md:col-span-8 space-y-3">
                <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white">The Church of God movement began in the United States with only eight men.</p>
                <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">It has since grown into a worldwide denomination spreading the gospel across all continents.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="md:col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 pt-1">1977 Kenya Foundation</div>
              <div className="md:col-span-8 space-y-3">
                <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white">Established on May 13, 1977 in Karatina, Nyeri District by Founder Francis Gachara.</p>
                <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">Claudea served as the first missionary National Overseer, marking the beginning of a transformative ministry in East Africa.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <p className="text-2xl md:text-3xl font-black text-amber-500 mb-1">{stat.value}</p>
                <p className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-16 md:py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/clergyImages/clergy1.png"
                  alt="Dr. David Gilbert Bwire"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-[2]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[2]" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">National Leadership</h3>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight uppercase">Dr. David <br />Gilbert Bwire</h2>
                <p className="text-amber-500 font-bold text-[10px] md:text-xs uppercase tracking-widest italic">National Administrative Bishop</p>
              </div>
              <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed max-w-xl">
                Dr. David Gilbert Bwire is the fifth National Overseer since 1977. With over 30 years of pastoral service, he leads with a unique blend of spiritual maturity and strategic professional expertise.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Academic Qualifications</p>
                  <ul className="text-[10px] md:text-[11px] space-y-1.5 text-zinc-300">
                    <li>• Honorary Doctor in Divinity (USA)</li>
                    <li>• MBA Strategic Management (KeMU)</li>
                    <li>• BSc Christian Ministries (USA)</li>
                    <li>• PhD in Leadership (Ongoing - JKUAT)</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Professional Experience</p>
                  <ul className="text-[10px] md:text-[11px] space-y-1.5 text-zinc-300">
                    <li>• Certified Public Accountant (CPA)</li>
                    <li>• CEO of Damajo Consultancy</li>
                    <li>• Ordained Bishop with WM-USA</li>
                    <li>• 30+ Years Ministry Service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Bishops */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-12 md:mb-16 space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Regional Leadership</h3>
            <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase">Council of Bishops</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            {regions.map((region) => (
              <div key={region.name} className="p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-amber-500/20 transition-all">
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-3">{region.name} Region</p>
                <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white mb-1">{region.bishop}</h4>
                <p className="text-[10px] text-zinc-500 italic leading-relaxed">{region.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-4 md:space-y-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Community Care</h3>
              <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Supporting orphans, vulnerable children, HIV/AIDS care programs, and assistance for widows through various community outreach initiatives.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><circle cx="12" cy="8" r="3"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Evangelism</h3>
              <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Church planting in remote areas, street outreach, and commitment to the Great Commission across Kenya and East Africa.
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M12 22v-5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M12 11v4"/></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">Integrity</h3>
              <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Upholding moral and spiritual accountability, financial transparency, ethical leadership, and biblical stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Closing */}
      <section className="py-16 md:py-24 text-center space-y-6 md:space-y-8 bg-zinc-50 dark:bg-black">
        <div className="max-w-2xl mx-auto px-6 space-y-3 md:space-y-4">
          <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed italic">
            Looking back on over 40 years of ministry, the church gives thanks for its journey and growth. Built on a strong foundation of faith and doctrine, it continues to impact lives across Kenya.
          </p>
          <div className="pt-6 md:pt-8">
            <h2 className="text-lg md:text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">To God be the Glory!</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
