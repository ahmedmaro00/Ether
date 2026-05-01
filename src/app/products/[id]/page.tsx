import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] pt-28 pb-20 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-[#f5e6c0]/40 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8 relative z-10">
        <nav className="text-xs tracking-widest uppercase font-medium text-stone-400 flex items-center gap-3">
          <Link href="/" className="hover:text-[#d4a84b] transition-colors">Home</Link>
          <span className="text-stone-300">/</span>
          <Link href="/products" className="hover:text-[#d4a84b] transition-colors">Shop</Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">

          {/* Image Gallery area */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
            <div className="rounded-[3rem] aspect-[4/5] relative overflow-hidden bg-gradient-to-b from-white to-[#f5f0ea] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex items-center justify-center group">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                priority
                className="object-contain w-[85%] h-[85%] mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-transform duration-[1.5s] group-hover:scale-105"
              />
              {/* Soft glow behind product */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,75,0.08) 0%, transparent 60%)" }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 py-4 lg:py-10">
            <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-4 block font-semibold">
              Handmade · Natural
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-stone-500 mb-8 text-lg font-light tracking-wide">{product.scent}</p>
            
            <p className="text-4xl text-stone-900 font-medium mb-10">${product.price}</p>

            <div className="w-full h-px bg-gradient-to-r from-stone-200 to-transparent mb-10" />

            <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-12 font-light">
              {product.description}
            </p>

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { label: "Ingredients", value: "100% Natural", icon: "🌿" },
                { label: "Crafted in", value: "Irvine, CA", icon: "✨" },
                { label: "Delivery", value: "1–2 Days", icon: "📦" },
                { label: "Payment", value: "Via Zelle", icon: "💳" },
              ].map((attr) => (
                <div key={attr.label} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm flex items-start gap-3">
                  <span className="text-xl mt-0.5 opacity-80">{attr.icon}</span>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">{attr.label}</p>
                    <p className="text-stone-800 font-medium text-sm">{attr.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-100">
              <AddToCartButton product={product} />
            </div>

            {/* Order note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-stone-500 bg-[#f5e6c0]/30 py-3 px-4 rounded-xl border border-[#d4a84b]/20">
              <span className="w-2 h-2 rounded-full bg-[#d4a84b] animate-pulse" />
              Payment securely via Zelle after Instagram confirmation.
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-32 pt-20 border-t border-stone-200/60 relative">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-4xl text-stone-800">You Might Also Love</h2>
              <Link href="/products" className="text-sm font-medium text-[#d4a84b] hover:text-[#a07828] transition-colors hidden sm:block">
                View all products →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="product-card-hover rounded-[2rem] aspect-[3/4] relative overflow-hidden mb-5 bg-white border border-stone-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="33vw"
                      className="object-contain p-8 mix-blend-multiply transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-stone-800 group-hover:text-[#a07828] transition-colors">{p.name}</h3>
                  <p className="text-stone-400 text-sm font-light mt-1">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
