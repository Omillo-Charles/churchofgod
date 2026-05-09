"use client";

import React, { useState } from "react";
import MemberSidebar from "@/components/dashboards/MemberSidebar";
import MemberNavbar from "@/components/dashboards/MemberNavbar";

export default function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#080808] overflow-hidden">
      {/* Sidebar */}
      <MemberSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <MemberNavbar onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable page content */}
        <main
          id="dashboard-main"
          className="flex-1 overflow-y-auto no-scrollbar"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
