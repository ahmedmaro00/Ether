"use client";

import Link from "next/link";
import { Package, ShoppingCart, Users, DollarSign, Tag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Revenue", value: "$12,400", icon: DollarSign, trend: "+14%" },
    { name: "Total Orders", value: "156", icon: ShoppingCart, trend: "+8%" },
    { name: "Total Products", value: "24", icon: Package, trend: "+2%" },
    { name: "Total Customers", value: "1,204", icon: Users, trend: "+12%" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-3 block font-semibold">
              Admin Portal
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800">
              Dashboard <span className="gold-gradient-text">Overview</span>
            </h1>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/" className="btn-gold px-6 py-3 rounded-full text-sm font-medium shadow-md">
              View Storefront
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#f5e6c0]/40 flex items-center justify-center text-[#d4a84b]">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span className="text-emerald-500 text-sm font-medium bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <TrendingUp size={14} />
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-stone-500 text-sm font-medium mb-1">{stat.name}</h3>
                <p className="text-3xl font-serif text-stone-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-1 md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8">
            <h2 className="font-serif text-2xl text-stone-800 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: "ORD-1049", customer: "Jane Doe", total: "$84.00", status: "Pending Zelle", date: "Today" },
                { id: "ORD-1048", customer: "John Smith", total: "$120.00", status: "Paid", date: "Yesterday" },
                { id: "ORD-1047", customer: "Emily Clark", total: "$45.00", status: "Shipped", date: "Yesterday" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100 cursor-pointer">
                  <div>
                    <p className="font-medium text-stone-800">{order.customer}</p>
                    <p className="text-stone-400 text-xs">{order.id} · {order.date}</p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <p className="text-stone-800 font-medium">{order.total}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                      order.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-b from-stone-900 to-stone-800 rounded-[2rem] p-8 text-stone-50 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] bg-[#d4a84b]/20 rounded-full blur-[40px]" />
            <h2 className="font-serif text-2xl mb-8 relative z-10">Quick Actions</h2>
            <div className="space-y-3 relative z-10">
              {[
                { label: "Manage Products", icon: Package },
                { label: "Manage Categories", icon: Tag },
                { label: "View All Orders", icon: ShoppingCart },
                { label: "Revenue Analytics", icon: TrendingUp },
              ].map((action) => (
                <button key={action.label} className="w-full bg-white/10 hover:bg-white/20 border border-white/5 p-4 rounded-xl flex items-center gap-3 transition-colors text-left text-sm font-medium">
                  <action.icon size={18} className="text-[#f5e6c0]" />
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
