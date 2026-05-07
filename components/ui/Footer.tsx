"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Give", href: "/give" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Ministries",
      links: [
        { name: "Youth Ministry", href: "/ministries/youth" },
        { name: "Children's Ministry", href: "/ministries/children" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Member Portal", href: "/portals/member" },
        { name: "Clergy Portal", href: "/portals/clergy" },
        { name: "Discipleship College", href: "/college" },
        { name: "Church Store", href: "/store" },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/ntcogkLogo.jpeg"
                  alt="NTCOGK Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                  NTCOGK
                </span>
                <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 mt-1">
                  New Testament Church Of God
                </span>
              </div>
            </Link>
            
            <div className="max-w-sm">
              <h4 className="text-xs md:text-sm font-bold text-zinc-100 mb-3">
                Stay Connected
              </h4>
              <p className="text-[10px] md:text-sm text-zinc-400 mb-4 leading-relaxed font-medium">
                Join our newsletter to receive the latest sermons, event updates, and spiritual resources directly in your inbox.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-xl text-[10px] md:text-sm border border-zinc-800 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                />
                <button className="px-5 py-2.5 bg-white text-black rounded-xl text-[10px] md:text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-xs font-bold text-zinc-500">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[11px] md:text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Socials Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] md:text-xs font-bold text-zinc-500">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+254 759 120 222</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info@ntcogk.org</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Karen, Nairobi</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768" />
              </svg>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[9px] md:text-xs">
            <p className="font-bold">© {currentYear} NTCOGK Kenya. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5 font-bold text-zinc-400">
              Built & Maintained by{" "}
              <a
                href="https://omytech.co.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-black hover:underline transition-all"
              >
                OMYT3CH
              </a>
            </p>
          </div>
          <div className="flex gap-8 text-[9px] md:text-xs font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms Of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
