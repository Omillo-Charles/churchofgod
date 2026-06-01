"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

type Registration = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  gender: string;
  region: string;
  district: string;
  churchName: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
  event: {
    title: string;
    date: string;
    location: string;
  };
};

type Event = {
  id: string;
  title: string;
};

const sortOptions = [
  { label: "Recent", value: "" },
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    eventId: "",
    sortOrder: "",
    churchName: "",
    district: "",
    region: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/registrations", { params: filters });
      setRegistrations(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      eventId: "",
      sortOrder: "",
      churchName: "",
      district: "",
      region: "",
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Event Registrations</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Manage and view all event attendees</p>
        </div>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Clear All Filters
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
        <div className="min-w-[240px] md:min-w-0 space-y-1.5">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Filter by Event</label>
          <select
            value={filters.eventId}
            onChange={(e) => handleFilterChange("eventId", e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-sky-500/50 transition-colors appearance-none"
          >
            <option value="">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[240px] md:min-w-0 space-y-1.5">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Church Name</label>
          <input
            type="text"
            placeholder="Search by church..."
            value={filters.churchName}
            onChange={(e) => handleFilterChange("churchName", e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-sky-500/50 transition-colors"
          />
        </div>

        <div className="min-w-[240px] md:min-w-0 space-y-1.5">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">District</label>
          <input
            type="text"
            placeholder="Search by district..."
            value={filters.district}
            onChange={(e) => handleFilterChange("district", e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-sky-500/50 transition-colors"
          />
        </div>

        <div className="min-w-[240px] md:min-w-0 space-y-1.5">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Region</label>
          <input
            type="text"
            placeholder="Search by region..."
            value={filters.region}
            onChange={(e) => handleFilterChange("region", e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-sky-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Sort Section */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Sort Order</label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange("sortOrder", option.value)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all border shrink-0 uppercase tracking-widest ${filters.sortOrder === option.value
                  ? "bg-sky-500 text-black border-sky-500"
                  : "bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-zinc-700"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900">
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Church</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">District/Region</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Payment</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Loading registrations...</span>
                    </div>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-white">No registrations found</p>
                      <p className="text-xs text-zinc-500">Try adjusting your filters or clearing them all.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{reg.fullName}</span>
                        <span className="text-[10px] text-zinc-500">{reg.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-zinc-400">{reg.event?.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-zinc-400">{reg.churchName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-400">{reg.district}</span>
                        <span className="text-[10px] text-zinc-500">{reg.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        reg.paymentStatus === "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : reg.paymentStatus === "PENDING"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}>
                        {reg.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        reg.status === "CONFIRMED"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : reg.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-zinc-400">
                          {new Date(reg.createdAt).toLocaleDateString("en-KE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(reg.createdAt).toLocaleTimeString("en-KE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
