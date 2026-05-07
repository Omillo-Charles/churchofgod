"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ministries = [
  {
    title: "Youth Ministry",
    desc: "Empowering young people to lead and grow in their faith journey.",
    image: "/youthImages/youth2.png",
    href: "/ministries/youth",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Children's Ministry",
    desc: "A safe, fun space for kids to discover God's love and biblical truths.",
    image: "/childrenImages/child1.png",
    href: "/ministries/children",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Discipleship College",
    desc: "Equipping leaders and believers through theological and vocational training.",
    image: "/heroImages/hero6.png",
    href: "/college",
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const MinistriesGrid = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
            Get Involved
          </h2>
          <h3 className="text-xl md:text-3xl font-black tracking-tight text-white leading-tight">
            Our Thriving <span className="text-zinc-400">Ministries.</span>
          </h3>
          <p className="text-[10px] md:text-xs text-zinc-400 font-medium">
            Discover a place where you belong. We have diverse ministries tailored for every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m) => (
            <Link
              key={m.title}
              href={m.href}
              className="group relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-[2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-[3]">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${m.color} backdrop-blur-md mb-3 md:mb-4 flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{m.title}</h4>
                <p className="text-[9px] md:text-[11px] text-zinc-300 transition-opacity duration-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/ministries"
            className="px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all inline-block active:scale-95"
          >
            View All Ministries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistriesGrid;
