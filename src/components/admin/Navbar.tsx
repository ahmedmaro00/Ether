"use client";

import { Bell, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('ether_admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-stone-100 fixed top-0 right-0 left-0 lg:left-72 z-40 px-6 sm:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-stone-50 border-transparent focus:bg-white focus:border-[#d4a84b] rounded-2xl py-2.5 pl-12 pr-4 text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-stone-100 mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-stone-800">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#a07828] font-bold">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f5e6c0] to-[#d4a84b] p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-stone-800 overflow-hidden">
              <User size={20} className="text-[#a07828]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
