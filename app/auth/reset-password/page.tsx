"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", { token, newPassword: password });
      toast.success(res.data.message || "Password reset successful!");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-3">
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg">
            <Image src="/ntcogkLogo.jpeg" alt="Logo" fill className="object-cover" />
          </div>
          <span className="text-lg font-black text-white uppercase tracking-tight">NTCOGK</span>
        </div>

        <h1 className="text-2xl font-black text-white uppercase tracking-tight">
          Reset Password
        </h1>
        <p className="text-zinc-500 text-xs md:text-sm">
          {submitted
            ? "Your password has been successfully reset."
            : "Enter your new password below."}
        </p>
      </div>

      {!submitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      ) : (
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-6 text-center">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-zinc-300 font-medium">Success!</p>
            <p className="text-xs text-zinc-500">Your password has been updated. You can now sign in with your new credentials.</p>
          </div>
          <Link
            href="/auth"
            className="block w-full py-3 bg-zinc-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-zinc-700 transition-colors"
          >
            Sign In Now
          </Link>
        </div>
      )}

      <div className="text-center">
        <Link href="/" className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-[0.3em] transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center p-12 overflow-hidden">
        <Image
          src="/heroImages/hero1.png"
          alt="Church Atmosphere"
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="w-8 h-8 relative rounded-lg overflow-hidden">
              <Image src="/ntcogkLogo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white uppercase">NTCOGK Portal</span>
          </div>

          <h2 className="text-4xl font-black text-white leading-tight uppercase tracking-tight">
            Reset <br />
            <span className="text-amber-500">Your Password.</span>
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            Secure your account with a new password. Make sure it's something strong and unique.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-zinc-950">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
