import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Edit, Save, X, LayoutGrid, FileText, Settings, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'industries' | 'services' | 'blog' | 'content'>('industries');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Data States
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [content, setContent] = useState<ContentMap>({});

  // Edit States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

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
    const [indRes, servRes, blogRes, contRes] = await Promise.all([
      fetch('/api/industries'),
      fetch('/api/services'),
      fetch('/api/blog'),
      fetch('/api/content')
    ]);

    setIndustries(await indRes.json());
    setServices(await servRes.json());
    setBlogPosts(await blogRes.json());
    setContent(await contRes.json());
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  // Generic Handlers
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
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
    if (confirm('Are you sure?')) {
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
    if (confirm('Are you sure?')) {
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
    if (confirm('Are you sure?')) {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
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
    fetchAllData();
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <Layout>
      <div className="bg-brand-dark text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
            <span className="bg-brand-green text-xs px-2 py-1 rounded text-white font-bold">v1.0</span>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-brand-dark">Logout</Button>
        </div>
      </div>

      <Section className="bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <button 
              onClick={() => setActiveTab('industries')}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left font-medium", activeTab === 'industries' ? "bg-brand-green text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100")}
            >
              <LayoutGrid className="w-5 h-5" /> Industries
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left font-medium", activeTab === 'services' ? "bg-brand-green text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100")}
            >
              <Settings className="w-5 h-5" /> Services
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left font-medium", activeTab === 'blog' ? "bg-brand-green text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100")}
            >
              <FileText className="w-5 h-5" /> Blog Posts
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left font-medium", activeTab === 'content' ? "bg-brand-green text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100")}
            >
              <Type className="w-5 h-5" /> General Content
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            
            {/* INDUSTRIES TAB */}
            {activeTab === 'industries' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Manage Industries</h2>
                  <Button onClick={() => { setEditingId(0); setFormData({ items: [] }); }} size="sm"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                </div>

                {editingId !== null && (
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-brand-green/20">
                    <h3 className="font-bold mb-4 text-lg border-b pb-2">{editingId === 0 ? 'Create New Industry' : 'Edit Industry'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Icon (Lucide Name)</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                      <Button onClick={saveIndustry} size="sm">Save Changes</Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {industries.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                          {/* We can't dynamically render icons easily without a map, just showing name */}
                          <span className="text-xs">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500 truncate max-w-md">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteIndustry(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
                  <Button onClick={() => { setEditingId(0); setFormData({}); }} size="sm"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                </div>

                {editingId !== null && (
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-brand-green/20">
                    <h3 className="font-bold mb-4 text-lg border-b pb-2">{editingId === 0 ? 'Create New Service' : 'Edit Service'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Icon (Lucide Name)</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                      <Button onClick={saveService} size="sm">Save Changes</Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {services.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                          <span className="text-xs">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500 truncate max-w-md">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteService(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOG TAB */}
            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Manage Blog Posts</h2>
                  <Button onClick={() => { setEditingId(0); setFormData({}); }} size="sm"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                </div>

                {editingId !== null && (
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-brand-green/20">
                    <h3 className="font-bold mb-4 text-lg border-b pb-2">{editingId === 0 ? 'Create New Post' : 'Edit Post'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                        <input className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Excerpt</label>
                        <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" rows={2} value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Content</label>
                        <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" rows={6} value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                      <Button onClick={saveBlogPost} size="sm">Save Changes</Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {blogPosts.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h3 className="font-bold text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.date}</p>
                          <p className="text-sm text-gray-500 truncate max-w-md">{item.excerpt}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteBlogPost(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTENT TAB */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">General Content</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                  <h3 className="font-bold text-lg border-b pb-2 text-brand-green">Hero Section</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Hero Title</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['home_hero_title']} 
                        onBlur={(e) => saveContent('home_hero_title', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Hero Subtitle</label>
                      <textarea 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        rows={3}
                        defaultValue={content['home_hero_subtitle']} 
                        onBlur={(e) => saveContent('home_hero_subtitle', e.target.value)} 
                      />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg border-b pb-2 text-brand-green mt-8">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['contact_address']} 
                        onBlur={(e) => saveContent('contact_address', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['contact_email']} 
                        onBlur={(e) => saveContent('contact_email', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['contact_phone']} 
                        onBlur={(e) => saveContent('contact_phone', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp 1</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['contact_whatsapp_1']} 
                        onBlur={(e) => saveContent('contact_whatsapp_1', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">WhatsApp 2</label>
                      <input 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-brand-green outline-none" 
                        defaultValue={content['contact_whatsapp_2']} 
                        onBlur={(e) => saveContent('contact_whatsapp_2', e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </Section>
    </Layout>
  );
}
