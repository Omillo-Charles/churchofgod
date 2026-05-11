"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberSermonModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Watch Latest Sermon"
      subtitle="Walking in Faith"
    >
      <div className="space-y-5">
        <div className="aspect-video w-full rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center text-white shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Sunday Service</p>
            <p className="text-xs font-bold text-white mt-1">Walking in Grace & Accountability</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Other Recent Messages</h4>
          <div className="space-y-2">
            {[
              { title: "The Power of Prayer", date: "27 Apr 2026" },
              { title: "Grace and Truth", date: "20 Apr 2026" },
            ].map((s, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group text-left">
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{s.title}</p>
                  <p className="text-[9px] text-zinc-600 mt-0.5">{s.date}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-amber-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <button
            className="w-full py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-zinc-400 hover:text-white hover:bg-white/[0.08] uppercase tracking-widest transition-all"
          >
            Explore Library
          </button>
        </div>
      </div>
    </Modal>
  );
}
