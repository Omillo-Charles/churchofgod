"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ChildrenPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/childrenImages/child1.png"
          alt="Children's Ministry"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">
            Kingdom Kids
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Nurturing Faith Early
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Building a strong foundation of biblical truth and love for the next generation in a fun, safe, and engaging environment.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 border-b border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-2">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">Our Vision</h2>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Small Hearts, Big Faith</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                At NTCOGK, we believe that children are not just the future of the church, but a vital part of it today. Our Children's Ministry is dedicated to helping every child encounter God's love through age-appropriate teaching, creative activities, and mentorship.
              </p>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Safety First</p>
                  <p className="text-xs font-bold text-white">Vetted Volunteers</p>
                </div>
                <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Engaging</p>
                  <p className="text-xs font-bold text-white">Bible-Based Fun</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group order-1 md:order-2">
              <Image
                src="/childrenImages/child2.png"
                alt="Children Community"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-[10]">
                <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] italic">
                  "Train up a child in the way he should go..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto space-y-6 mb-16">
            <div className="space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">Ministry Highlights</h2>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight">Life at Kingdom Kids</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              A glimpse into the joy, learning, and spiritual growth happening every week in our children's departments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Batch 1 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child1.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child10.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child11.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child12.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child13.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Batch 2 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child14.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child15.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child16.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Batch 3 */}
            <div className="relative aspect-[4/5] md:col-span-2 rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child17.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child18.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child19.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child2.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Batch 4 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child20.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child3.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child5.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child6.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child7.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child8.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/childrenImages/child9.png" alt="Children" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="py-24 px-6 text-center bg-black">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">Parents & Guardians</h2>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Bring Your Little Ones</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We offer age-appropriate classes every Sunday. Get in touch with our children's ministry team to learn more about registration and safety protocols.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact?dept=children" 
              className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildrenPage;
