"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Announcement"
      subtitle="Publish to members"
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
            Announcement Title
          </label>
          <input
            type="text"
            placeholder="e.g. Special Sunday Service"
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
            Message Content
          </label>
          <textarea
            rows={4}
            placeholder="Write your announcement message here..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none"
          />
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
            Publish Announcement
          </button>
        </div>
      </div>
    </Modal>
  );
}
