"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventRegistrationModal from "@/components/modals/EventRegistrationModal";
import { useAuth } from "@/lib/useAuth";
import { toast } from "sonner";
import api from "@/lib/axios";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState<"listing" | "calendar">("listing");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    setCurrentDate(new Date());
  }, []);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        if (res.data.success) {
          const parsed = res.data.data.map((e: any) => ({
            ...e,
            date: new Date(e.date),
            endDate: e.endDate ? new Date(e.endDate) : null,
            fee: e.fee && parseFloat(e.fee) > 0 ? `KES ${parseFloat(e.fee).toLocaleString()}` : "Free",
            desc: e.description || "No description provided.",
            image: e.imageUrl || "/youthexplosionszn3.jpeg",
          }));
          setEvents(parsed);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Calendar Logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    // Padding for previous month days
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, month, year });
    }
    // Current month days
    for (let i = 1; i <= daysCount; i++) {
      days.push({ day: i, month, year });
    }
    return days;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    return events.filter(
      (e) => 
        e.date.getDate() === day && 
        e.date.getMonth() === currentDate.getMonth() && 
        e.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const selectedEvents = useMemo(() => getEventsForDay(selectedDate), [selectedDate, currentDate, events]);

  if (!hasMounted) return null;

  return (
    <div className="bg-black min-h-screen">
      {/* Registration Modal */}
      <EventRegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        event={selectedEvent} 
      />

      {/* 1. Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/youthImages/youth13.jpg"
          alt="Church Events"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Community & Growth
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Church Events
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Stay connected with our community gatherings, spiritual sessions, and ministry fellowships. Join us as we grow together in faith.
          </p>
        </div>
      </section>

      {/* 2. Tab Navigation */}
      <section className="sticky top-16 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("listing")}
                className={`py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === "listing" ? "text-amber-500" : "text-zinc-400 hover:text-white"
                }`}
              >
                List View
                {activeTab === "listing" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === "calendar" ? "text-amber-500" : "text-zinc-400 hover:text-white"
                }`}
              >
                Calendar View
                {activeTab === "calendar" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Content Section */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] animate-pulse">Loading Events...</p>
            </div>
          ) : activeTab === "listing" ? (
            /* Listing View */
            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                {events.length > 0 ? (
                  events.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event) => (
                    <div key={event.id} className="group grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                      {/* Original Image Container */}
                      <div className="lg:col-span-3 relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-500 hover:border-amber-500/20">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-auto block object-contain"
                        />
                      </div>

                      {/* Clean Details */}
                      <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">
                              {event.date.toLocaleString("default", { month: "long" })} {event.date.getDate()}
                            </span>
                          </div>
                          
                          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                            {event.title}
                          </h2>
                          
                          <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                            {event.desc}
                          </p>
                        </div>

                        {/* Minimal Metadata */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-xs font-bold text-zinc-300">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-bold text-amber-500">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            Registration: {event.fee}
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              if (!user) {
                                toast.error("Please login to register for events.");
                                return router.push("/auth");
                              }
                              setSelectedEvent(event);
                              setIsRegisterOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-300 group/btn shadow-xl shadow-white/5"
                          >
                            Details & Registration
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center space-y-6 bg-zinc-900/30 rounded-[3rem] border border-dashed border-zinc-800">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest">No Upcoming Events</h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Check back later or subscribe to our newsletter for updates</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Calendar View */
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="bg-zinc-900 rounded-[3rem] border border-zinc-800 shadow-sm overflow-hidden">
                {/* Calendar Header */}
                <div className="p-8 md:p-12 border-b border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col items-center md:items-start space-y-1">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                      {monthName} <span className="text-amber-500">{year}</span>
                    </h2>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">View our monthly schedule</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-3 rounded-2xl bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentDate(new Date());
                        setSelectedDate(new Date().getDate());
                      }}
                      className="px-6 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                    >
                      Today
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-3 rounded-2xl bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-white transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="p-4 md:p-8">
                  {/* Days Row */}
                  <div className="grid grid-cols-7 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2 md:gap-4">
                    {calendarDays.map((dateObj, index) => {
                      const dayEvents = getEventsForDay(dateObj.day);
                      const isToday = 
                        dateObj.day === new Date().getDate() && 
                        dateObj.month === new Date().getMonth() && 
                        dateObj.year === new Date().getFullYear();
                      
                      const isSelected = selectedDate === dateObj.day;

                      return (
                        <div
                          key={index}
                          onClick={() => dateObj.day && setSelectedDate(dateObj.day)}
                          className={`min-h-[80px] md:min-h-[120px] p-2 md:p-4 rounded-3xl border transition-all relative ${
                            dateObj.day 
                              ? isSelected
                                ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 z-10 scale-105"
                                : isToday
                                  ? "bg-zinc-900 border-amber-500 ring-2 ring-amber-500/20 shadow-sm"
                                  : "bg-zinc-800/30 border-zinc-800 hover:border-amber-500/20 group cursor-pointer"
                              : "border-transparent"
                          }`}
                        >
                          {dateObj.day && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                <span className={`text-xs md:text-sm font-black ${isSelected ? "text-white" : isToday ? "text-amber-500" : "text-zinc-400 group-hover:text-amber-500 transition-colors"}`}>
                                  {dateObj.day}
                                </span>
                                {isToday && !isSelected && (
                                  <span className="text-[7px] font-black uppercase text-amber-500 tracking-tighter bg-amber-500/10 px-1.5 py-0.5 rounded-md">Today</span>
                                )}
                              </div>
                              
                              <div className="space-y-1">
                                {dayEvents.map((event) => (
                                  <div
                                    key={event.id}
                                    className={`p-1.5 rounded-lg border md:block hidden overflow-hidden ${isSelected ? "bg-white/20 border-white/20" : "bg-zinc-800 border-zinc-700"}`}
                                  >
                                    <p className={`text-[8px] font-bold uppercase truncate ${isSelected ? "text-white" : "text-white"}`}>{event.title}</p>
                                  </div>
                                ))}
                                {dayEvents.length > 0 && (
                                  <div className={`md:hidden w-2 h-2 rounded-full mx-auto ${isSelected ? "bg-white" : "bg-zinc-500"} shadow-sm`} />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Day Events (Mobile Focused) */}
              {selectedDate && (
                <div className="md:hidden space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-black text-sm">
                      {selectedDate}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Events for</p>
                      <h4 className="text-sm font-bold text-white uppercase">{monthName} {selectedDate}, {year}</h4>
                    </div>
                  </div>

                  {selectedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {selectedEvents.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => {
                            if (!user) {
                              toast.error("Please login to register for events.");
                              return router.push("/auth");
                            }
                            setSelectedEvent(event);
                            setIsRegisterOpen(true);
                          }}
                          className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center gap-4 hover:border-amber-500/20 hover:bg-zinc-800 transition-all text-left w-full group"
                        >
                          <div className="flex-1">
                            <h5 className="text-xs font-black text-white uppercase group-hover:text-amber-500 transition-colors">{event.title}</h5>
                            <p className="text-[10px] text-zinc-400 font-medium">{event.location}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-amber-500 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800 text-center">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">No events scheduled for this day</p>
                    </div>
                  )}
                </div>
              )}

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="w-3 h-3 rounded-md border-2 border-amber-500" />
                  Today
                </div>
                <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="w-3 h-3 rounded-md bg-amber-500 shadow-sm shadow-amber-500/20" />
                  Selected
                </div>
                <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  <div className="w-3 h-3 rounded-md bg-zinc-600" />
                  Has Events
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. Newsletter/Updates Section */}
      <section className="py-20 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="m22 9-10 7L2 9"/></svg>
        </div>
        <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Stay Updated</h3>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Never Miss an <span className="text-amber-500">Event</span></h2>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
              Join our community mailing list to receive weekly updates on church services, special gatherings, and community events directly in your inbox.
            </p>
          </div>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <button className="px-8 py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
