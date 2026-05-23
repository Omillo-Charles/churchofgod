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
      } else if (user && user.role !== "CLERGY" && user.role !== "ADMIN") {
        // Redirect non-clergy/admin users to the member portal
        router.push("/portals/member");
      }
    }
  }, [authenticated, loading, user, router]);

  if (loading || !authenticated || (user && user.role !== "CLERGY" && user.role !== "ADMIN")) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060a10]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
          {!loading && !authenticated && <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Redirecting to login...</p>}
          {!loading && authenticated && user && user.role !== "CLERGY" && user.role !== "ADMIN" && <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Redirecting to member portal...</p>}
        </div>
      </div>
    );
  }

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
