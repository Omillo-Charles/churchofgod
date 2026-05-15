"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/contactImages/contact1.png"
          alt="Terms of Service"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Terms & Conditions
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Terms of Service
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Understanding the rules and guidelines for our digital community.
          </p>
        </div>
      </section>

      <div className="relative container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        {/* Content Sections */}
        <div className="space-y-16 text-zinc-400 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">01</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Agreement to Terms</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                By accessing or using the NTCOGK website and Member Portal, you agree to be bound by these Terms of Service. 
                If you do not agree with any part of these terms, you must not access the services.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">02</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">User Accounts</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                To access certain features of the site, you may be required to create a member account. You are responsible for:
              </p>
              <ul className="list-none space-y-3 pl-4">
                {[
                  "Maintaining the confidentiality of your account credentials.",
                  "All activities that occur under your account.",
                  "Providing accurate and current information during registration.",
                  "Notifying administration immediately of any unauthorized use of your account."
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
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Prohibited Conduct</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                When using our platforms, you agree not to:
              </p>
              <ul className="list-none space-y-3 pl-4">
                {[
                  "Use the service for any illegal or unauthorized purpose.",
                  "Post content that is offensive, defamatory, or violates our community standards.",
                  "Attempt to interfere with the proper working of the site or bypass security measures.",
                  "Engage in any automated use of the system, such as using scripts to send messages."
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
              <span className="text-xs font-black text-amber-500 tracking-widest">04</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                All content on this site, including sermons, images, text, and logos, is the property of NTCOGK or its 
                content suppliers and is protected by intellectual property laws. You may not reproduce or distribute 
                any content without express written permission.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">05</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Financial Contributions</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                All tithes, offerings, and donations made through the site are voluntary. We use secure third-party 
                processors for all transactions. Please review our giving policy for details on refunds or misdirected 
                payments.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-amber-500 tracking-widest">06</span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Modifications to Service</h2>
            </div>
            <div className="space-y-4 text-[11px] md:text-sm leading-relaxed">
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, the service with or without 
                notice. We shall not be liable to you or any third party for any modification, suspension, or 
                discontinuance of the service.
              </p>
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
              href="/privacy"
              className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
