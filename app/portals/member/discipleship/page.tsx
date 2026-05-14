"use client";

import React from "react";

const articlesOfFaith = [
  {
    number: 1,
    title: "The Verbal Inspiration of the Bible",
    content: "We believe the Bible is the inspired Word of God.",
    verses: ["2 Timothy 3:16", "2 Peter 1:20–21", "Psalm 119:105"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "One God Eternally Existing in Three Persons",
    content: "Father, Son, and Holy Ghost.",
    verses: ["Matthew 28:19", "1 John 5:7", "2 Corinthians 13:14"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Jesus Christ Is the Only Begotten Son of God",
    content: "Born of the Virgin Mary, crucified, buried, resurrected, ascended, and interceding for believers.",
    verses: ["Matthew 1:18–23", "John 3:16", "1 Corinthians 15:3–4", "Hebrews 7:25", "Acts 1:9–11"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M5 7h14" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Repentance for Sin",
    content: "All have sinned and must repent.",
    verses: ["Romans 3:23", "Acts 3:19", "Luke 13:3", "Romans 6:23"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    number: 5,
    title: "Justification, Regeneration, and the New Birth",
    content: "Salvation comes through faith in Jesus Christ.",
    verses: ["John 3:3–7", "Romans 5:1", "Titus 3:5", "2 Corinthians 5:17"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4 4 4" /><path d="M4 14l4-4 4 4" /><path d="M2 18h20" />
      </svg>
    ),
  },
  {
    number: 6,
    title: "Sanctification Subsequent to the New Birth",
    content: "Believers are made holy through Christ, the Word, and the Holy Spirit.",
    verses: ["1 Thessalonians 5:23", "Hebrews 13:12", "John 17:17"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" />
      </svg>
    ),
  },
  {
    number: 7,
    title: "Holiness as God’s Standard of Living",
    content: "Christians should live holy lives.",
    verses: ["1 Peter 1:15–16", "Hebrews 12:14", "Matthew 5:48"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 8,
    title: "Baptism with the Holy Ghost",
    content: "Received after salvation.",
    verses: ["Acts 1:8", "Acts 2:1–4", "Acts 8:14–17"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s-8 6-8 12c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-8-12-8-12z" />
      </svg>
    ),
  },
  {
    number: 9,
    title: "Speaking in Tongues as Initial Evidence",
    content: "Tongues are evidence of Holy Ghost baptism.",
    verses: ["Acts 2:4", "Acts 10:44–46", "Acts 19:6", "Mark 16:17"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: 10,
    title: "Water Baptism by Immersion",
    content: "Believers should be baptized in the name of the Father, Son, and Holy Ghost.",
    verses: ["Matthew 28:19", "Mark 16:16", "Acts 2:38", "Romans 6:4"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" /><path d="m12 22 4-4" /><path d="m12 22-4-4" />
      </svg>
    ),
  },
  {
    number: 11,
    title: "Divine Healing",
    content: "Healing is provided through Christ’s atonement.",
    verses: ["Isaiah 53:5", "James 5:14–15", "Matthew 8:16–17", "Mark 16:18"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    number: 12,
    title: "The Lord’s Supper and Washing of Saints’ Feet",
    content: "Communion and humility among believers.",
    verses: ["Luke 22:19–20", "1 Corinthians 11:23–26", "John 13:4–17"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l1 7a5 5 0 0 1-10 0l1-7z" /><path d="M10 15v5h4v-5" /><path d="M9 21h6" />
      </svg>
    ),
  },
  {
    number: 13,
    title: "The Premillennial Second Coming of Jesus",
    content: "Christ will return, resurrect the righteous, and reign for 1000 years.",
    verses: ["1 Thessalonians 4:16–17", "Revelation 20:4–6", "Acts 1:11", "Matthew 24:30"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8" /><path d="m16 6-4 4-4-4" /><path d="M12 16v6" /><path d="m8 18 4-4 4 4" />
      </svg>
    ),
  },
  {
    number: 14,
    title: "Bodily Resurrection, Eternal Life, and Eternal Punishment",
    content: "The righteous receive eternal life; the wicked face eternal punishment.",
    verses: ["John 5:28–29", "Daniel 12:2", "Revelation 20:11–15", "Matthew 25:46"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

export default function DiscipleshipPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-white/5 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.1),transparent_70%)]" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Spiritual Growth</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Articles of <span className="text-amber-400">Faith</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">
            The foundation of our belief and doctrine. Explore the scriptural pillars that guide our faith and practice at New Testament Church of God.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articlesOfFaith.map((article) => (
          <div
            key={article.number}
            className="group relative p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:bg-zinc-900 shadow-xl"
          >
            <div className="absolute top-4 right-6 text-4xl font-black text-white/5 group-hover:text-amber-500/10 transition-colors">
              {article.number < 10 ? `0${article.number}` : article.number}
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500">
              {article.icon}
            </div>

            <h3 className="text-lg font-black text-white mb-3 group-hover:text-amber-400 transition-colors leading-tight">
              {article.title}
            </h3>
            
            <p className="text-zinc-400 text-xs leading-relaxed mb-6 italic">
              "{article.content}"
            </p>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Bible Verses</p>
              <div className="flex flex-wrap gap-2">
                {article.verses.map((verse) => (
                  <span
                    key={verse}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-300 group-hover:border-amber-500/20 transition-colors"
                  >
                    {verse}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 text-center">
        <p className="text-zinc-500 text-xs italic">
          "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." — 2 Timothy 2:15
        </p>
      </div>
    </div>
  );
}
