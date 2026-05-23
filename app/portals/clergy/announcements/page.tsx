"use client";

import React from "react";
import Link from "next/link";

export default function AnnouncementsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-700">
        {/* Empty State Icon */}
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-zinc-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">No Announcements</h2>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            There are currently no active announcements for the clergy portal. Check back later for updates or special notices.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/portals/clergy"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
