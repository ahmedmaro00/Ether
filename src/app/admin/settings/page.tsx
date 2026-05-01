"use client";

import { Settings, Shield, Bell, CreditCard, Globe, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const sections = [
    { title: 'General', icon: Settings, desc: 'Update your store name, logo and basic information.' },
    { title: 'Security', icon: Shield, desc: 'Manage passwords, two-factor authentication and login sessions.' },
    { title: 'Notifications', icon: Bell, desc: 'Configure which alerts you want to receive via email or dashboard.' },
    { title: 'Payments', icon: CreditCard, desc: 'Set up Zelle payment details and checkout instructions.' },
    { title: 'Appearance', icon: Globe, desc: 'Customize the dashboard theme, colors and language.' },
  ];

  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <div>
        <h1 className="font-serif text-4xl text-stone-800 mb-2">Portal <span className="gold-gradient-text">Settings</span></h1>
        <p className="text-stone-500 text-sm">Configure your administrative workspace and store-wide preferences.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-stone-50">
        <div className="p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f5e6c0] to-[#d4a84b] p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#a07828] font-bold text-3xl">
              A
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl text-stone-800 mb-1">Admin Profile</h2>
            <p className="text-stone-400 text-sm mb-6">Your personal account settings and preferences.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">Edit Profile</button>
              <button className="bg-stone-50 text-stone-600 border border-stone-100 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all">Change Password</button>
            </div>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, i) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-stone-50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#f5e6c0]/40 group-hover:text-[#a07828] transition-all">
                <section.icon size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 group-hover:text-[#a07828] transition-colors">{section.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mt-1">{section.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 flex items-center justify-between">
        <div>
          <h3 className="text-red-700 font-bold text-sm uppercase tracking-widest mb-1">Danger Zone</h3>
          <p className="text-red-500/70 text-xs">Permanently delete your admin account and all associated data.</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
          Delete Account
        </button>
      </div>
    </div>
  );
}
