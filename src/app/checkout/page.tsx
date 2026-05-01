"use client";

import { useCart } from "@/context/CartContext";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Field = "fullName" | "phone" | "instagram" | "address";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<Record<Field, string>>({
    fullName: "",
    phone: "",
    instagram: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: Field) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      router.push("/success");
    }, 1800);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <h1 className="font-serif text-3xl text-stone-800 mb-4">Nothing to checkout</h1>
        <Link href="/products" className="btn-gold px-8 py-3.5 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full px-5 py-4 rounded-2xl border border-stone-200 bg-white/50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#d4a84b]/50 focus:border-[#d4a84b] transition-all text-sm shadow-inner shadow-stone-50/50";

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] py-28 relative overflow-hidden">
      <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] bg-[#f5e6c0]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#e8e0f0]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/cart" className="text-[#d4a84b] hover:text-[#a07828] font-medium text-sm transition-colors flex items-center gap-2">
            ← Back to Cart
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl text-stone-800 mt-6">
            Secure <span className="gold-gradient-text">Checkout</span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ─── Form ─────────────────────── */}
          <div className="w-full lg:w-7/12">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Contact info */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-8 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-[#f5e6c0]/50 flex items-center justify-center text-[#d4a84b] font-medium font-serif">1</span>
                  <h2 className="font-serif text-2xl text-stone-800">Your Details</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={form.fullName}
                      onChange={handleChange("fullName")}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="(555) 123-4567"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="instagram" className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                        Instagram Handle <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="instagram"
                        required
                        value={form.instagram}
                        onChange={handleChange("instagram")}
                        placeholder="@janedoe"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Delivery address */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-8 sm:p-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-[#f5e6c0]/50 flex items-center justify-center text-[#d4a84b] font-medium font-serif">2</span>
                  <h2 className="font-serif text-2xl text-stone-800">Delivery Address</h2>
                </div>
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                    Full Shipping Address
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="123 Natural Way, Apt 4B, Irvine, CA 92612"
                    className={inputClass + " resize-none"}
                  />
                </div>
              </motion.div>

              {/* Payment info */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-[#fdfbf7] to-[#f5e6c0]/10 border border-[#d4a84b]/20 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden"
              >
                <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-[#d4a84b]/10 rounded-full blur-[30px]" />
                <div className="flex items-start gap-5 relative z-10">
                  <span className="text-4xl mt-1 drop-shadow-md">💳</span>
                  <div>
                    <h3 className="font-serif text-xl text-stone-800 mb-2">Manual Zelle Payment</h3>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">
                      We will contact you on <strong className="text-rose-500 font-medium">Instagram</strong> to confirm your order and send a Zelle payment request. Your order ships immediately once payment is received.
                    </p>
                  </div>
                </div>
              </motion.div>

              {error && <p className="text-rose-500 text-sm text-center bg-rose-50 p-3 rounded-xl border border-rose-100">{error}</p>}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-5 rounded-full text-lg font-semibold shadow-[0_8px_30px_rgba(212,168,75,0.25)] disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Complete Order →"
                )}
              </motion.button>
            </form>
          </div>

          {/* ─── Order Summary ─────────────── */}
          <div className="w-full lg:w-5/12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.03)] p-8 sm:p-10 lg:sticky lg:top-32"
            >
              <h2 className="font-serif text-2xl text-stone-800 mb-8 pb-4 border-b border-stone-100">Order Summary</h2>
              
              <ul className="divide-y divide-stone-50 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-5 py-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-[#f5f0ea] border border-stone-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-contain mix-blend-multiply drop-shadow-sm"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-stone-800 text-sm font-medium truncate mb-1">{item.name}</p>
                      <p className="text-stone-400 text-xs font-light">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-stone-800 text-sm font-medium flex-shrink-0">${item.price * item.quantity}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 bg-stone-50/50 p-6 rounded-2xl border border-stone-100/50">
                <div className="flex justify-between text-stone-500 text-sm font-light">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-700">${total}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-sm font-light">
                  <span>Shipping</span>
                  <span className="text-[#a07828] font-medium text-xs bg-[#f5e6c0]/30 px-2 py-1 rounded-md">Pending Confirmation</span>
                </div>
                <div className="flex justify-between text-stone-900 text-2xl font-serif pt-4 border-t border-stone-200 mt-2">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
