import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "@/components/ui/SiteShell";
import { Toaster } from "sonner";

const ubuntu = localFont({
  src: [
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-R.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-RI.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-L.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-M.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-B.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ubuntufont/ubuntu-font-family-0.83/Ubuntu-BI.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "NTCOGK - New Testament Church of God Kenya",
  description: "Welcome to the New Testament Church of God Kenya. Join us in worship and community.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteShell>{children}</SiteShell>
        <Toaster position="top-right" richColors theme="light" />
      </body>
    </html>
  );
}
