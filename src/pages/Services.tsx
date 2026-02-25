import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/lib/icons';

const ServiceItem = ({ iconName, title, description }: { iconName: string, title: string, description: string }) => {
  const Icon = getIcon(iconName);
  return (
    <div className="flex gap-6 p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-green/20 transition-all duration-300 group">
      <div className="shrink-0 w-14 h-14 bg-brand-gray rounded-xl flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
        <Icon className="w-7 h-7 text-brand-dark group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold font-display uppercase mb-3 group-hover:text-brand-green transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(data => setServices(data));
  }, []);

  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive procurement solutions designed to minimize risk and maximize value.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {services.map((item) => (
            <React.Fragment key={item.id}>
              <ServiceItem 
                iconName={item.icon}
                title={item.title}
                description={item.description}
              />
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="bg-brand-green rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-display font-bold uppercase mb-6">Need a Custom Solution?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We can tailor our services to fit your specific project needs. Whether you need a one-time audit or a full-service procurement partner.
          </p>
          <Button asLink to="/quote" variant="white" size="lg">Get a Custom Quote</Button>
        </div>
      </Section>
    </Layout>
  );
}
