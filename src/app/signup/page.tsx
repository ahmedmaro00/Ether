"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[60%] bg-[#d4a84b]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[60%] bg-[#a07828]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="font-serif text-3xl gold-gradient-text">Pure Earth.</span>
          </motion.div>
          <h1 className="text-3xl font-serif text-stone-900 mb-2">Create Account</h1>
          <p className="text-stone-500 font-light">Join us and start your journey today</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#d4a84b] transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-2xl focus:ring-2 focus:ring-[#d4a84b]/20 focus:border-[#d4a84b] block w-full pl-11 p-4 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#d4a84b] transition-colors">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-2xl focus:ring-2 focus:ring-[#d4a84b]/20 focus:border-[#d4a84b] block w-full pl-11 p-4 transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#d4a84b] transition-colors">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-2xl focus:ring-2 focus:ring-[#d4a84b]/20 focus:border-[#d4a84b] block w-full pl-11 pr-11 p-4 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                </button>
              </div>
              <p className="mt-2 ml-1 text-[10px] text-stone-400 uppercase tracking-wider font-medium">
                Must be at least 8 characters
              </p>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-2 group hover:bg-[#a07828] transition-all duration-500 shadow-lg shadow-stone-900/10 mt-2 disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Account"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-stone-100 text-center">
            <p className="text-stone-500 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#a07828] font-semibold hover:text-[#d4a84b] transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-stone-400 font-light max-w-xs mx-auto">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-stone-600">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-stone-600">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
