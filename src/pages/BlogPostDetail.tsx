import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { defaultBlogPosts } from '@/lib/defaultData';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => {
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) throw new Error('Not JSON');
        return res.json();
      })
      .then(data => {
        const found = data.find((p: any) => p.id.toString() === id);
        if (found) setPost(found);
        else setPost(defaultBlogPosts.find((p: any) => p.id.toString() === id));
      })
      .catch(() => {
        setPost(defaultBlogPosts.find((p: any) => p.id.toString() === id));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
          <Button asLink to="/blog">Back to Blog</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-end pb-16 bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-brand-green hover:text-white transition-colors mb-6 font-bold uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-brand-green" />
            <p className="text-sm text-gray-300 font-bold uppercase tracking-widest">{post.date}</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
