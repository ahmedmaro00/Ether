"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data.data;

      if (user.role !== 'admin') {
        setError('Unauthorized: Admin access only.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('ether_admin_token', token);
      localStorage.setItem('ether_admin_user', JSON.stringify(user));
      
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#f5e6c0]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#d4a84b]/10 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a84b] to-[#a07828] flex items-center justify-center text-white font-serif font-bold text-3xl shadow-xl shadow-yellow-500/20 mx-auto mb-6">
            E
          </div>
          <h1 className="font-serif text-3xl text-stone-800 mb-2">Welcome Back</h1>
          <p className="text-stone-500 text-sm">Ether Admin Portal Access</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input
                {...register('email')}
                type="email"
                placeholder="admin@ether.com"
                className="w-full bg-stone-50 border-stone-100 focus:bg-white focus:border-[#d4a84b] focus:ring-0 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-red-500 ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full bg-stone-50 border-stone-100 focus:bg-white focus:border-[#d4a84b] focus:ring-0 rounded-2xl py-3.5 pl-12 pr-4 text-sm transition-all outline-none"
              />
            </div>
            {errors.password && <p className="mt-1.5 text-xs text-red-500 ml-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-2xl py-4 font-semibold text-sm transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In to Dashboard
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-stone-400 text-xs">
            Not an administrator? <a href="/" className="text-[#a07828] font-semibold hover:underline">Return to Store</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
