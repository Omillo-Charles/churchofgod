"use client";

import React, { useState } from "react";
import Modal from "./modal";
import { toast } from "sonner";
import api from "@/lib/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    fee?: string;
  } | null;
}

export default function RetryPaymentModal({ isOpen, onClose, event }: Props) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!event) return null;

  const handleRetry = async () => {
    if (!phone || !/^(?:\+254|0)[17]\d{8}$/.test(phone)) {
      return toast.error("Please enter a valid Kenyan phone number.");
    }

    setLoading(true);
    try {
      const res = await api.post("/payments/retry", {
        eventId: event.id,
        phone,
      });

      if (res.data.success) {
        toast.success("M-Pesa prompt sent! Check your phone to complete the payment.");
        onClose();
        setPhone("");
      } else {
        toast.error(res.data.message || "Failed to retry payment.");
      }
    } catch (error: any) {
      console.error("Retry payment error:", error);
      toast.error(
        error.response?.data?.message || 
        "Something went wrong. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Retry Payment"
      subtitle={event.title}
      maxWidth="max-w-[400px]"
    >
      <div className="space-y-6">
        <p className="text-[10px] text-zinc-400 leading-relaxed text-center">
          Enter the M-Pesa phone number you wish to use to complete your pending event registration payment.
        </p>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest px-1">M-Pesa Phone Number</label>
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="0712..."
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-4 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleRetry}
            disabled={loading}
            className="flex-1 py-4 rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
            {loading ? "Processing..." : "Send STK Push"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
