"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ClergySidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  {
    section: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/portals/clergy",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
        ),
      },
      {
        name: "Announcements",
        href: "/portals/clergy/announcements",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z"/>
          </svg>
        ),
        badge: 2,
      },
    ],
  },
  {
    section: "Congregation",
    items: [
      {
        name: "Member Directory",
        href: "/portals/clergy/members",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
      {
        name: "Attendance Reports",
        href: "/portals/clergy/attendance",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/>
          </svg>
        ),
      },
      {
        name: "Prayer Requests",
        href: "/portals/clergy/prayer",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        ),
        badge: 7,
      },
    ],
  },
  {
    section: "Ministry",
    items: [
      {
        name: "Sermons",
        href: "/portals/clergy/sermons",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        ),
      },
      {
        name: "Event Management",
        href: "/portals/clergy/events",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        ),
      },
      {
        name: "Discipleship",
        href: "/portals/clergy/discipleship",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        ),
      },
    ],
  },
  {
    section: "Finance",
    items: [
      {
        name: "Stewardship Report",
        href: "/portals/clergy/finance",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        ),
      },
      {
        name: "Budget Overview",
        href: "/portals/clergy/budget",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
          </svg>
        ),
      },
    ],
  },
  {
    section: "Admin",
    items: [
      {
        name: "Resources",
        href: "/portals/clergy/resources",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          </svg>
        ),
      },
      {
        name: "Settings",
        href: "/portals/clergy/settings",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        ),
      },
    ],
  },
];

const ClergySidebar: React.FC<ClergySidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
        <Link href="/" className={`flex items-center gap-3 group ${collapsed ? "hidden" : "flex"}`}>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0">
            <Image src="/ntcogkLogo.jpeg" alt="NTCOGK" fill className="object-cover" sizes="36px" />
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight">NTCOGK</p>
            <p className="text-[9px] font-bold text-sky-400 uppercase tracking-widest">Clergy Portal</p>
          </div>
        </Link>
        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10">
              <Image src="/ntcogkLogo.jpeg" alt="NTCOGK" fill className="object-cover" sizes="36px" />
            </div>
          </Link>
        )}
        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all ml-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? <path d="m9 18 6-6-6-6"/> : <path d="m15 18-6-6 6-6"/>}
          </svg>
        </button>
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-white transition-colors ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400 shrink-0">
              <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.52 9.397a1 1 0 0 1-.962.734H5.5a1 1 0 0 1-.962-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
              <path d="M5 21h14"/>
            </svg>
            <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest">Senior Pastor</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        {navItems.map((group) => (
          <div key={group.section} className={`mb-6 ${collapsed ? "px-2" : "px-3"}`}>
            {!collapsed && (
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-2">
                {group.section}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onMobileClose}
                    title={collapsed ? item.name : undefined}
                    className={`flex items-center gap-3 rounded-xl transition-all duration-200 group relative
                      ${collapsed ? "justify-center p-3" : "px-3 py-2.5"}
                      ${isActive
                        ? "bg-sky-500/10 text-sky-400"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <span className={`shrink-0 transition-colors ${isActive ? "text-sky-400" : "text-zinc-500 group-hover:text-white"}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className={`text-xs font-bold flex-1 ${isActive ? "text-sky-400" : ""}`}>
                          {item.name}
                        </span>
                        {"badge" in item && item.badge && (
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-black text-[9px] font-black">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-400 rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Card Footer */}
      <div className="border-t border-white/5 p-3">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-white">PM</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Pastor Mwangi</p>
              <p className="text-[9px] text-zinc-500 truncate">pastor@ntcogk.org</p>
            </div>
          )}
          {!collapsed && (
            <Link
              href="/auth"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              title="Sign out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      />

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-[#060a10] border-r border-white/5 transition-all duration-300 ease-in-out shrink-0
          ${collapsed ? "w-[64px]" : "w-[240px]"}`}
        style={{ position: "sticky", top: 0 }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#060a10] border-r border-white/5 z-50 lg:hidden
          flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default ClergySidebar;
