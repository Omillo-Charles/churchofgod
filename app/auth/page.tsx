"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden">
      {/* Visual Side (Hidden on Mobile) */}
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
            Connect with <br />
            <span className="text-amber-500">Your Church Family.</span>
          </h2>
          
          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            Access sermons, manage your giving, connect with ministries, and stay updated with the latest community events.
          </p>
          
          <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-black text-white">15K+</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Members</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">224</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Local Churches</p>
            </div>
          </div>
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
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm">
              {mode === "login" 
                ? "Enter your credentials to access your portal." 
                : "Join the NTCOGK digital community today."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex p-1 bg-zinc-900 rounded-2xl">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                  mode === "login" 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                  mode === "signup" 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
                  {mode === "login" && (
                    <Link href="#" className="text-[10px] font-bold text-amber-500 hover:text-amber-600 uppercase tracking-widest">Forgot?</Link>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 mt-4">
                {mode === "login" ? "Sign In to Portal" : "Create Account"}
              </button>
            </form>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-zinc-800" />
              <span className="relative px-4 bg-zinc-950 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 px-6 py-3 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors group">
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-3 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-colors group">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Github</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-[0.3em] transition-colors">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
