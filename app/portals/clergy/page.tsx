"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

// Clergy Modals
import ClergyActionModal from "@/components/modals/ClergyActionModal";
import CreateEventModal from "@/components/modals/CreateEventModal";

const stats = [
  {
    label: "Churches",
    value: "224",
    change: "+12",
    period: "New local plants",
    color: "sky",
    href: "/about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11"/><path d="m12 8-5.4-5.4A1 1 0 0 0 5.9 2H4a2 2 0 0 0-2 2v17"/><path d="M14 22V15a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7"/>
      </svg>
    ),
  },
  {
    label: "Bishops",
    value: "40",
    change: "Active",
    period: "Diocesan oversight",
    color: "emerald",
    href: "/about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Pastors",
    value: "224",
    change: "Ordained",
    period: "Serving congregations",
    color: "amber",
    href: "/about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    label: "Regions",
    value: "6",
    change: "National",
    period: "Administrative hubs",
    color: "violet",
    href: "/about",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", ring: "ring-sky-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20" },
};

const givingTypes = [
  {
    name: "Tithes",
    desc: "Support the ongoing ministry and local church operations.",
  },
  {
    name: "Offerings",
    desc: "Give cheerfully toward worship services and church needs.",
  },
  {
    name: "Missions",
    desc: "Partner with outreach and gospel work beyond the local assembly.",
  },
  {
    name: "Building Fund",
    desc: "Contribute to development, maintenance, and expansion projects.",
  },
];

const recentSermons = [
  { title: "Walking in Faith", date: "04 May 2026", views: 312, status: "Published" },
  { title: "The Power of Prayer", date: "27 Apr 2026", views: 289, status: "Published" },
  { title: "Grace and Accountability", date: "20 Apr 2026", views: 251, status: "Published" },
  { title: "Pentecost Sunday Message", date: "Draft", views: 0, status: "Draft" },
];

export default function ClergyDashboardPage() {
  const [activeModal, setActiveModal] = useState<"announcement" | "event" | "finance" | "sermon" | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        if (res.data.success) {
          setEvents(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatEventDate = (date: Date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return {
      weekday,
      day,
      month: `${month} ${year}`,
      full: `${weekday}, ${day} ${month} ${year}`
    };
  };

  const upcomingEvents = events
    .map((e) => ({ ...e, parsedDate: new Date(e.date) }))
    .filter((e) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return e.parsedDate >= today;
    })
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

  const quickActions = [
    {
      label: "Add Announcement",
      onClick: () => setActiveModal("announcement"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>
    },
    {
      label: "Upload Sermon",
      onClick: () => setActiveModal("sermon"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
    },
    {
      label: "Create Event",
      onClick: () => setActiveModal("event"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><line x1="12" x2="12" y1="14" y2="18" /><line x1="10" x2="14" y1="16" y2="16" /></svg>
    },
    {
      label: "Finance Report",
      onClick: () => setActiveModal("finance"),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">

      {/* Consolidated Action Modal */}
      {activeModal && activeModal !== "event" && (
        <ClergyActionModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}

      {activeModal === "event" && (
        <CreateEventModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#060a10] border border-sky-500/10 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sky-400 fill-current">
            <path d="M100 10 L100 190 M10 100 L190 100 M29 29 L171 171 M171 29 L29 171" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
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

      {/* Middle Row: Giving + Upcoming Events */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">

        {/* Giving & Stewardship */}
        <div className="rounded-2xl bg-zinc-900/60 border border-white/5 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Giving & Stewardship</h2>
              <Link href="/give" className="text-[9px] font-bold text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors">
                Give Now →
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {givingTypes.map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 flex flex-col gap-3">
            <p className="text-[9px] text-zinc-500 leading-normal uppercase tracking-wider text-center">
              Please visit the official Giving page to access the M-Pesa Paybill & Equity Bank transfer details.
            </p>
            <Link
              href="/give"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all duration-200"
            >
              Go to Giving Page
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
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
            {loading ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mx-auto" />
                <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest animate-pulse">Loading events...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.slice(0, 4).map((event) => {
                const dateInfo = formatEventDate(event.parsedDate);
                return (
                  <div key={event.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center group-hover:bg-sky-500/10 group-hover:border-sky-500/20 transition-all">
                      <span className="text-[8px] font-black text-zinc-500 uppercase">{dateInfo.weekday}</span>
                      <span className="text-sm font-black text-white leading-none">{dateInfo.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{event.title}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{event.location}</p>
                    </div>
                    <span className="shrink-0 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {event.category || "Ministry"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider">No Upcoming Events</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Check back later or create a new event</p>
              </div>
            )}
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
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="text-[10px] font-bold">{sermon.views}</span>
                  </div>
                )}
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${sermon.status === "Published"
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
            { label: "Tithes", value: "KSh 184,000", pct: 65 },
            { label: "Offerings", value: "KSh 62,000", pct: 22 },
            { label: "Pledges", value: "KSh 28,000", pct: 10 },
            { label: "Missions", value: "KSh 10,000", pct: 3 },
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
