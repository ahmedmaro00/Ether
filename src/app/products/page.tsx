"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['public-products'],
    queryFn: async () => {
      const res = await api.get('/product');
      return res.data.data.products;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: async () => {
      const res = await api.get('/category');
      return res.data.data;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products?.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category?._id === selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
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

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone-200 focus:border-[#d4a84b] rounded-full py-3 pl-12 pr-6 text-stone-800 text-sm outline-none transition-all shadow-sm"
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-stone-200 focus:border-[#d4a84b] rounded-full py-3 pl-12 pr-10 text-stone-800 text-sm outline-none transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories?.map((cat: any) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#d4a84b]" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts?.map((product: any, i: number) => (
              <Link key={product._id} href={`/products/${product._id}`} className="group block h-full">
                <div className="product-card-hover rounded-[2rem] overflow-hidden mb-6 relative aspect-[3/4] bg-gradient-to-b from-white to-[#fcfbf9] border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  
                  {/* Product Image */}
                  <div className="relative w-full h-full p-10">
                    <img
                      src={product.images?.[0] || "https://placehold.co/600x800/f5e6c0/a07828?text=No+Image"}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply transition-all duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-2xl"
                    />
                  </div>

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
                  <p className="text-stone-400 text-sm mb-3 font-light">{product.category?.name || "Uncategorized"}</p>
                  <p className="text-stone-800 text-lg font-medium">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

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
