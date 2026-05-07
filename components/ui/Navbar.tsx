"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { searchIndex, SearchResult } from "@/lib/searchData";

const iconMap = {
  page: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
  ),
  ministry: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  education: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  store: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  person: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
  ),
  contact: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when navigating
  useEffect(() => {
    setIsDropdownOpen(false);
    setQuery("");
    setIsSearchOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setFocusedIndex(-1);
    if (value.trim().length < 2) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }
    const q = value.toLowerCase();
    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
    setIsDropdownOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusedIndex >= 0 && results[focusedIndex]) {
          router.push(results[focusedIndex].href);
          setIsDropdownOpen(false);
          setQuery("");
        }
      } else if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    },
    [isDropdownOpen, results, focusedIndex, router]
  );

  const navigateTo = useCallback((href: string) => {
    setIsDropdownOpen(false);
    setQuery("");
    setIsSearchOpen(false);
    router.push(href);
  }, [router]);

  const renderDropdownResults = () => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
      {results.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">No results for &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="py-2">
          {results.map((result, idx) => (
            <button
              key={result.href + result.title + idx}
              onMouseDown={(e) => { e.preventDefault(); navigateTo(result.href); }}
              className={`w-full flex items-center gap-4 px-4 py-3 transition-colors group text-left ${
                focusedIndex === idx ? "bg-zinc-800" : "hover:bg-zinc-900"
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all">
                {iconMap[result.icon]}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate">{result.title}</p>
                <p className="text-[10px] text-zinc-500 truncate">{result.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {result.tag && (
                  <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-zinc-800 text-amber-500 border border-zinc-700">{result.tag}</span>
                )}
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{result.category}</span>
              </div>
            </button>
          ))}
          <div className="px-4 py-2 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">{results.length} result{results.length !== 1 ? "s" : ""}</p>
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">↑↓ navigate · Enter select · Esc close</p>
          </div>
        </div>
      )}
    </div>
  );

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "About",
      href: "/about",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    {
      name: "Give",
      href: "/give",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    {
      name: "Contact",
      href: "/contact",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-zinc-800"
          : "bg-black/50 backdrop-blur-sm border-b border-zinc-900"
      }`}
    >
      {/* Top Row */}
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {/* Left Hamburger Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/ntcogkLogo.jpeg"
                alt="NTCOGK Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              NTCOGK
            </span>
          </Link>
        </div>

        {/* Center Section: Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <svg
                className="h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              ref={desktopInputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length >= 2 && setIsDropdownOpen(true)}
              className="block w-full pl-10 pr-8 py-2 border border-zinc-800 rounded-full bg-zinc-900/50 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all"
              placeholder="Search pages, ministries..."
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setIsDropdownOpen(false); desktopInputRef.current?.focus(); }}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
            {isDropdownOpen && renderDropdownResults()}
          </div>
        </div>

        {/* Right Section: Mobile Search Toggle, Links (Desktop), Auth */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-all rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-all ${
                    isActive 
                      ? "text-amber-500" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Icon */}
          <Link
            href="/auth"
            className="p-2 text-zinc-400 hover:text-white transition-all hover:bg-zinc-800 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {isSearchOpen && (
        <div className="lg:hidden px-4 pb-3 animate-in slide-in-from-top-2 duration-200">
          <div className="relative w-full">
            <input
              ref={mobileInputRef}
              type="text"
              autoFocus
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="block w-full pl-4 pr-10 py-2.5 border border-zinc-800 rounded-xl bg-zinc-900 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/10"
              placeholder="Search pages, ministries..."
              autoComplete="off"
            />
            <button
              onClick={() => { setIsSearchOpen(false); setQuery(""); setIsDropdownOpen(false); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                {results.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">No results for &ldquo;{query}&rdquo;</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {results.map((result, idx) => (
                      <button
                        key={result.href + result.title + idx}
                        onMouseDown={(e) => { e.preventDefault(); navigateTo(result.href); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                          focusedIndex === idx ? "bg-zinc-800" : "hover:bg-zinc-900"
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 shrink-0">
                          {iconMap[result.icon]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{result.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{result.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Row: Mobile Links */}
      <div className="md:hidden border-t border-zinc-800/50 bg-inherit overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center gap-8 px-6 h-14 min-w-max">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex flex-col items-center gap-1.5 transition-all group ${
                    isActive ? "text-amber-500" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <div className={`${isActive ? "text-amber-500" : "text-zinc-400 group-hover:text-white"} transition-colors`}>
                    {link.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wide">
                    {link.name}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
};

export default Navbar;
