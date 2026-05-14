"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CollegePage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const courses = [
    {
      name: "Diploma in Theology & Ministerial Studies",
      duration: "1–2 years",
      mode: "Weekend / weekday",
      target: "Aspiring pastors, interns, leaders",
      modules: [
        "Old & New Testament Survey",
        "Church History",
        "Systematic Theology",
        "Christian Ethics & Leadership",
        "Pastoral Counselling & Care",
        "Evangelism & Missions",
        "Church Administration",
        "Practicum",
      ],
    },
    {
      name: "Certificate in Biblical Studies & Leadership",
      duration: "6–12 months",
      mode: "Weekend & evening",
      target: "Youth leaders, small-group leaders",
      modules: [
        "Bible Overview",
        "Christian Beliefs",
        "Evangelism & Discipleship",
        "Small Group Leadership",
        "Youth Ministry Essentials",
      ],
    },
    {
      name: "Short Intensive Discipleship Course",
      duration: "4 weeks",
      mode: "Evenings / Saturdays",
      target: "New believers & ministry teams",
      modules: [
        "Prayer",
        "Bible Study Methods",
        "Spiritual Disciplines",
        "Witnessing",
        "Christian Living",
      ],
    },
    {
      name: "Vocational & ICT Courses (KNEC)",
      duration: "3–6 months",
      mode: "Weekdays",
      target: "Youth & adults (skills training)",
      modules: [
        "Computer Applications",
        "Business Skills",
        "ICT Basics",
        "Digital Literacy",
      ],
    },
    {
      name: "Leadership & Train-the-Trainer (TOT)",
      duration: "2–4 weeks",
      mode: "Intensive",
      target: "Ministry leaders",
      modules: [
        "Leadership Principles",
        "Communication",
        "Mentorship",
        "Training Methods",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is the duration of the courses?",
      answer: "Course durations vary from short intensives (2-4 weeks) to full diplomas (1-2 years) depending on the program selected.",
    },
    {
      question: "Can I study while working?",
      answer: "Yes! We offer flexible modes of study including evening, weekend, and weekday classes to accommodate your schedule.",
    },
    {
      question: "Is the college accredited?",
      answer: "Our theology programs follow the NTCOG global curriculum standards, and our ICT courses are KNEC-recognized.",
    },
    {
      question: "Is there accommodation available?",
      answer: "We offer guidance on local accommodation options within Pioneer Estate for students traveling from outside Eldoret.",
    },
    {
      question: "What are the payment options?",
      answer: "Fees can be paid via M-Pesa, Bank Deposit, or Cash at the campus office.",
    },
    {
      question: "Are scholarships available?",
      answer: "Yes, church-sponsored scholarships are available for eligible candidates. Please inquire at the admissions office.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero6.png"
          alt="Discipleship College"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Equipping for Ministry
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Discipleship College
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Grow in Faith, Equip for Ministry, Transform Lives. Join our community of learners at the NTCOGK Kenya Eldoret Campus.
          </p>
        </div>
      </section>

      {/* 2. Courses Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Academic Programs</h3>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Our Courses</h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
              Choose the program that fits your calling and schedule. We offer a range of theological and skill-based courses designed to empower your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {courses.map((course, index) => (
              <div key={index} className="group bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 hover:border-amber-500/20 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-xl">
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-zinc-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-white uppercase mb-4 leading-tight">
                  {course.name}
                </h3>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Mode of Study</p>
                    <p className="text-xs text-zinc-400 font-medium">{course.mode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">Target Audience</p>
                    <p className="text-xs text-zinc-400 font-medium">{course.target}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <p className="text-[9px] font-black text-white uppercase tracking-widest mb-3">Key Modules</p>
                  <ul className="grid grid-cols-1 gap-2">
                    {course.modules.map((module, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium leading-tight">
                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Admissions Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Admissions</h3>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase">Join the College</h2>
              </div>

              <div className="space-y-8">
                {/* A. Entry Requirements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Entry Requirements</h4>
                  </div>
                  <ul className="space-y-3 ml-11">
                    {[
                      "Completed application form",
                      "National ID or Birth Certificate copy",
                      "Recommendation from local church pastor",
                      "For Diploma: KCSE certificate or verifiable ministry experience",
                    ].map((req, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="text-amber-500">•</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* B. Fees & Intakes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Fees & Intakes</h4>
                  </div>
                  <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Intake Periods</p>
                      <p className="text-xs text-white font-bold">January, April, September</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Scholarships</p>
                      <p className="text-xs text-white font-bold">Church-sponsored available</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Payment Methods</p>
                      <p className="text-xs text-white font-bold">M-Pesa, Bank, Cash</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Course Fees</p>
                      <p className="text-xs text-white font-bold italic">Vary per course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. How to Apply */}
            <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-14 text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Next Steps</h3>
                <h2 className="text-2xl font-black uppercase">How to Apply</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  Begin your journey today. Our admissions team is ready to assist you through the application process.
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Visit Campus</p>
                  <p className="text-xs font-bold">Pioneer Estate, Eldoret, Kenya</p>
                  <p className="text-[10px] text-zinc-400 italic">Monday — Friday, 8:00 AM – 5:00 PM</p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Connect with Us</p>
                  <div className="grid grid-cols-1 gap-3">
                    <a href="tel:+254751589698" className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-amber-500 hover:text-white transition-all group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span className="text-xs font-bold">+254 751 589 698</span>
                    </a>
                    <a href="https://wa.me/254114173886" className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-emerald-500 hover:text-white transition-all group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                      <span className="text-xs font-bold">+254 114 173 886</span>
                    </a>
                    <a href="mailto:info@ntcogk.org" className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-blue-500 hover:text-white transition-all group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      <span className="text-xs font-bold">info@ntcogk.org</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Common Questions</h3>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">Frequently Asked</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-zinc-800 transition-transform duration-300 ${activeAccordion === index ? "rotate-180 bg-amber-500 text-white" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>
                <div
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeAccordion === index ? "max-h-48 pb-8" : "max-h-0"
                  }`}
                >
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact & Map Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Get in Touch</h3>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight">Visit Eldoret <br />Campus</h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  We are located in the heart of Eldoret, providing a conducive environment for theological study and spiritual growth.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Location</p>
                    <p className="text-xs font-bold text-white">Pioneer Estate, Eldoret, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Social Media</p>
                    <a href="#" className="text-xs font-bold text-white hover:text-amber-500 transition-colors">Discipleship College Eldoret</a>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="https://goo.gl/maps/example"
                  target="_blank"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                  Get Directions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700 group">
              {/* Using a placeholder-like style for map since we can't embed the actual dynamic map easily without API key, but we'll use an iframe if provided */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.758837330206!2d35.2690!3d0.5143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101ae3a7c6f93%3A0x63c0a5a2f5f6b8b0!2sPioneer%20Estate%2C%20Eldoret!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-[20px] border-zinc-950 rounded-[3rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-20 md:py-32 text-center bg-black border-t border-zinc-900">
        <div className="container mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Ready to Start?</h2>
          <p className="text-xs md:text-sm font-bold text-zinc-400 max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
            Take the first step towards your calling. Applications for the next intake are now open.
          </p>
          <div className="pt-4">
            <Link
              href="mailto:info@ntcogk.org"
              className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl inline-block"
            >
              Request Prospectus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegePage;
