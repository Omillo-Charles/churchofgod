"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/lib/axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Recovery link sent!");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send recovery link.");
    } finally {
      setLoading(false);
    }
  };

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
            Recover <br />
            <span className="text-amber-500">Your Account.</span>
          </h2>
          
          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            Don't worry, it happens to the best of us. Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-zinc-950">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg">
                <Image src="/ntcogkLogo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight">NTCOGK</span>
            </div>
            
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Forgot Password
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm">
              {submitted 
                ? "Check your email for the recovery link." 
                : "Enter your registered email address."}
            </p>
          </div>

          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Recovery Link"}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-4 text-center">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-300">
                If an account exists for <span className="text-white font-bold">{email}</span>, you will receive a password reset link shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400"
              >
                Resend link?
              </button>
            </div>
          )}

          <div className="text-center space-y-4">
            <Link href="/auth" className="block text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">
              Back to Sign In
            </Link>
            <div className="pt-4 border-t border-zinc-900">
              <Link href="/" className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-[0.3em] transition-colors">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
