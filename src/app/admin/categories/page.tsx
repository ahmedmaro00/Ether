"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Loader2, 
  AlertCircle,
  Hash,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch Categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const res = await api.get('/category');
      return res.data.data;
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (name: string) => api.post('/category', { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setNewCategory('');
      setError(null);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create category');
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/category/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    createMutation.mutate(newCategory);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl text-stone-800 mb-2">Category <span className="gold-gradient-text">Architecture</span></h1>
        <p className="text-stone-500 text-sm">Organize your collection into logical groups for better discoverability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 sticky top-32">
            <h2 className="font-serif text-xl text-stone-800 mb-6">New Category</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Category Name</label>
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Soy Candles"
                  className="w-full bg-stone-50 border-stone-100 rounded-2xl py-3.5 px-4 text-sm focus:bg-white focus:border-[#d4a84b] outline-none transition-all"
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs px-1">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={createMutation.isPending || !newCategory.trim()}
                className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 text-white rounded-2xl py-4 font-semibold text-sm transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2"
              >
                {createMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                    <Plus size={18} />
                    Add Category
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-8 border-b border-stone-50 flex items-center justify-between">
              <h2 className="font-serif text-xl text-stone-800">Active Categories</h2>
              <span className="bg-stone-50 text-stone-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-stone-100">
                {categories?.length || 0} Total
              </span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin text-[#d4a84b]" size={32} />
              </div>
            ) : (
              <div className="divide-y divide-stone-50">
                {categories?.map((category: any, i: number) => (
                  <motion.div 
                    key={category._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 flex items-center justify-between group hover:bg-stone-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f5e6c0]/30 flex items-center justify-center text-[#a07828]">
                        <Tag size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800">{category.name}</h3>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">ID: {category._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-0.5">Reference</p>
                        <p className="text-sm font-serif text-stone-600">/{category.name.toLowerCase().replace(/\s+/g, '-')}</p>
                      </div>
                      <button 
                        onClick={() => { if(confirm('Delete category?')) deleteMutation.mutate(category._id) }}
                        className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {(!categories || categories.length === 0) && (
                  <div className="py-24 text-center">
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag size={24} className="text-stone-200" />
                    </div>
                    <p className="text-stone-400 text-sm italic">No categories created yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 p-8 bg-gradient-to-r from-[#f5e6c0]/20 to-transparent rounded-[2rem] border border-dashed border-[#d4a84b]/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#a07828] shadow-sm">
                <AlertCircle size={20} />
              </div>
              <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
                Deleting a category will unassign it from all products. Please handle with care.
              </p>
            </div>
            <button className="text-xs font-bold uppercase tracking-widest text-[#a07828] hover:underline">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
