"use client";

import React, { useState } from "react";
import Link from "next/link";

// Clergy Modals
import ClergyActionModal from "@/components/modals/ClergyActionModal";

const stats = [
  {
    label: "Total Members",
    value: "1,284",
    change: "+18",
    period: "This month",
    color: "sky",
    href: "/portals/clergy/members",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Monthly Giving",
    value: "KSh 284K",
    change: "+9%",
    period: "vs last month",
    color: "emerald",
    href: "/portals/clergy/finance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: "Avg. Attendance",
    value: "847",
    change: "+5%",
    period: "This quarter",
    color: "amber",
    href: "/portals/clergy/attendance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: "Prayer Requests",
    value: "7",
    change: "Pending",
    period: "Needs response",
    color: "violet",
    href: "/portals/clergy/prayer",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
      </svg>
    ),
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  sky:     { bg: "bg-sky-500/10",     text: "text-sky-400",     ring: "ring-sky-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20" },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-400",   ring: "ring-amber-500/20" },
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-400",  ring: "ring-violet-500/20" },
};

const prayerRequests = [
  { name: "Mary Wanjiku",    request: "Healing from illness",          time: "2h ago",   urgent: true  },
  { name: "James Ochieng",  request: "Prayer for employment",          time: "5h ago",   urgent: false },
  { name: "Grace Akinyi",   request: "Family reconciliation",          time: "1d ago",   urgent: false },
  { name: "Peter Kamau",    request: "Upcoming surgery — Thu 15 May",  time: "1d ago",   urgent: true  },
  { name: "Faith Njeri",    request: "Guidance on life decisions",     time: "2d ago",   urgent: false },
];

const upcomingEvents = [
  { title: "Sunday Worship Service",         date: "Sun 11 May", time: "9:00 AM", type: "Worship"   },
  { title: "Leadership Team Meeting",        date: "Mon 12 May", time: "10:00 AM", type: "Admin"    },
  { title: "Youth Friday Fellowship",        date: "Fri 16 May", time: "6:00 PM", type: "Ministry"  },
  { title: "Discipleship College — Sess 4", date: "Sat 17 May", time: "8:00 AM", type: "Education" },
];

const recentSermons = [
  { title: "Walking in Faith",          date: "04 May 2026", views: 312, status: "Published" },
  { title: "The Power of Prayer",       date: "27 Apr 2026", views: 289, status: "Published" },
  { title: "Grace and Accountability",  date: "20 Apr 2026", views: 251, status: "Published" },
  { title: "Pentecost Sunday Message",  date: "Draft",       views: 0,   status: "Draft"     },
];

const typeColors: Record<string, string> = {
  Worship:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Admin:     "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  Ministry:  "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Education: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function ClergyDashboardPage() {
  const [activeModal, setActiveModal] = useState<"announcement" | "event" | "finance" | "sermon" | null>(null);

  const quickActions = [
    { 
      label: "Add Announcement", 
      onClick: () => setActiveModal("announcement"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg> 
    },
    { 
      label: "Upload Sermon", 
      onClick: () => setActiveModal("sermon"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg> 
    },
    { 
      label: "Create Event", 
      onClick: () => setActiveModal("event"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="12" x2="12" y1="14" y2="18"/><line x1="10" x2="14" y1="16" y2="16"/></svg> 
    },
    { 
      label: "Finance Report", 
      onClick: () => setActiveModal("finance"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> 
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      
      {/* Consolidated Action Modal */}
      {activeModal && (
        <ClergyActionModal 
          isOpen={!!activeModal} 
          onClose={() => setActiveModal(null)} 
          type={activeModal} 
        />
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#060a10] border border-sky-500/10 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sky-400 fill-current">
            <path d="M100 10 L100 190 M10 100 L190 100 M29 29 L171 171 M171 29 L29 171" stroke="currentColor" strokeWidth="1" fill="none"/>
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest">Clergy Access — Senior Pastor</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Good afternoon,{" "}
              <span className="text-sky-400">Pastor Mwangi 🙏</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              You have <span className="text-white font-bold">7 pending prayer requests</span> and{" "}
              <span className="text-white font-bold">2 announcements</span> awaiting review.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-white">PM</span>
            </div>
            <div>
              <p className="text-xs font-black text-white">Pastor Mwangi</p>
              <p className="text-[9px] text-zinc-500">Karen Chapel · Senior Pastor</p>
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
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 p-5 hover:border-white/10 transition-all hover:-translate-y-0.5"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center mb-4 ${c.text} group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
              <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{stat.label}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-bold ${c.text}`}>{stat.change}</span>
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
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="group flex flex-col items-center text-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/20 transition-all duration-200">
                {action.icon}
              </div>
              <p className="text-xs font-bold text-white">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Middle Row: Prayer Requests + Upcoming Events */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">

        {/* Prayer Requests Queue */}
        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Prayer Requests</h2>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 text-white text-[9px] font-black">7</span>
            </div>
            <Link href="/portals/clergy/prayer" className="text-[9px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {prayerRequests.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center shrink-0 text-[10px] font-black text-zinc-300">
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    {item.urgent && (
                      <span className="shrink-0 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{item.request}</p>
                </div>
                <span className="text-[9px] text-zinc-600 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Upcoming Events</h2>
            <Link href="/portals/clergy/events" className="text-[9px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center group-hover:bg-sky-500/10 group-hover:border-sky-500/20 transition-all">
                  <span className="text-[8px] font-black text-zinc-500 uppercase leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-sm font-black text-white leading-tight">{event.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{event.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{event.time}</p>
                </div>
                <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${typeColors[event.type]}`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sermons */}
      <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="text-xs font-black text-white uppercase tracking-widest">Recent Sermons</h2>
          <Link href="/portals/clergy/sermons" className="text-[9px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">
            Manage →
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {recentSermons.map((sermon, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{sermon.title}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{sermon.date}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {sermon.views > 0 && (
                  <div className="hidden sm:flex items-center gap-1.5 text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span className="text-[10px] font-bold">{sermon.views}</span>
                  </div>
                )}
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${
                  sermon.status === "Published"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {sermon.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Giving Breakdown */}
      <div className="rounded-2xl bg-zinc-900/40 border border-white/5 p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Giving Overview — May 2026</h2>
            <p className="text-[10px] text-zinc-500 mt-0.5">Congregation stewardship breakdown</p>
          </div>
          <Link href="/portals/clergy/finance" className="text-[9px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">
            Full Report →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Tithes",    value: "KSh 184,000", pct: 65 },
            { label: "Offerings", value: "KSh 62,000",  pct: 22 },
            { label: "Pledges",   value: "KSh 28,000",  pct: 10 },
            { label: "Missions",  value: "KSh 10,000",  pct: 3  },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
                <span className="text-[10px] font-black text-zinc-400">{item.pct}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <p className="text-sm font-black text-white">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Collected</span>
          <div className="text-right">
            <span className="text-lg font-black text-sky-400">KSh 284,000</span>
            <span className="text-[10px] font-bold text-emerald-400 ml-3">↑ 9% vs April</span>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
