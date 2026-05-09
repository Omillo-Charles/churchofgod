"use client";

import React, { useState } from "react";
import ClergySidebar from "@/components/dashboards/ClergySidebar";
import ClergyNavbar from "@/components/dashboards/ClergyNavbar";

export default function ClergyPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#060a10] overflow-hidden">
      {/* Sidebar */}
      <ClergySidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ClergyNavbar onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />

        <main
          id="clergy-main"
          className="flex-1 overflow-y-auto no-scrollbar"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
