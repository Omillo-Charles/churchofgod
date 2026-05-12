"use client";

import React, { useState } from "react";
import Link from "next/link";

// Member Modals
import GiveModal from "@/components/portals/memberModals/GiveModal";
import FeedbackModal from "@/components/portals/memberModals/FeedbackModal";
import MemberPrayerModal from "@/components/portals/memberModals/MemberPrayerModal";

// --- Stat Cards ---
const stats = [
  {
    label: "Total Giving",
    value: "KSh 45,200",
    change: "+12%",
    positive: true,
    period: "This year",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    color: "amber",
    href: "/portals/member/giving",
  },
  {
    label: "Services Attended",
    value: "38",
    change: "+4",
    positive: true,
    period: "This year",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" />
      </svg>
    ),
    color: "emerald",
    href: "/portals/member/attendance",
  },
  {
    label: "Sermons Watched",
    value: "22",
    change: "+7",
    positive: true,
    period: "This month",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    color: "violet",
    href: "/portals/member/sermons",
  },
  {
    label: "Prayer Requests",
    value: "5",
    change: "Active",
    positive: true,
    period: "Open requests",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
    color: "sky",
    href: "/portals/member/prayer",
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20", glow: "shadow-amber-500/10" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20", glow: "shadow-emerald-500/10" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20", glow: "shadow-violet-500/10" },
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", ring: "ring-sky-500/20", glow: "shadow-sky-500/10" },
};

// --- Upcoming Events ---
const upcomingEvents = [
  {
    title: "Sunday Worship Service",
    date: "Sun, 11 May 2026",
    time: "9:00 AM – 12:00 PM",
    location: "Main Sanctuary",
    type: "Worship",
  },
  {
    title: "Youth Fellowship Night",
    date: "Fri, 16 May 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Youth Hall",
    type: "Ministry",
  },
  {
    title: "Discipleship College Session 4",
    date: "Sat, 17 May 2026",
    time: "8:00 AM – 1:00 PM",
    location: "Education Wing",
    type: "Education",
  },
];

// --- Recent Giving ---
const recentGiving = [
  { type: "Tithe", amount: "KSh 5,000", date: "04 May 2026", status: "Confirmed" },
  { type: "Offering", amount: "KSh 500", date: "27 Apr 2026", status: "Confirmed" },
  { type: "Tithe", amount: "KSh 5,000", date: "20 Apr 2026", status: "Confirmed" },
  { type: "Pledge", amount: "KSh 2,000", date: "13 Apr 2026", status: "Pending" },
];

export default function MemberDashboardPage() {
  const [isGiveOpen, setIsGiveOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  const quickActions = [
    {
      label: "Give Online",
      desc: "Make a tithe or offering",
      onClick: () => setIsGiveOpen(true),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    {
      label: "Give Feedback",
      desc: "Share your thoughts",
      onClick: () => setIsFeedbackOpen(true),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Prayer Request",
      desc: "Submit a request",
      onClick: () => setIsPrayerOpen(true),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      ),
    },
    {
      label: "View Events",
      desc: "Upcoming calendar",
      href: "/events",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">

      {/* Modals */}
      <GiveModal isOpen={isGiveOpen} onClose={() => setIsGiveOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <MemberPrayerModal isOpen={isPrayerOpen} onClose={() => setIsPrayerOpen(false)} />

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-white/5 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08),transparent_60%)]" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Active Member</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Welcome back,{" "}
              <span className="text-amber-400">John! 👋</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              Here&apos;s a snapshot of your church life. Sunday service is in{" "}
              <span className="text-white font-bold">2 days</span>.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-black">JD</span>
              </div>
              <div>
                <p className="text-xs font-black text-white">John Doe</p>
                <p className="text-[9px] text-zinc-500">Karen Chapel • Member since 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const c = colorMap[stat.color];
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`group relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-white/5 p-5 hover:border-white/10 transition-all hover:-translate-y-0.5 hover:shadow-lg ${c.glow}`}
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center mb-4 ${c.text} transition-transform group-hover:scale-110 duration-200`}>
                {stat.icon}
              </div>
              <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{stat.label}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-bold ${stat.positive ? "text-emerald-400" : "text-rose-400"}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-zinc-600">{stat.period}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const content = (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-200">
                  {action.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{action.label}</p>
                  <p className="text-[9px] text-zinc-600 mt-0.5">{action.desc}</p>
                </div>
              </>
            );

            const className = "group flex flex-col items-center text-center gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all hover:-translate-y-0.5";

            if ("href" in action && action.href) {
              return (
                <Link key={action.label} href={action.href} className={className}>
                  {content}
                </Link>
              );
            }

            if ("onClick" in action && action.onClick) {
              return (
                <button key={action.label} onClick={action.onClick} className={className}>
                  {content}
                </button>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Bottom two-col grid: Events + Giving */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">

        {/* Upcoming Events */}
        <div className="rounded-2xl bg-zinc-900/60 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Upcoming Events</h2>
            <Link href="/portals/member/events" className="text-[9px] font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                  <span className="text-[8px] font-black text-zinc-500 uppercase">{event.date.split(",")[0]}</span>
                  <span className="text-sm font-black text-white leading-none">{event.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{event.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{event.time} · {event.location}</p>
                </div>
                <span className="shrink-0 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Giving */}
        <div className="rounded-2xl bg-zinc-900/60 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Recent Giving</h2>
            <Link href="/portals/member/giving" className="text-[9px] font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentGiving.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                    <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white">{item.type}</p>
                  <p className="text-[10px] text-zinc-500">{item.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-white">{item.amount}</p>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${item.status === "Confirmed" ? "text-emerald-400" : "text-amber-400"
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Total */}
          <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Year Total</span>
            <span className="text-sm font-black text-amber-400">KSh 45,200</span>
          </div>
        </div>
      </div>

      {/* Attendance Progress */}
      <div className="rounded-2xl bg-zinc-900/60 border border-white/5 p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Attendance This Year</h2>
            <p className="text-[10px] text-zinc-500 mt-0.5">Jan – May 2026</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-white">38 <span className="text-zinc-600 text-sm font-bold">/ 52</span></p>
            <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">73% Attendance Rate</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
            style={{ width: "73%" }}
          />
        </div>
        {/* Month breakdown */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {[
            { month: "Jan", attended: 4, total: 4 },
            { month: "Feb", attended: 3, total: 4 },
            { month: "Mar", attended: 5, total: 5 },
            { month: "Apr", attended: 4, total: 4 },
            { month: "May", attended: 2, total: 3 },
          ].map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1 items-center">
                {Array.from({ length: m.total }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-1.5 rounded-full transition-all ${i < m.attended ? "bg-amber-500" : "bg-zinc-800"
                      }`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-bold text-zinc-600 uppercase">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-4" />
    </div>
  );
}
