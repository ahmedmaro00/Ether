"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useState, useEffect } from 'react';
import { User, Mail, Save, Loader2 } from 'lucide-react';


export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem('ether_token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const res = await api.get('/user/profile');
      return res.data.data;
    },
    retry: false
  });

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: (newName: string) => api.patch('/user/profile', { name: newName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('ether_token');
    localStorage.removeItem('ether_user');
    localStorage.removeItem("ether_admin_token");
    localStorage.removeItem("ether_admin_user");
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <Loader2 className="animate-spin text-[#d4a84b]" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <h1 className="font-serif text-4xl text-stone-800 mb-8">Your Profile</h1>

        <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#d4a84b] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-2xl focus:ring-2 focus:ring-[#d4a84b]/20 focus:border-[#d4a84b] pl-11 p-4 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2 ml-1">
                Email Address (Cannot be changed)
              </label>
              <div className="relative group opacity-60">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  disabled
                  value={profile?.email || ''}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-2xl pl-11 p-4 cursor-not-allowed"
                />
              </div>
            </div>

            {successMsg && <p className="text-emerald-500 text-sm">{successMsg}</p>}

            <div className="flex gap-4 pt-4 border-t border-stone-100 mt-6">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-stone-900 text-white font-medium py-3 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-[#a07828]"
              >
                {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Save Changes
              </button>
              
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-red-50 text-red-600 font-medium py-3 rounded-2xl transition-all hover:bg-red-100"
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
