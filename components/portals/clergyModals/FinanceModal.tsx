"use client";

import React from "react";
import Modal from "@/components/modals/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinanceModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Finance Report"
      subtitle="Stewardship breakdown"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
              Report Type
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
                <option>Monthly Summary</option>
                <option>Tithes & Offerings</option>
                <option>Expenditure</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
              Period
            </label>
            <input
              type="month"
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-400 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all [color-scheme:dark]"
            />
          </div>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center">Export Format</p>
          <div className="flex gap-2">
            {["PDF", "CSV", "Excel"].map((fmt) => (
              <button
                key={fmt}
                type="button"
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-zinc-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/30 transition-all duration-300"
              >
                {fmt}
              </button>
            ))}
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
            Generate Report
          </button>
        </div>
      </div>
    </Modal>
  );
}
