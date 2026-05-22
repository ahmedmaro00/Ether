"use client";

import { Settings, Shield, Bell, CreditCard, Globe, Mail, ChevronRight, LogOut, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const sections = [
    { title: 'General Preferences', icon: Settings, desc: 'Update your store name, logo, and base localization settings.' },
    { title: 'Security & Access', icon: Shield, desc: 'Manage passwords, two-factor authentication, and login sessions.' },
    { title: 'Notification Rules', icon: Bell, desc: 'Configure which alerts you want to receive via email or dashboard.' },
    { title: 'Payment Gateways', icon: CreditCard, desc: 'Set up Zelle payment details and checkout instructions.' },
    { title: 'Store Appearance', icon: Globe, desc: 'Customize the dashboard theme, colors, and global typography.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-4xl text-stone-800 mb-3">Portal <span className="gold-gradient-text">Settings</span></h1>
        <p className="text-stone-500 text-sm max-w-xl leading-relaxed">Configure your administrative workspace, security preferences, and store-wide settings to ensure a seamless operation.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f5e6c0]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
          <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f5e6c0] to-[#d4a84b] p-1 shadow-lg shadow-yellow-900/10">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#a07828] font-bold text-4xl overflow-hidden">
                  A
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center border-2 border-white hover:bg-stone-800 transition-colors shadow-md">
                <Settings size={14} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-3xl text-stone-800 mb-2">Administrator</h2>
              <p className="text-stone-500 text-sm mb-6 flex items-center justify-center md:justify-start gap-2">
                <Mail size={14} className="text-stone-400" /> admin@ether.com
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button 
                  onClick={() => alert('Profile editing coming soon')}
                  className="bg-stone-900 text-white px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 hover:shadow-stone-900/20"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => alert('Password change coming soon')}
                  className="bg-stone-50 text-stone-600 border border-stone-100 px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all flex items-center gap-2"
                >
                  <KeyRound size={14} /> Change Password
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
              onClick={() => alert(`Configuration for ${section.title} coming soon`)}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-6 group hover:shadow-[0_20px_60px_rgba(212,168,75,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-start gap-5 relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-gradient-to-br group-hover:from-[#f5e6c0] group-hover:to-[#d4a84b] group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-md shrink-0">
                <section.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="font-serif text-lg text-stone-800 mb-1 group-hover:text-[#a07828] transition-colors">{section.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{section.desc}</p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 group-hover:text-[#d4a84b] group-hover:translate-x-1 transition-all">
                <ChevronRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Danger Zone */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-red-50 to-rose-50/30 border border-red-100 rounded-[2.5rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 text-center sm:text-left">
            <h3 className="text-red-700 font-bold text-sm uppercase tracking-widest mb-2 flex items-center justify-center sm:justify-start gap-2">
              <Shield size={16} /> Danger Zone
            </h3>
            <p className="text-red-500/80 text-sm max-w-md">Permanently delete your admin account, all associated data, and remove access to this portal.</p>
          </div>
          <button 
            onClick={() => alert('Account deletion is restricted for this demo')}
            className="relative z-10 bg-white text-red-600 border border-red-100 px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-200/50 flex items-center gap-2"
          >
            <LogOut size={16} /> Delete Account
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
