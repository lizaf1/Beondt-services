import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/lib/icons';
import { defaultIndustries } from '@/lib/defaultData';
import { useContent } from '@/context/ContentContext';

const IndustryDetail = ({ iconName, title, description, items }: { iconName: string, title: string, description: string, items: string[] }) => {
  const Icon = getIcon(iconName);
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-brand-green" />
        </div>
        <h3 className="text-xl font-bold font-display uppercase">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Industries() {
  const content = useContent();
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/industries')
      .then(res => {
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) throw new Error('Not JSON');
        return res.json();
      })
      .then(data => {
        // Parse items if they are strings
        const parsedData = data.map((ind: any) => ({
          ...ind,
          items: typeof ind.items === 'string' ? JSON.parse(ind.items) : ind.items
        }));
        setIndustries(parsedData);
      })
      .catch(() => setIndustries(defaultIndustries));
  }, []);

  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">{content.industries_header_title || 'Industries We Serve'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {content.industries_header_subtitle || 'Specialized sourcing expertise across key industrial and technical sectors.'}
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item) => (
            <React.Fragment key={item.id}>
              <IndustryDetail 
                iconName={item.icon}
                title={item.title}
                description={item.description}
                items={item.items || []}
              />
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold uppercase mb-6">Don't see your industry?</h2>
          <p className="text-gray-600 mb-8">
            Our sourcing network is vast. Contact us to discuss your specific requirements, and we'll let you know if we can help.
          </p>
          <Button asLink to="/contact" variant="primary">Contact Us</Button>
        </div>
      </Section>
    </Layout>
  );
}
