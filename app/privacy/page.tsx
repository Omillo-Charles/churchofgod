"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/contactImages/contact1.png"
          alt="Privacy Policy"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Legal & Security
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Protecting your data and ensuring your privacy within the NTCOGK community.
          </p>
        </div>
      </section>

      <div className="relative container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        {/* Content Sections */}
        <div className="space-y-16 text-zinc-400 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">01</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                We collect personal information that you voluntarily provide to us when you register on the Member Portal, 
                express an interest in obtaining information about us or our services, or otherwise when you contact us.
              </p>
              <ul className="list-none space-y-3 pl-4">
                {[
                  "Personal Identifiers: Name, email address, phone number, and physical address.",
                  "Church Affiliation: Local branch name, ministry involvement, and attendance history.",
                  "Financial Data: Giving records and donation history processed securely through our payment partners.",
                  "Media: Photos or videos from church events where you may be present."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">02</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">How We Use Your Data</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                We use the information we collect to facilitate the spiritual and communal life of NTCOGK. This includes:
              </p>
              <ul className="list-none space-y-3 pl-4">
                {[
                  "Providing and managing your member account.",
                  "Sending church updates, event notifications, and newsletters.",
                  "Processing tithes, offerings, and other financial contributions.",
                  "Connecting you with specific ministries and fellowship groups.",
                  "Improving our digital platforms and user experience."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">03</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Data Security</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security 
                of any personal information we process. However, please also remember that we cannot guarantee that the 
                internet itself is 100% secure.
              </p>
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 italic">Security Protocol:</p>
                <p className="text-zinc-300 text-[10px] md:text-xs">
                  All sensitive data, especially financial information, is encrypted using industry-standard protocols. 
                  Access to member data is strictly restricted to authorized church administration personnel.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">04</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Your Rights</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                As a member of our digital community, you have the following rights regarding your data:
              </p>
              <ul className="list-none space-y-3 pl-4">
                {[
                  "The right to access and update your personal information via the Member Portal.",
                  "The right to request the deletion of your account and associated data.",
                  "The right to opt-out of non-essential communications at any time."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">05</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Contact Us</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                If you have questions or comments about this policy, you may contact our data privacy officer at:
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a href="mailto:privacy@ntcogk.org" className="text-white font-bold hover:text-amber-400 transition-colors">privacy@ntcogk.org</a>
                <p className="text-zinc-500">NTCOGK Headquarters, Karen, Nairobi</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-20 border-t border-zinc-900 text-center">
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-6">Need more information?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact"
              className="px-8 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              Contact Administration
            </Link>
            <Link 
              href="/terms"
              className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
