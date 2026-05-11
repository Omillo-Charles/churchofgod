"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SermonModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Sermon"
      subtitle="Share word with others"
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
            Sermon Title
          </label>
          <input
            type="text"
            placeholder="e.g. Walking in Grace"
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
              Speaker
            </label>
            <input
              type="text"
              placeholder="Pastor Name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
            />
          </div>
        </div>
        <div className="group relative cursor-pointer">
          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.03] transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-zinc-400 group-hover:text-sky-400/90 uppercase tracking-widest">Upload Sermon Media</p>
              <p className="text-[9px] text-zinc-600 mt-1">MP3, WAV or MP4 (Max 50MB)</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors px-2"
          >
            Discard
          </button>
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-[10px] font-black text-white uppercase tracking-[0.15em] transition-all active:scale-[0.97] shadow-xl shadow-sky-500/20"
          >
            Save Sermon
          </button>
        </div>
      </div>
    </Modal>
  );
}
