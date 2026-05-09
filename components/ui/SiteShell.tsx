"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Portal routes get their own layout — no main Navbar/Footer
  const isPortal = pathname?.startsWith("/portals/");

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[120px] md:pt-16">{children}</main>
      <Footer />
    </>
  );
}
