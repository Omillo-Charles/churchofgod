"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import MemberSidebar from "@/components/dashboards/MemberSidebar";
import MemberNavbar from "@/components/dashboards/MemberNavbar";

export default function MemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  // Handle unauthorized access
  React.useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/auth");
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#080808]">
        <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

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
          className="flex-1 overflow-y-auto no-scrollbar pt-2 md:pt-4"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
