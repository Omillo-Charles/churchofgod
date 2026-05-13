"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/contact", formData);
      toast.success(res.data.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const regions = [
    {
      name: "North Central Region",
      bishop: "Samuel Wainaina",
      role: "Regional Bishop & National Secretary",
      location: "Gatanga Area",
    },
    {
      name: "Nairobi Region",
      bishop: "Dickson Tito Mwalili",
      role: "Regional Bishop & National Treasurer",
      location: "Karen, Nairobi",
    },
    {
      name: "Coast Region",
      bishop: "Benea Alukwe Amakhungu",
      role: "Regional Bishop & National Education Coordinator",
      location: "Rabai Area",
    },
    {
      name: "Western Region",
      bishop: "Simon Ngure Ben",
      role: "Regional Bishop & National Prayer Coordinator",
      location: "Busia Area",
    },
    {
      name: "North Western Region",
      bishop: "Protus Pamba Orima",
      role: "Regional Bishop",
      location: "Busia Area",
    },
    {
      name: "Nyanza Region",
      bishop: "Paul Obadha Ohuare",
      role: "Regional Bishop & National Convention Coordinator",
      location: "Molo Area",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/contactImages/contact1.png"
          alt="Contact Us"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Get in Touch
          </h2>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">
            Contact Us
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto font-medium text-xs md:text-sm leading-relaxed">
            We would love to hear from you. Connect with our church family across Kenya.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">Send a Message</h3>
              <p className="text-sm text-zinc-400">
                Whether you're seeking a church home, have questions about our faith, or need prayer support, we're here for you.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254..."
                    className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Subject *</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Salvation & Baptism</option>
                    <option>Ministry Opportunities</option>
                    <option>Counseling</option>
                    <option>Church Planting</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Message *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                />
              </div>

              <button 
                disabled={loading}
                className="px-10 py-3 bg-amber-500 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20 uppercase tracking-widest text-[11px] disabled:opacity-50 disabled:scale-100"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side: Headquarters Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-8 md:p-10 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 space-y-8 shadow-sm">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">National Headquarters</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 shadow-sm flex items-center justify-center shrink-0 text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="text-[11px] md:text-xs">
                      <p className="font-bold text-white">Physical Address</p>
                      <p className="text-zinc-400 leading-relaxed">
                        Kwarara Rd / Ndege Rd, Off Bugani Rd<br />
                        Karen, Langata, Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 shadow-sm flex items-center justify-center shrink-0 text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div className="text-[11px] md:text-xs">
                      <p className="font-bold text-white">Postal Address</p>
                      <p className="text-zinc-400 leading-relaxed">
                        P.O. Box 75, 00502 Karen<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 shadow-sm flex items-center justify-center shrink-0 text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div className="text-[11px] md:text-xs">
                      <p className="font-bold text-white">Phone</p>
                      <p className="text-zinc-400 leading-relaxed">+254 759 120 222</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-6">
                <div className="text-[11px] md:text-xs">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Leadership</p>
                  <p className="font-bold text-white">National Administrative Bishop:</p>
                  <p className="text-zinc-400 italic">Dr. David Gilbert Bwire</p>
                </div>
                <div className="text-[11px] md:text-xs">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Business Hours</p>
                  <div className="space-y-1 text-zinc-400">
                    <p><span className="font-bold text-zinc-200">Mon – Fri:</span> Contact for specific hours</p>
                    <p><span className="font-bold text-zinc-200">Saturday:</span> Contact for specific hours</p>
                    <p><span className="font-bold text-zinc-200">Sunday:</span> Worship Services</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 text-white shadow-sm">
              <h4 className="font-bold text-lg mb-2">Prayer & Support Hotline</h4>
              <p className="text-zinc-400 text-[11px] mb-6 leading-relaxed">
                Need prayer? Our support team is available to stand with you in faith.
              </p>
              <div className="flex items-center gap-3 text-xl font-black text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +254 759 120 222
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Offices */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Regional Presence</h3>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Regional Offices</h2>
            <p className="text-sm text-zinc-400">
              Our leadership extends across Kenya to better serve our growing congregations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regions.map((region) => (
              <div 
                key={region.name}
                className="p-6 md:p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 transition-colors mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{region.name}</h4>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-4">{region.location}</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-200">{region.bishop}</p>
                  <p className="text-[10px] text-zinc-500 italic">{region.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            <div className="space-y-6 md:space-y-8">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Spiritual Needs</h3>
              <ul className="space-y-3 text-xs md:text-sm text-zinc-400 font-medium">
                <li>• Salvation & Baptism</li>
                <li>• Prayer Requests</li>
                <li>• Biblical Counseling</li>
                <li>• Marriage & Family Support</li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M7 22v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Ministry Opportunities</h3>
              <ul className="space-y-3 text-xs md:text-sm text-zinc-400 font-medium">
                <li>• Join a Ministry</li>
                <li>• Church Planting</li>
                <li>• Pastoral Training</li>
                <li>• Youth & Children’s Ministry</li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-white">Community Support</h3>
              <ul className="space-y-3 text-xs md:text-sm text-zinc-400 font-medium">
                <li>• Orphans & Vulnerable Children</li>
                <li>• HIV/AIDS Ministry</li>
                <li>• Widows Care</li>
                <li>• Youth Training Programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 md:py-24 bg-black overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">Visit Us This <br />Sunday</h2>
              <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
                Join us for worship, preaching, and fellowship. With over 224 churches across Kenya, there is likely a congregation near you.
              </p>
              <div className="space-y-4 md:space-y-6">
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-200 uppercase tracking-widest">Contemporary worship with African songs</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-200 uppercase tracking-widest">Bible-based preaching and teaching</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-zinc-200 uppercase tracking-widest">A warm and welcoming community</p>
                </div>
              </div>
              <div className="pt-6 md:pt-8">
                <Link
                  href="/visit"
                  className="px-8 py-3 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
                >
                  Locate a Church Near You
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/heroImages/hero1.png"
                alt="Worship at NTCOGK"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Commitment & Closing */}
      <section className="py-16 md:py-24 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Our Commitment to You</h3>
            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed italic">
              "A warm and friendly response, confidential handling of your information, and guidance rooted in Scripture."
            </p>
          </div>
          <div className="pt-8 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">To God be the Glory.</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
