"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const YouthPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/youthImages/youth2.png"
          alt="Youth Ministry"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            The Next Generation
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Igniting The Future
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Empowering youth to live out their faith with passion, purpose, and impact in a modern world.
          </p>
        </div>
      </section>

      {/* Core Values / Mission */}
      <section className="py-24 px-6 border-b border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Our Mission</h2>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Rising to the Call of Destiny</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The Youth Ministry at NTCOGK is a vibrant community of young people committed to spiritual growth, authentic worship, and social transformation. We believe in providing a safe space where every young person can discover their God-given identity.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-2xl font-black text-white">3000+</span>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Youth</p>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-black text-white">6+</span>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Regions</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src="/youthImages/youth24.jpg"
                alt="Youth Community"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[2]" />
              <div className="absolute bottom-8 left-8 right-8 z-[10]">
                <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] italic">
                  "Let no one despise your youth..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery / Life at Youth */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto space-y-6 mb-16">
            <div className="space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Community Life</h2>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight">Moments in the Movement</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Capturing the energy, passion, and genuine connection within our youth community across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth3.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth4.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth10.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth11.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 2 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth5.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth12.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 3 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth6.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[4/5] md:col-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth13.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth14.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 4 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth7.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[4/3] md:col-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth15.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth8.png" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 5 - New Images */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth16.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth17.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth18.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth19.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 6 */}
            <div className="relative aspect-[16/9] md:col-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth20.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth21.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth22.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 7 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth23.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth24.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth25.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth26.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>

            {/* Row 8 */}
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth27.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth28.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth29.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-[3/4] md:row-span-2 rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth30.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth31.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth32.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden group">
              <Image src="/youthImages/youth33.jpg" alt="Youth" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 text-center bg-black">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Connect With Us</h2>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Your Journey Starts Here</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Ready to find your place in our community? Reach out to our youth leadership team and get involved in our next gathering.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?dept=youth"
              className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-500 hover:text-white transition-all"
            >
              Get In Touch
            </Link>
            <a
              href="https://facebook.com/ntcogkenyayouth"
              className="w-full md:w-auto px-10 py-4 border border-zinc-800 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-zinc-900 transition-all"
            >
              Follow @ntcogkkenyayouth
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YouthPage;
