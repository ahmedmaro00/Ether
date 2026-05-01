import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen bg-[#faf8f5] pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#f5e6c0]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#e8e0f0]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-6 block font-semibold">
            Handmade in Irvine, CA
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-800 mb-8 leading-tight">
            Our <span className="gold-gradient-text">Collection</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Every product is crafted by hand using 100% natural ingredients. Explore what&apos;s been poured with love this season.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {products.map((product, i) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block h-full">
              <div className="product-card-hover rounded-[2rem] overflow-hidden mb-6 relative aspect-[3/4] bg-gradient-to-b from-white to-[#fcfbf9] border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-10 mix-blend-multiply transition-all duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-2xl"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4a84b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* View Details Pill */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide text-stone-800 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.1)] whitespace-nowrap">
                  View Details
                </div>
              </div>
              
              <div className="px-2 text-center md:text-left">
                <h3 className="text-xl font-serif text-stone-800 mb-1 group-hover:text-[#a07828] transition-colors">
                  {product.name}
                </h3>
                <p className="text-stone-400 text-sm mb-3 font-light">{product.scent}</p>
                <p className="text-stone-800 text-lg font-medium">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Shipping reminder */}
        <div className="mt-32 relative overflow-hidden bg-stone-900 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-[#d4a84b]/20 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-serif text-3xl text-stone-50 mb-3">Fast & Local Delivery</h3>
            <p className="text-stone-400 text-base font-light">1–2 day delivery directly from our Irvine, CA studio. <br className="hidden md:block" />Easy returns and full refunds available.</p>
          </div>
          
          <Link
            href="/policy"
            className="relative z-10 border border-stone-600 bg-stone-800/50 text-stone-200 px-8 py-4 rounded-full font-medium hover:bg-stone-50 hover:text-stone-900 transition-all duration-300 whitespace-nowrap"
          >
            Read Shipping Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
