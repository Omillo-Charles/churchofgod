"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/axios";

interface Author {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Announcement {
  id: string;
  title: string;
  body: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get("/announcements");
        if (res.data.success) {
          setAnnouncements(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/aboutImages/about2.png"
          alt="Announcements"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Stay Updated
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Announcements
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Latest official communications, updates, and news from the New Testament Church of God Kenya.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] animate-pulse">
                Loading Announcements...
              </p>
            </div>
          ) : announcements.length > 0 ? (
            <div className="space-y-8">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-6 md:p-8 bg-zinc-900 rounded-3xl border border-zinc-800 space-y-4 transition-all hover:border-amber-500/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      {announcement.title}
                    </h2>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      {formatDate(announcement.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
                    {announcement.body}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <span>By: {announcement.author.fullName}</span>
                    <span className="text-amber-500">{announcement.author.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6 bg-zinc-900/30 rounded-[3rem] border border-dashed border-zinc-800">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11l19-9-9 19-2-8-8-2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  No Announcements
                </h4>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  There are currently no active announcements. Please check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnnouncementsPage;
