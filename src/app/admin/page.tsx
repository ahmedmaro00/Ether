"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function AdminDashboard() {
  // Fetch Stats
  const { data: orderStats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const res = await api.get('/order/stats');
      return res.data.data;
    }
  });

  const { data: allUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users-count'],
    queryFn: async () => {
      const res = await api.get('/user/all');
      return res.data.data;
    }
  });

  const { data: allOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-recent-orders'],
    queryFn: async () => {
      const res = await api.get('/order');
      return res.data.data;
    }
  });

  // Mock data for the chart (would normally come from backend)
  const chartData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 5000, orders: 32 },
    { name: 'Thu', sales: 2780, orders: 15 },
    { name: 'Fri', sales: 6890, orders: 45 },
    { name: 'Sat', sales: 8390, orders: 58 },
    { name: 'Sun', sales: 3490, orders: 22 },
  ];

  const stats = [
    { 
      name: "Total Revenue", 
      value: `$${orderStats?.totalRevenue?.toLocaleString() || '0'}`, 
      icon: DollarSign, 
      trend: "+14.5%", 
      isUp: true,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      name: "Total Orders", 
      value: orderStats?.totalOrders || '0', 
      icon: ShoppingCart, 
      trend: "+8.2%", 
      isUp: true,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      name: "Total Customers", 
      value: allUsers?.length || '0', 
      icon: Users, 
      trend: "+12.1%", 
      isUp: true,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    { 
      name: "Avg Order Value", 
      value: orderStats?.totalOrders > 0 ? `$${(orderStats.totalRevenue / orderStats.totalOrders).toFixed(2)}` : '$0', 
      icon: TrendingUp, 
      trend: "-2.4%", 
      isUp: false,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
  ];

  if (statsLoading || usersLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#d4a84b]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.4em] text-[#a07828] mb-3 block font-semibold">
            Store Performance
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800">
            Dashboard <span className="gold-gradient-text">Overview</span>
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <select className="bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:border-[#d4a84b]">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-7 group hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-stone-400 text-sm font-medium mb-1 uppercase tracking-wider">{stat.name}</h3>
              <p className="text-3xl font-serif text-stone-800">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="lg:col-span-2 bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl text-stone-800 mb-1">Revenue Growth</h2>
              <p className="text-sm text-stone-400">Total income over the current week</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-50">
                <div className="w-2 h-2 rounded-full bg-[#d4a84b]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Revenue</span>
              </div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a84b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#d4a84b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a8a29e', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a8a29e', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '12px 16px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#d4a84b" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Orders Side Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-stone-800">Recent Orders</h2>
            <button className="text-[#a07828] text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {allOrders?.slice(0, 5).map((order: any, idx: number) => (
              <div key={order._id || idx} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#f5e6c0]/30 group-hover:text-[#d4a84b] transition-colors">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm group-hover:text-[#a07828] transition-colors">{order.fullName}</p>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">#{order._id?.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-stone-800 text-sm">${order.totalPrice?.toFixed(2)}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                    order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {(!allOrders || allOrders.length === 0) && (
              <p className="text-center text-stone-400 text-sm py-10 italic">No recent orders found</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions / Other Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-[#d4a84b]/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
          <h3 className="font-serif text-2xl mb-6 relative z-10">Quick Product Entry</h3>
          <p className="text-stone-400 text-sm mb-8 relative z-10 leading-relaxed">Need to add a new artisanal product to the collection? Start here for a streamlined process.</p>
          <button className="bg-[#d4a84b] hover:bg-[#c49a3b] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all relative z-10 shadow-lg shadow-yellow-900/20">
            Create Product
          </button>
        </motion.div>

        <div className="bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 mb-6 border border-stone-100">
            <Package size={28} />
          </div>
          <h3 className="font-serif text-xl text-stone-800 mb-2">Inventory Alert</h3>
          <p className="text-stone-400 text-sm">4 products are running low on stock. Consider restocking soon.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] p-8 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 mb-6 border border-stone-100">
            <TrendingUp size={28} />
          </div>
          <h3 className="font-serif text-xl text-stone-800 mb-2">Customer Growth</h3>
          <p className="text-stone-400 text-sm">You gained 12 new customers this week. That's a 5% increase!</p>
        </div>
      </div>
    </div>
  );
}
