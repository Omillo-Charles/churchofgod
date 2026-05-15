"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";

type Category = "All" | "Youth" | "Children" | "Clergy" | "Church Life";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  span?: "wide" | "tall" | "normal";
}

const allImages: GalleryImage[] = [
  // Church Life
  { src: "/heroImages/hero1.png", alt: "Church gathering", category: "Church Life", span: "wide" },
  { src: "/heroImages/hero2.png", alt: "Church service", category: "Church Life" },
  { src: "/heroImages/hero3.png", alt: "Church community", category: "Church Life", span: "tall" },
  { src: "/heroImages/hero4.png", alt: "Church event", category: "Church Life" },
  { src: "/heroImages/hero5.png", alt: "Church worship", category: "Church Life" },
  { src: "/heroImages/hero6.png", alt: "Church fellowship", category: "Church Life", span: "wide" },
  { src: "/heroImages/hero7.png", alt: "Church ministry", category: "Church Life" },
  { src: "/heroImages/hero8.png", alt: "Church prayer", category: "Church Life", span: "tall" },
  { src: "/heroImages/hero9.png", alt: "Church life", category: "Church Life" },
  { src: "/heroImages/hero10.png", alt: "Church community", category: "Church Life" },
  { src: "/heroImages/hero11.png", alt: "Church gathering", category: "Church Life", span: "wide" },
  { src: "/aboutImages/about1.png", alt: "About NTCOGK", category: "Church Life" },
  { src: "/aboutImages/about2.png", alt: "About the church", category: "Church Life", span: "tall" },
  { src: "/contactImages/contact1.png", alt: "Church contact", category: "Church Life" },

  // Youth
  { src: "/youthImages/youth1.png", alt: "Youth ministry", category: "Youth", span: "wide" },
  { src: "/youthImages/youth2.png", alt: "Youth worship", category: "Youth", span: "tall" },
  { src: "/youthImages/youth3.png", alt: "Youth gathering", category: "Youth" },
  { src: "/youthImages/youth4.png", alt: "Youth community", category: "Youth" },
  { src: "/youthImages/youth5.png", alt: "Youth fellowship", category: "Youth", span: "wide" },
  { src: "/youthImages/youth6.png", alt: "Youth event", category: "Youth" },
  { src: "/youthImages/youth7.png", alt: "Youth prayer", category: "Youth", span: "tall" },
  { src: "/youthImages/youth8.png", alt: "Youth life", category: "Youth" },
  { src: "/youthImages/youth10.jpg", alt: "Youth ministry", category: "Youth" },
  { src: "/youthImages/youth11.jpg", alt: "Youth service", category: "Youth", span: "wide" },
  { src: "/youthImages/youth12.jpg", alt: "Youth gathering", category: "Youth" },
  { src: "/youthImages/youth13.jpg", alt: "Youth community", category: "Youth", span: "tall" },
  { src: "/youthImages/youth14.jpg", alt: "Youth fellowship", category: "Youth" },
  { src: "/youthImages/youth15.jpg", alt: "Youth ministry", category: "Youth", span: "wide" },
  { src: "/youthImages/youth16.jpg", alt: "Youth service", category: "Youth" },
  { src: "/youthImages/youth17.jpg", alt: "Youth worship", category: "Youth", span: "tall" },
  { src: "/youthImages/youth18.jpg", alt: "Youth fellowship", category: "Youth" },
  { src: "/youthImages/youth19.jpg", alt: "Youth community", category: "Youth" },
  { src: "/youthImages/youth20.jpg", alt: "Youth gathering", category: "Youth", span: "wide" },
  { src: "/youthImages/youth21.jpg", alt: "Youth prayer", category: "Youth" },
  { src: "/youthImages/youth22.jpg", alt: "Youth ministry", category: "Youth", span: "tall" },
  { src: "/youthImages/youth23.jpg", alt: "Youth life", category: "Youth" },
  { src: "/youthImages/youth24.jpg", alt: "Youth service", category: "Youth" },
  { src: "/youthImages/youth25.jpg", alt: "Youth worship", category: "Youth", span: "wide" },
  { src: "/youthImages/youth26.jpg", alt: "Youth community", category: "Youth" },
  { src: "/youthImages/youth27.jpg", alt: "Youth fellowship", category: "Youth", span: "tall" },
  { src: "/youthImages/youth28.jpg", alt: "Youth ministry", category: "Youth" },
  { src: "/youthImages/youth29.jpg", alt: "Youth gathering", category: "Youth" },
  { src: "/youthImages/youth30.jpg", alt: "Youth ministry", category: "Youth", span: "tall" },
  { src: "/youthImages/youth31.jpg", alt: "Youth fellowship", category: "Youth" },
  { src: "/youthImages/youth32.jpg", alt: "Youth service", category: "Youth" },
  { src: "/youthImages/youth33.jpg", alt: "Youth community", category: "Youth", span: "wide" },

  // Children
  { src: "/childrenImages/child1.png", alt: "Children ministry", category: "Children", span: "wide" },
  { src: "/childrenImages/child2.png", alt: "Children worship", category: "Children", span: "tall" },
  { src: "/childrenImages/child3.png", alt: "Children gathering", category: "Children" },
  { src: "/childrenImages/child5.png", alt: "Children community", category: "Children" },
  { src: "/childrenImages/child6.png", alt: "Children fellowship", category: "Children", span: "wide" },
  { src: "/childrenImages/child7.png", alt: "Children event", category: "Children" },
  { src: "/childrenImages/child8.png", alt: "Children prayer", category: "Children", span: "tall" },
  { src: "/childrenImages/child9.png", alt: "Children life", category: "Children" },
  { src: "/childrenImages/child10.png", alt: "Children ministry", category: "Children" },
  { src: "/childrenImages/child11.png", alt: "Children service", category: "Children", span: "wide" },
  { src: "/childrenImages/child12.png", alt: "Children gathering", category: "Children" },
  { src: "/childrenImages/child13.png", alt: "Children community", category: "Children", span: "tall" },
  { src: "/childrenImages/child14.png", alt: "Children fellowship", category: "Children" },
  { src: "/childrenImages/child15.png", alt: "Children event", category: "Children" },
  { src: "/childrenImages/child16.png", alt: "Children prayer", category: "Children", span: "wide" },
  { src: "/childrenImages/child17.png", alt: "Children life", category: "Children" },
  { src: "/childrenImages/child18.png", alt: "Children ministry", category: "Children", span: "tall" },
  { src: "/childrenImages/child19.png", alt: "Children service", category: "Children" },
  { src: "/childrenImages/child20.png", alt: "Children gathering", category: "Children" },

  // Clergy
  { src: "/clergyImages/clergy1.png", alt: "Clergy ministry", category: "Clergy", span: "wide" },
  { src: "/clergyImages/clergy2.png", alt: "Clergy worship", category: "Clergy" },
  { src: "/clergyImages/clergy3.png", alt: "Clergy gathering", category: "Clergy", span: "tall" },
  { src: "/clergyImages/clergy4.png", alt: "Clergy community", category: "Clergy" },
  { src: "/clergyImages/clergy5.png", alt: "Clergy fellowship", category: "Clergy" },
  { src: "/clergyImages/clergy6.png", alt: "Clergy event", category: "Clergy", span: "wide" },
  { src: "/clergyImages/clergy7.png", alt: "Clergy prayer", category: "Clergy" },
  { src: "/clergyImages/clergy8.png", alt: "Clergy life", category: "Clergy", span: "tall" },
  { src: "/clergyImages/clergy9.png", alt: "Clergy ministry", category: "Clergy" },
  { src: "/clergyImages/clergy10.png", alt: "Clergy service", category: "Clergy" },
  { src: "/clergyImages/clergy11.png", alt: "Clergy gathering", category: "Clergy", span: "wide" },
  { src: "/clergyImages/clergy12.png", alt: "Clergy community", category: "Clergy" },
  { src: "/clergyImages/clergy13.png", alt: "Clergy fellowship", category: "Clergy", span: "tall" },
  { src: "/clergyImages/clergy14.png", alt: "Clergy event", category: "Clergy" },
  { src: "/clergyImages/clergy15.png", alt: "Clergy prayer", category: "Clergy" },
  { src: "/clergyImages/clergy16.png", alt: "Clergy life", category: "Clergy", span: "wide" },
  { src: "/clergyImages/clergy17.png", alt: "Clergy ministry", category: "Clergy" },
  { src: "/clergyImages/clergy18.png", alt: "Clergy service", category: "Clergy", span: "tall" },
  { src: "/clergyImages/clergy19.png", alt: "Clergy gathering", category: "Clergy" },
  { src: "/clergyImages/clergy20.png", alt: "Clergy community", category: "Clergy" },
];

const categories: Category[] = ["All", "Church Life", "Youth", "Children", "Clergy"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return allImages;
    return allImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/clergyImages/clergy1.png"
          alt="NTCOGK Gallery"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Our Memories
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Photo Gallery
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            A visual journey through our community, ministries, and the moments that define our shared faith.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-5 overflow-x-auto no-scrollbar gap-6">
            <div className="flex items-center gap-6 whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-1.5 ${
                    activeCategory === cat
                      ? "text-amber-500"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap shrink-0">
              {filteredImages.length} photos
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                onClick={() => openLightbox(index)}
                className={`relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group break-inside-avoid mb-3 md:mb-4 ${
                  image.span === "wide" ? "aspect-video" :
                  image.span === "tall" ? "aspect-[3/4]" :
                  "aspect-square"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-amber-400 border border-amber-500/20">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && currentImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 z-10 p-3 md:p-4 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-auto px-16 md:px-24 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 z-10 p-3 md:p-4 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">{currentImage.category}</p>
            <p className="text-xs text-zinc-500 font-medium">{currentImage.alt}</p>
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">ESC to close · ← → to navigate</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
