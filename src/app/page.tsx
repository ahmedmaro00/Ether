"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import HeroAnimation from "@/components/HeroAnimation";
import { Product } from "@/context/CartContext";

// إعدادات الحركة (Variants)
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};


function ProductActionButtons({ product }: { product: Product }) {
    const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 w-max opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 z-20">
      {/* زر التفاصيل */}
      <button className="bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-800 hover:bg-white transition-colors shadow-sm whitespace-nowrap">
        View Details
      </button>

      {/* زر إضافة للسلة */}
      <button
        onClick={handleAdd}
        disabled={added}
        className={`backdrop-blur px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm whitespace-nowrap flex items-center gap-2 ${
          added ? "bg-emerald-500 text-white" : "bg-stone-800/90 text-white hover:bg-stone-900"
        }`}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.div
              key="added"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-1"
            >
              <Check size={12} strokeWidth={3} /> Added
            </motion.div>
          ) : (
            <motion.div
              key="add"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-1"
            >
              <ShoppingBag size={12} strokeWidth={2.5} /> Add To Cart
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

// ─── المكون الرئيسي للصفحة ──────────────────────────
export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div className="flex flex-col bg-[#faf8f5]">
      {/* Hero Section */}
      <HeroAnimation />

      {/* Philosophy Section */}
      <section className="py-32 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/photos/metallic-texture-close-up-detail.jpg')" }}>
        <div className="absolute inset-0 bg-white/40  " />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5e6c0]/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}>
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#a07828] mb-8 block font-bold drop-shadow-sm">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-6xl text-stone-900 mb-10 leading-tight drop-shadow-xl font-bold">Crafted with intention,<br />infused with nature.</h2>
            <p className="text-stone-900 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
              Every bar of soap and every candle we pour is a small ritual — an invitation to slow down. Made in Irvine, California with 100% natural ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#a07828] mb-4 block font-bold">Collection</span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-bold">Featured Creations</h2>
            </div>
            <Link href="/products" className="group hidden md:flex items-center gap-3 text-sm md:text-base font-semibold tracking-wide text-stone-800 hover:text-[#d4a84b]">
              <span>View all products</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <Link href={`/products/${product.id}`} className="group block h-full">
                  <div className="product-card-hover rounded-[2rem] overflow-hidden mb-6 relative aspect-[3/4] bg-gradient-to-b from-[#fdfbf7] to-[#f5f0ea] border border-stone-100">
                    <Image
                      src={product.image} alt={product.name} fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* استخدام مكون الأزرار المصمم بالأعلى */}
                    <ProductActionButtons product={product} />
                  </div>

                  <div className="px-2 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-bold mb-1 group-hover:text-[#a07828] transition-colors">{product.name}</h3>
                    <p className="text-stone-500 text-sm md:text-base mb-3 font-medium">{product.scent}</p>
                    <p className="text-stone-900 text-lg md:text-xl font-bold">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 relative bg-[#1c1917] text-stone-50 overflow-hidden"  style={{ backgroundImage: "url('/photos/colourful-pink-painted-water.jpg')" }}>
        <div className="absolute inset-0 bg-black/20 " />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#d4a84b]/20 blur-[100px] rounded-[100%]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 text-center">
            {[
              { icon: "🌿", title: "100% Natural", desc: "No synthetic fragrances, no parabens. Just pure botanicals." },
              { icon: "✨", title: "Hand-Poured", desc: "Made in small batches in our Irvine studio." },
              { icon: "🤍", title: "Local Love", desc: "Fast 1–2 day delivery directly to your door." },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-lg">{v.icon}</div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#f5e6c0] font-bold tracking-wide">{v.title}</h3>
                <p className="text-stone-300 text-sm md:text-base font-medium max-w-xs">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-32 bg-[#faf8f5] text-center">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant}>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 font-bold">Join our <span className="italic text-[#d4a84b]">slow living</span> community.</h2>
          <p className="text-stone-600 mb-10 text-lg md:text-xl max-w-lg mx-auto font-medium">Follow along on Instagram for behind-the-scenes pours.</p>
          <a href="https://www.instagram.com/etheratelier2026?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full shadow-md hover:shadow-xl transition-all border border-stone-200 font-bold text-lg">
            <span className="text-[#d4a84b]">@</span> etheratelier2026 <span>→</span>
          </a>
        </motion.div>
      </section>
    </div>
  );
}