"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import ClergySidebar from "@/components/dashboards/ClergySidebar";
import ClergyNavbar from "@/components/dashboards/ClergyNavbar";

export default function ClergyPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { authenticated, loading, user } = useAuth();
  const router = useRouter();

  // Handle unauthorized access
  React.useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        router.push("/auth");
      }
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060a10]">
        <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

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
