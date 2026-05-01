"use client";

import HeroAnimation from "@/components/HeroAnimation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['public-products', 'featured'],
    queryFn: async () => {
      const res = await api.get('/product');
      return res.data.data.products;
    }
  });

  const featured = products?.slice(0, 3) || [];

  return (
    <div className="flex flex-col bg-[#faf8f5]">
      {/* ─── Hero ─────────────────────────────── */}
      <HeroAnimation />

      {/* ─── Philosophy Band ──────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Soft decorative background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5e6c0]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
         
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-8 block font-semibold">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-stone-800 mb-10 leading-tight">
              Crafted with intention,<br />infused with nature.
            </h2>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Every bar of soap and every candle we pour is a small ritual — an invitation to slow down. Made in Irvine, California with 100% natural ingredients, zero synthetics, and a whole lot of love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Products ─────────────────── */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-4 block font-semibold">
                Collection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-800">
                Featured Creations
              </h2>
            </div>
            <Link
              href="/products"
              className="group hidden md:flex items-center gap-3 text-sm font-medium tracking-wide text-stone-600 hover:text-[#d4a84b] transition-colors"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">View all products</span>
                <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#d4a84b]">View all products</span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#d4a84b]" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {featured.map((product: any, i: number) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/products/${product._id}`} className="group block h-full">
                    <div className="product-card-hover rounded-[2rem] overflow-hidden mb-6 relative aspect-[3/4] bg-gradient-to-b from-[#fdfbf7] to-[#f5f0ea] border border-stone-100">
                      <div className="relative w-full h-full p-10">
                        <img
                          src={product.images?.[0] || "https://placehold.co/600x800/f5e6c0/a07828?text=No+Image"}
                          alt={product.name}
                          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-xl"
                        />
                      </div>
                      
                      {/* Hover overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Quick view button hint */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full text-xs font-medium tracking-wide text-stone-800 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-sm">
                        View Details
                      </div>
                    </div>
                    
                    <div className="px-2 text-center md:text-left">
                      <h3 className="text-xl font-serif text-stone-800 mb-1 group-hover:text-[#a07828] transition-colors">{product.name}</h3>
                      <p className="text-stone-400 text-sm mb-3 font-light">{product.category?.name || "Uncategorized"}</p>
                      <p className="text-stone-800 text-lg font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex md:hidden justify-center mt-12">
            <Link
              href="/products"
              className="btn-gold px-10 py-4 rounded-full text-sm font-medium shadow-md"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Values Band ──────────────────────── */}
      <section className="py-28 relative bg-[#1c1917] text-stone-50 overflow-hidden">
        {/* Subtle gold glow inside dark section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#d4a84b]/10 blur-[100px] rounded-[100%]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 text-center">
            {[
              { icon: "🌿", title: "100% Natural", desc: "No synthetic fragrances, no parabens. Just pure botanicals, clays, and essential oils." },
              { icon: "✨", title: "Hand-Poured", desc: "Each product is made in small batches in our Irvine studio for maximum care and quality." },
              { icon: "🤍", title: "Local Love", desc: "Fast 1–2 day delivery directly to your door in Orange County. Seamless Zelle payments." },
            ].map((v, i) => (
              <motion.div 
                key={v.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="flex flex-col items-center gap-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(212,168,75,0.05)]">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-medium font-serif text-[#f5e6c0]">{v.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xs">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Instagram CTA ────────────────────── */}
      <section className="py-32 bg-[#faf8f5] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">
              Join our <span className="italic text-[#d4a84b]">slow living</span> community.
            </h2>
            <p className="text-stone-500 mb-10 text-lg max-w-lg mx-auto font-light leading-relaxed">
              Behind-the-scenes of every pour, every scent, and every sunrise batch. Follow along on Instagram.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-stone-800 px-10 py-5 rounded-full font-medium shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(212,168,75,0.15)] hover:-translate-y-1 transition-all duration-500 border border-stone-100 group"
            >
              <span className="text-rose-500">@</span> pureearth.co
              <span className="group-hover:translate-x-1 transition-transform text-stone-400">→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
