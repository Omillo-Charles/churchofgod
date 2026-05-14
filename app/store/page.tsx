"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const products: any[] = [];

const categories = ["All", "Spiritual Resources", "Apparel", "Merchandise"];

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="/contactImages/contact1.png"
          alt="NTCOGK Store"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">
            Equipping the Saints
          </h2>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            Church Store
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-medium text-[10px] md:text-xs leading-relaxed">
            Spiritual resources, church merchandise, and multimedia materials to support your growth and our mission.
          </p>
        </div>
      </section>

      {/* 2. Category Navigation */}
      <section className="sticky top-16 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-6">
          <div className="flex justify-center md:justify-center items-center gap-8 py-6 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 ${
                  activeCategory === cat ? "text-amber-500" : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Grid */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-zinc-900/30 rounded-[2.5rem] border border-zinc-800 overflow-hidden hover:border-amber-500/20 transition-all duration-500 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
                        Ksh {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-8 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{product.category}</p>
                      <h3 className="text-lg font-black text-white uppercase leading-tight group-hover:text-amber-500 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-medium flex-1">
                      {product.desc}
                    </p>

                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-lg active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center space-y-6 bg-zinc-900/30 rounded-[3rem] border border-dashed border-zinc-800">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2"/><path d="M12 12v10"/><path d="M16 16l-4-4-4 4"/></svg>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">No Products Available</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">We are currently updating our inventory. Please check back soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. Cart Sidebar (Overlay) */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-black shadow-2xl transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="h-full flex flex-col p-8 md:p-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-xs font-bold text-white uppercase">{item.name}</h4>
                      <p className="text-[10px] text-amber-500 font-black">Ksh {item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Your cart is empty</p>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-zinc-900 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total</span>
                <span className="text-xl font-black text-white uppercase">Ksh {cartTotal.toLocaleString()}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full py-5 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:hover:scale-100"
              >
                Proceed to Checkout
              </button>
              <p className="text-[9px] text-zinc-400 text-center uppercase tracking-tighter">
                Payments are processed securely via M-Pesa or Bank Transfer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button (when closed) */}
      {!isCartOpen && cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-amber-500 text-white rounded-full shadow-2xl shadow-amber-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-white text-amber-500 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-amber-500">
              {cart.length}
            </span>
          </div>
        </button>
      )}

      {/* 5. Newsletter Section */}
      <section className="py-20 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Get Updates</h3>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">New Arrivals in <span className="text-amber-500">Store</span></h2>
            <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
              Subscribe to get notified about new spiritual books, church merchandise, and special convention offers.
            </p>
          </div>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <button className="px-8 py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;
