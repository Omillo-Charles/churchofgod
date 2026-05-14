"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

interface ClergyNavbarProps {
  onMobileMenuToggle: () => void;
}

const ClergyNavbar: React.FC<ClergyNavbarProps> = ({ onMobileMenuToggle }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const el = document.getElementById("clergy-main");
    if (!el) return;
    const handleScroll = () => setIsScrolled(el.scrollTop > 10);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (!last || last === "clergy") return "Dashboard";
    return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
  };

  return (
    <header
      className={`sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 h-16 transition-all duration-200
        ${isScrolled
          ? "bg-[#060a10]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-white/5"
        }`}
    >
      {/* Mobile hamburger */}
      <button
        id="clergy-menu-toggle"
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        aria-label="Open menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-sm font-black text-white uppercase tracking-widest">{getPageTitle()}</h1>
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest hidden sm:block">
          Clergy Portal
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-[#060a10]" />
        </button>

        {/* Switch to Member Portal */}
        <Link
          href="/portals/member"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>
          </svg>
          Member View
        </Link>

        {/* Return to site */}
        <Link
          href="/"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-[10px] font-bold text-sky-400 hover:bg-sky-500/20 transition-all uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Main Site
        </Link>

        {/* Avatar */}
        <div className="pl-2">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-sky-500/50 transition-all">
            <span className="text-[10px] font-black text-white">
              {user?.fullName ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "C"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClergyNavbar;
