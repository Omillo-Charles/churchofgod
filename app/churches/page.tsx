"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Available regions and districts for filtering
const regions = [
  "All Regions",
  "Nairobi Region",
  "Rift Valley Region",
  "Central Region",
  "Western Region",
  "Nyanza Region",
  "Coast Region",
];

const districts = [
  "All Districts",
  "Karen District",
  "Eldoret District",
  "Kisumu District",
  "Mombasa District",
  "Nakuru District",
  "Kakamega District",
  "Nyeri District",
];

const ChurchesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [sortOrder, setSortOrder] = useState<"A - Z" | "Z - A">("A - Z");

  // Empty array to simulate "no churches registered yet to display"
  const churchesList: any[] = [];

  // Filter & Sort logic (ready for when churches are added)
  const filteredChurches = churchesList.filter((church) => {
    const matchesSearch =
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion =
      selectedRegion === "All Regions" || church.region === selectedRegion;
      
    const matchesDistrict =
      selectedDistrict === "All Districts" || church.district === selectedDistrict;

    return matchesSearch && matchesRegion && matchesDistrict;
  });

  // Sort alphabetically
  const sortedChurches = [...filteredChurches].sort((a, b) => {
    if (sortOrder === "A - Z") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/heroImages/hero1.png"
          alt="Our Churches"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            National Directory
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Our Local Churches
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Find and connect with a local New Testament Church of God Kenya congregation near you. Explore our 224 active fellowships.
          </p>
        </div>
      </section>

      {/* Directory & Filters Section */}
      <section className="py-16 px-6 max-w-6xl container mx-auto">
        <div className="space-y-10">
          
          {/* Main Search and Dropdown Controls */}
          <div className="overflow-x-auto no-scrollbar md:overflow-visible">
            <div className="flex md:grid md:grid-cols-12 gap-4 min-w-[750px] md:min-w-0 pb-1 md:pb-0">
              
              {/* Search Bar */}
              <div className="w-[280px] md:w-full md:col-span-5 relative shrink-0">
                <input
                  type="text"
                  placeholder="Search by church name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black border border-white/5 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              {/* Region Filter */}
              <div className="w-[170px] md:w-full md:col-span-3 shrink-0">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div className="w-[150px] md:w-full md:col-span-2 shrink-0">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alphabetical Sorting Dropdown */}
              <div className="w-[150px] md:w-full md:col-span-2 shrink-0">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "A - Z" | "Z - A")}
                  className="w-full px-6 py-4 rounded-2xl bg-black border border-white/5 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all font-medium cursor-pointer appearance-none"
                >
                  <option value="A - Z">A – Z (Sort Ascending)</option>
                  <option value="Z - A">Z – A (Sort Descending)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Directory Content (Displaying current Empty State) */}
          <div className="min-h-[350px] flex items-center justify-center p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5">
            <div className="text-center space-y-6 max-w-md mx-auto">
              
              {/* Animated Glowing Icon */}
              <div className="w-20 h-20 bg-amber-500/5 border border-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-amber-500/80 relative shadow-inner">
                <div className="absolute inset-0 rounded-[2rem] bg-amber-500/5 animate-pulse" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                >
                  <path d="M3 21h18" />
                  <path d="M4 21V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11" />
                  <path d="m12 8-5.4-5.4A1 1 0 0 0 5.9 2H4a2 2 0 0 0-2 2v17" />
                  <path d="M14 22V15a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7" />
                </svg>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  No Churches Cataloged Yet
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                  We are currently cataloging and registering our 224 local congregations across the 6 regions. Search, filter, and sorting features are fully active. Please contact the National HQ for immediate plant details.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Link
                  href="/hq"
                  className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-200"
                >
                  Visit National HQ
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all duration-200"
                >
                  Inquire Directly
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ChurchesPage;
