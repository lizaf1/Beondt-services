import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';

const BlogPost = ({ title, date, excerpt, image }: { title: string, date: string, excerpt: string, image: string }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
    <div className="h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-6">
      <p className="text-xs text-brand-green font-bold uppercase tracking-wider mb-2">{date}</p>
      <h3 className="text-xl font-bold font-display uppercase mb-3 group-hover:text-brand-green transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
      <span className="text-brand-dark font-medium text-sm border-b-2 border-brand-green pb-0.5">Read Article</span>
    </div>
  </div>
);

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(data => setPosts(data));
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
            <BlogPost 
              key={post.id}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              image={post.image}
            />
          ))}
        </div>
      </Section>
    </Layout>
  );
}
