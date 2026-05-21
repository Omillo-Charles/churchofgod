"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isPollingPayment, setIsPollingPayment] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    if (!isPollingPayment) {
      onClose();
    } else {
      toast.warning("Please wait for payment verification to complete.");
    }
  };

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
        const { registrationId } = res.data;
        toast.success("M-Pesa prompt sent! Check your phone to complete the payment.");
        setIsPollingPayment(true);

        let attempts = 0;
        const maxAttempts = 24; // 60 seconds total polling

        pollIntervalRef.current = setInterval(async () => {
          attempts++;
          try {
            const statusRes = await api.get(`/payments/status/${registrationId}`);
            if (statusRes.data.success) {
              const { paymentStatus } = statusRes.data.data;
              if (paymentStatus === "COMPLETED") {
                if (pollIntervalRef.current) {
                  clearInterval(pollIntervalRef.current);
                  pollIntervalRef.current = null;
                }
                setIsPollingPayment(false);
                toast.success("Payment successful! Event registration confirmed. See you at the event.");
                onClose();
                setPhone("");
              } else if (paymentStatus === "FAILED") {
                if (pollIntervalRef.current) {
                  clearInterval(pollIntervalRef.current);
                  pollIntervalRef.current = null;
                }
                setIsPollingPayment(false);
                toast.error("Payment not successful (cancelled, wrong PIN, or timeout). Please retry.");
              }
            }
          } catch (pollErr) {
            console.error("Error polling payment status:", pollErr);
          }

          if (attempts >= maxAttempts) {
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
            setIsPollingPayment(false);
            toast.error("Payment verification timed out. If you already completed the payment, your status will update shortly. Otherwise, please try again.");
          }
        }, 2500);

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
      onClose={handleClose}
      title="Retry Payment"
      subtitle={event.title}
      maxWidth="max-w-[400px]"
    >
      <div className="space-y-6">
        {isPollingPayment ? (
          <div className="space-y-6 flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <p className="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] animate-pulse">Waiting for payment...</p>
              <p className="text-xs text-zinc-400 max-w-[280px] leading-relaxed mx-auto">
                Please enter your M-Pesa PIN on the prompt sent to your phone to complete your registration.
              </p>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
          <button
            onClick={handleClose}
            disabled={isPollingPayment}
            className="text-[10px] font-black text-zinc-500 hover:text-zinc-300 uppercase tracking-widest px-4 transition-colors disabled:opacity-30"
          >
            Cancel
          </button>

          <button
            onClick={handleRetry}
            disabled={loading || isPollingPayment}
            className="flex-1 py-4 rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
          >
            {isPollingPayment
              ? "Verifying..."
              : loading
                ? "Processing..."
                : "Send STK Push"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
