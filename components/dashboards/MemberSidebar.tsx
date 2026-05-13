"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

interface MemberSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  {
    section: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/portals/member",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
        ),
      },
      {
        name: "My Profile",
        href: "/portals/member/profile",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>
          </svg>
        ),
      },
    ],
  },
  {
    section: "Church Life",
    items: [
      {
        name: "Giving Records",
        href: "/portals/member/giving",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        ),
      },
      {
        name: "Attendance",
        href: "/portals/member/attendance",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/>
          </svg>
        ),
      },
      {
        name: "Sermons",
        href: "/portals/member/sermons",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        ),
      },
      {
        name: "Events",
        href: "/portals/member/events",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        ),
      },
    ],
  },
  {
    section: "Ministry",
    items: [
      {
        name: "My Ministry",
        href: "/portals/member/ministry",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
      {
        name: "Prayer Requests",
        href: "/portals/member/prayer",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        ),
      },
      {
        name: "Discipleship",
        href: "/portals/member/discipleship",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        ),
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        name: "Notifications",
        href: "/portals/member/notifications",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        ),
        badge: 3,
      },
      {
        name: "Settings",
        href: "/portals/member/settings",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        ),
      },
    ],
  },
];

const MemberSidebar: React.FC<MemberSidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await api.post("/auth/signout");
    } catch {
      // Proceed with redirect even if API call fails
    }
    toast.success("You have been signed out.");
    router.push("/auth");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-5 border-b border-white/5 ${collapsed ? "px-3" : ""}`}>
        <Link href="/" className={`flex items-center gap-3 group ${collapsed ? "hidden" : "flex"}`}>
          <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0">
            <Image src="/ntcogkLogo.jpeg" alt="NTCOGK" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight">NTCOGK</p>
            <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Member Portal</p>
          </div>
        </Link>
        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10">
              <Image src="/ntcogkLogo.jpeg" alt="NTCOGK" fill className="object-cover" />
            </div>
          </Link>
        )}
        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all ml-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              <>
                <path d="m9 18 6-6-6-6"/>
              </>
            ) : (
              <>
                <path d="m15 18-6-6 6-6"/>
              </>
            )}
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
                        ? "bg-amber-500/10 text-amber-500"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <span className={`shrink-0 transition-colors ${isActive ? "text-amber-500" : "text-zinc-500 group-hover:text-white"}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className={`text-xs font-bold flex-1 ${isActive ? "text-amber-500" : ""}`}>
                          {item.name}
                        </span>
                        {"badge" in item && item.badge && (
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-black text-[9px] font-black">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-amber-500 rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Card Footer */}
      <div className={`border-t border-white/5 p-3`}>
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-black">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">John Doe</p>
              <p className="text-[9px] text-zinc-500 truncate">john@ntcogk.org</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setShowLogoutModal(true)}
              title="Sign out"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />
          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
              </svg>
            </div>
            {/* Text */}
            <div className="text-center space-y-1">
              <h2 className="text-sm font-black text-white uppercase tracking-wide">Sign Out?</h2>
              <p className="text-xs text-zinc-500">Are you sure you want to sign out of your member portal?</p>
            </div>
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-[11px] font-bold text-zinc-400 hover:text-white hover:border-white/20 uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-[11px] font-bold text-white uppercase tracking-widest transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      />

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-[#0a0a0a] border-r border-white/5 transition-all duration-300 ease-in-out shrink-0
          ${collapsed ? "w-[64px]" : "w-[240px]"}`}
        style={{ position: "sticky", top: 0 }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0a0a0a] border-r border-white/5 z-50 lg:hidden
          flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default MemberSidebar;
