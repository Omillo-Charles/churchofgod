import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "@/components/ui/SiteShell";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/AuthContext";

const mulish = localFont({
  src: [
    {
      path: "../public/fonts/mulish/Mulish-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/mulish/Mulish-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/mulish/Mulish-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-mulish",
  display: "swap",
});

const glacial = localFont({
  src: [
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/glacial-indifference/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
  display: "swap",
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
      className={`${mulish.variable} ${glacial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
          <Toaster position="top-right" richColors theme="light" />
        </AuthProvider>
      </body>
    </html>
  );
}
