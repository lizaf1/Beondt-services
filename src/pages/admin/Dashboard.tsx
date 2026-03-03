import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Edit, Save, X, LayoutGrid, FileText, Settings, Type, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

// Types
interface Industry {
  id: number;
  title: string;
  description: string;
  icon: string;
  items: string[];
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

interface ContentMap {
  [key: string]: string;
}

interface Enquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  date: string;
  status: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'industries' | 'services' | 'blog' | 'content' | 'pages' | 'enquiries'>('industries');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Data States
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [content, setContent] = useState<ContentMap>({});
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Edit States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/auth/me');
    if (!res.ok) navigate('/admin/login');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [indRes, servRes, blogRes, contRes, enqRes] = await Promise.all([
        fetch('/api/industries'),
        fetch('/api/services'),
        fetch('/api/blog'),
        fetch('/api/content'),
        fetch('/api/enquiries')
      ]);

      setIndustries(await indRes.json());
      setServices(await servRes.json());
      setBlogPosts(await blogRes.json());
      setContent(await contRes.json());
      setEnquiries(await enqRes.json());
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      setFormData((prev: any) => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Generic Handlers
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  // Industries Handlers
  const saveIndustry = async () => {
    const method = editingId === 0 ? 'POST' : 'PUT';
    const url = editingId === 0 ? '/api/industries' : `/api/industries/${editingId}`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    handleCancel();
    fetchAllData();
  };

  const deleteIndustry = async (id: number) => {
    if (confirm('Are you sure you want to delete this industry?')) {
      await fetch(`/api/industries/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Services Handlers
  const saveService = async () => {
    const method = editingId === 0 ? 'POST' : 'PUT';
    const url = editingId === 0 ? '/api/services' : `/api/services/${editingId}`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    handleCancel();
    fetchAllData();
  };

  const deleteService = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Blog Handlers
  const saveBlogPost = async () => {
    const method = editingId === 0 ? 'POST' : 'PUT';
    const url = editingId === 0 ? '/api/blog' : `/api/blog/${editingId}`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    handleCancel();
    fetchAllData();
  };

  const deleteBlogPost = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Enquiries Handlers
  const handleUpdateEnquiryStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      fetchAllData();
    }
  };

  const deleteEnquiry = async (id: number) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      fetchAllData();
    }
  };

  // Content Handlers
  const saveContent = async (key: string, value: string) => {
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    // Optimistic update
    setContent(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-mono text-sm tracking-widest uppercase">Initializing System...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-brand-dark text-white h-16 shrink-0 flex items-center px-6 justify-between border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight uppercase">Control Center</h1>
          </div>
          <div className="h-6 w-px bg-white/20 hidden md:block" />
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" /> System Online</span>
            <span>v2.4.0-stable</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate('/')} variant="ghost" size="sm" className="text-white hover:text-brand-green">View Site</Button>
          <Button onClick={handleLogout} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-brand-dark">Sign Out</Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-b md:border-r md:border-b-0 border-gray-200 flex flex-row md:flex-col p-4 gap-2 overflow-x-auto shrink-0">
          <p className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Management</p>
          <button 
            onClick={() => setActiveTab('industries')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'industries' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" /> Industries
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'services' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Settings className="w-4 h-4 shrink-0" /> Services
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'blog' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <FileText className="w-4 h-4 shrink-0" /> Blog Engine
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'content' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Type className="w-4 h-4 shrink-0" /> Global Config
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'pages' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" /> Page Headers
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={cn(
              "flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap",
              activeTab === 'enquiries' ? "bg-brand-dark text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <MessageSquare className="w-4 h-4 shrink-0" /> Enquiries
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Tab Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-brand-dark uppercase tracking-tight mb-1">
                  {activeTab === 'industries' && 'Industry Verticals'}
                  {activeTab === 'services' && 'Service Portfolio'}
                  {activeTab === 'blog' && 'Content Engine'}
                  {activeTab === 'content' && 'System Configuration'}
                  {activeTab === 'pages' && 'Page Headers'}
                  {activeTab === 'enquiries' && 'Customer Enquiries'}
                </h2>
                <p className="text-gray-500 text-sm">Manage and update your website's {activeTab} data in real-time.</p>
              </div>
              {activeTab !== 'content' && activeTab !== 'pages' && activeTab !== 'enquiries' && (
                <Button onClick={() => { setEditingId(0); setFormData({ items: [] }); }} size="md" className="shrink-0">
                  <Plus className="w-4 h-4 mr-2" /> Add Entry
                </Button>
              )}
            </div>

            {/* Editor Overlay/Section */}
            <AnimatePresence>
              {editingId !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 rounded-2xl shadow-2xl border border-brand-green/20 mb-10 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-green" />
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
                      {editingId === 0 ? 'Create New Entry' : `Editing Entry #${editingId}`}
                    </h3>
                    <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {activeTab === 'industries' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Industrial Machinery" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Icon Name (Lucide)</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="e.g. Factory" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                          <div className="flex gap-2">
                            <input className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                            <div className="relative">
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                              <Button type="button" variant="outline" className="h-full whitespace-nowrap" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload Image'}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                          <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe this industry sector..." />
                        </div>
                      </>
                    )}

                    {activeTab === 'services' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Name</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Quality Control" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Icon Name (Lucide)</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="e.g. ShieldCheck" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                          <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" rows={4} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="What does this service entail?" />
                        </div>
                      </>
                    )}

                    {activeTab === 'blog' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post Title</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Sourcing Trends 2024" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publish Date</label>
                          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="October 24, 2023" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cover Image URL</label>
                          <div className="flex gap-2">
                            <input className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                            <div className="relative">
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                              <Button type="button" variant="outline" className="h-full whitespace-nowrap" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload Image'}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Excerpt</label>
                          <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" rows={2} value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} placeholder="Brief summary for the list view..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Content (Markdown Supported)</label>
                          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-brand-green focus-within:border-transparent transition-all">
                            <SimpleMDE 
                              value={formData.content || ''} 
                              onChange={value => setFormData({...formData, content: value})} 
                              options={{
                                spellChecker: false,
                                placeholder: "Write your post content here using Markdown...",
                                status: false,
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button onClick={handleCancel} variant="ghost">Discard</Button>
                    <Button 
                      onClick={activeTab === 'industries' ? saveIndustry : activeTab === 'services' ? saveService : saveBlogPost} 
                      className="px-10"
                    >
                      Commit Changes
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List Views */}
            <div className="space-y-4">
              {activeTab === 'industries' && industries.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-2 py-0.5 rounded">ID: {item.id}</span>
                        <h3 className="font-bold text-brand-dark uppercase tracking-tight truncate">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    <Button onClick={() => handleEdit(item)} variant="white" size="sm" className="flex-grow md:flex-grow-0"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                    <Button onClick={() => deleteIndustry(item.id)} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex-grow md:flex-grow-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}

              {activeTab === 'services' && services.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-14 h-14 bg-brand-gray rounded-xl flex items-center justify-center shrink-0">
                      <Settings className="w-6 h-6 text-brand-dark" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-brand-dark uppercase tracking-tight mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    <Button onClick={() => handleEdit(item)} variant="white" size="sm" className="flex-grow md:flex-grow-0"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                    <Button onClick={() => deleteService(item.id)} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex-grow md:flex-grow-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}

              {activeTab === 'blog' && blogPosts.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mb-1">{item.date}</p>
                      <h3 className="font-bold text-brand-dark uppercase tracking-tight mb-2 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    <Button onClick={() => handleEdit(item)} variant="white" size="sm" className="flex-grow md:flex-grow-0"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                    <Button onClick={() => deleteBlogPost(item.id)} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex-grow md:flex-grow-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}

              {activeTab === 'content' && (
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-8 border-b pb-4">
                      <Settings className="w-5 h-5 text-brand-green" />
                      <h3 className="text-lg font-bold uppercase tracking-tight">Site Settings</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logo URL</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          placeholder="/logo.png"
                          defaultValue={content['logo_url']} 
                          onBlur={(e) => saveContent('logo_url', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Footer About Text</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          rows={3}
                          defaultValue={content['footer_about_text']} 
                          onBlur={(e) => saveContent('footer_about_text', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-8 border-b pb-4">
                      <LayoutGrid className="w-5 h-5 text-brand-green" />
                      <h3 className="text-lg font-bold uppercase tracking-tight">Hero Section Configuration</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Headline</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['home_hero_title']} 
                          onBlur={(e) => saveContent('home_hero_title', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sub-headline / Value Proposition</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          rows={3}
                          defaultValue={content['home_hero_subtitle']} 
                          onBlur={(e) => saveContent('home_hero_subtitle', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-8 border-b pb-4">
                      <FileText className="w-5 h-5 text-brand-green" />
                      <h3 className="text-lg font-bold uppercase tracking-tight">Home About Section</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">About Title</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['home_about_title']} 
                          onBlur={(e) => saveContent('home_about_title', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">About Subtitle</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['home_about_subtitle']} 
                          onBlur={(e) => saveContent('home_about_subtitle', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">About Text</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          rows={5}
                          defaultValue={content['home_about_text']} 
                          onBlur={(e) => saveContent('home_about_text', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-8 border-b pb-4">
                      <Phone className="w-5 h-5 text-brand-green" />
                      <h3 className="text-lg font-bold uppercase tracking-tight">Contact & Communication</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Physical Address</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['contact_address']} 
                          onBlur={(e) => saveContent('contact_address', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Email</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['contact_email']} 
                          onBlur={(e) => saveContent('contact_email', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['contact_phone']} 
                          onBlur={(e) => saveContent('contact_phone', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Line 1</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['contact_whatsapp_1']} 
                          onBlur={(e) => saveContent('contact_whatsapp_1', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Line 2</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                          defaultValue={content['contact_whatsapp_2']} 
                          onBlur={(e) => saveContent('contact_whatsapp_2', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'pages' && (
                <div className="space-y-8">
                  {['about', 'industries', 'services', 'process', 'quality_control', 'blog', 'contact', 'quote'].map((page) => (
                    <div key={page} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-8 border-b pb-4">
                        <LayoutGrid className="w-5 h-5 text-brand-green" />
                        <h3 className="text-lg font-bold uppercase tracking-tight">{page.replace('_', ' ')} Page Header</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Header Title</label>
                          <input 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                            defaultValue={content[`${page}_header_title`]} 
                            onBlur={(e) => saveContent(`${page}_header_title`, e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Header Subtitle</label>
                          <textarea 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all" 
                            rows={3}
                            defaultValue={content[`${page}_header_subtitle`]} 
                            onBlur={(e) => saveContent(`${page}_header_subtitle`, e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enquiries List */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No enquiries found.</p>
                  </div>
                ) : (
                  enquiries.map(enquiry => (
                    <div key={enquiry.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${enquiry.status === 'new' ? 'border-brand-green/50 bg-brand-green/5' : 'border-gray-100'}`}>
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg font-bold text-brand-dark">{enquiry.name}</h4>
                            {enquiry.status === 'new' && (
                              <span className="px-2 py-0.5 bg-brand-green text-white text-xs font-bold uppercase rounded-full">New</span>
                            )}
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full">{enquiry.type}</span>
                          </div>
                          <p className="text-sm text-gray-500">{enquiry.company && `${enquiry.company} • `}{new Date(enquiry.date).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {enquiry.status === 'new' ? (
                            <Button onClick={() => handleUpdateEnquiryStatus(enquiry.id, 'read')} size="sm" variant="outline" className="text-xs">
                              Mark as Read
                            </Button>
                          ) : (
                            <Button onClick={() => handleUpdateEnquiryStatus(enquiry.id, 'new')} size="sm" variant="ghost" className="text-xs text-gray-500">
                              Mark as Unread
                            </Button>
                          )}
                          <button onClick={() => deleteEnquiry(enquiry.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">Email:</span> <a href={`mailto:${enquiry.email}`} className="text-brand-green hover:underline">{enquiry.email}</a>
                        </div>
                        {enquiry.phone && (
                          <div>
                            <span className="text-gray-500 font-medium">Phone:</span> <a href={`tel:${enquiry.phone}`} className="text-brand-green hover:underline">{enquiry.phone}</a>
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-gray-700 whitespace-pre-wrap text-sm">{enquiry.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
