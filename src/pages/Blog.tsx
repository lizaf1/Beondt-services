import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { defaultBlogPosts } from '@/lib/defaultData';

import { useNavigate } from 'react-router-dom';

const BlogPost = ({ id, title, date, excerpt, image }: { id: number, title: string, date: string, excerpt: string, image: string }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/blog/${id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-green/20 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-0.5 bg-brand-green" />
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{date}</p>
        </div>
        <h3 className="text-xl font-bold font-display uppercase mb-4 leading-tight group-hover:text-brand-green transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{excerpt}</p>
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold uppercase tracking-wide text-brand-dark group-hover:text-brand-green transition-colors">
          <span>Read Article</span>
          <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => {
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) throw new Error('Not JSON');
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(() => setPosts(defaultBlogPosts));
  }, []);

  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Sourcing Insights</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert advice, industry trends, and guides on sourcing from China.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              <BlogPost 
                id={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                image={post.image}
              />
            </React.Fragment>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
