"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberEventModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upcoming Events"
      subtitle="Join our community"
    >
      <div className="space-y-5">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-1 rounded-lg bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest">Next Up</span>
            <span className="text-[10px] font-bold text-amber-500">Sun, 11 May</span>
          </div>
          <h4 className="text-sm font-black text-white leading-tight">Sunday Morning Worship & Communion Service</h4>
          <p className="text-[10px] text-zinc-400 mt-2">Main Sanctuary · 9:00 AM</p>
          <button className="w-full mt-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[10px] font-black text-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20">
            Set Reminder
          </button>
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Calendar Preview</h4>
          <div className="space-y-2">
            {[
              { title: "Youth Fellowship Night", date: "Fri, 16 May", time: "6:00 PM" },
              { title: "Leadership Workshop", date: "Sat, 17 May", time: "8:00 AM" },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-[8px] font-black text-zinc-500 uppercase leading-none">{e.date.split(",")[0]}</span>
                  <span className="text-sm font-black text-white leading-none mt-0.5">{e.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{e.title}</p>
                  <p className="text-[9px] text-zinc-600 mt-0.5">{e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <button
            className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-zinc-400 hover:text-white hover:bg-white/[0.08] uppercase tracking-widest transition-all"
          >
            Full Calendar
          </button>
        </div>
      </div>
    </Modal>
  );
}
