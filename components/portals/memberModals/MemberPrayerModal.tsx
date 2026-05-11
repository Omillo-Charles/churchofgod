"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberPrayerModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prayer Request"
      subtitle="We are here to pray with you"
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
            Subject
          </label>
          <input
            type="text"
            placeholder="e.g. Family, Healing, Career"
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
            Request Details
          </label>
          <textarea
            rows={4}
            placeholder="Share your request with the clergy..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all resize-none"
          />
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer" />
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mark as urgent</p>
        </div>
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors px-2"
          >
            Discard
          </button>
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[10px] font-black text-white uppercase tracking-[0.15em] transition-all active:scale-[0.97] shadow-xl shadow-amber-500/20"
          >
            Submit Request
          </button>
        </div>
      </div>
    </Modal>
  );
}
