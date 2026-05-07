"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sections = [
    {
      title: "Ministries",
      links: [
        { name: "Youth Ministry", desc: "Empowering the next generation", href: "/ministries/youth" },
        { name: "Children's Ministry", desc: "Nurturing faith in our little ones", href: "/ministries/children" },
        { name: "Men's Fellowship", desc: "Building strong men of God", href: "/ministries/men" },
        { name: "Women's Guild", desc: "Supporting and inspiring women", href: "/ministries/women" },
      ],
    },
    {
      title: "Portals",
      links: [
        { name: "Member Portal", desc: "Access your church records", href: "/portals/member" },
        { name: "Clergy Portal", desc: "Resource center for leaders", href: "/portals/clergy" },
      ],
    },
    {
      title: "Education & Store",
      links: [
        { name: "Discipleship College", desc: "Deepen your biblical understanding", href: "/college" },
        { name: "Church Store", desc: "Bibles, books, and merchandise", href: "/store" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Events", desc: "Stay updated with our calendar", href: "/events" },
        { name: "Latest News", desc: "Stories from our community", href: "/news" },
      ],
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 w-full max-w-sm h-screen bg-black z-[70] shadow-2xl transition-transform duration-500 ease-in-out overflow-y-auto no-scrollbar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-900 sticky top-0 bg-black z-10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/ntcogkLogo.jpeg"
                  alt="NTCOGK Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg text-white">NTCOGK</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {section.title}
                </h3>
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="group block"
                        onClick={onClose}
                      >
                        <h4 className={`text-sm font-bold transition-colors ${
                          isActive ? "text-amber-500" : "text-zinc-100 group-hover:text-zinc-400"
                        }`}>
                          {link.name}
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {link.desc}
                        </p>
                      </Link>
                    );
                  })}
              </div>
            ))}

            {/* Contact Info */}
            <div className="pt-6 border-t border-zinc-900 space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Get in Touch
              </h3>
              <div className="space-y-3 text-[11px] text-zinc-400">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+254 759 120 222</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>info@ntcogk.org</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Karen, Langata, Nairobi<br />P.O. Box 75, 00502 Karen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Socials */}
          <div className="mt-auto p-6 bg-zinc-900/50 border-t border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                  <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768" />
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Est. 1977</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
