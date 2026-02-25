import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Users, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">About BEONDT</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Your strategic partner for industrial sourcing in China. We combine local expertise with international standards.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-display font-bold uppercase mb-6">Who We Are</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                BEONDT Sourcing is a premier China-based sourcing and procurement company dedicated to serving international businesses in the industrial, construction, and technology sectors.
              </p>
              <p>
                Founded on the principles of transparency, engineering precision, and reliability, we bridge the gap between global buyers and China's vast manufacturing capabilities. Unlike general trading companies, we specialize in technical verticals where quality and specification adherence are critical.
              </p>
              <p>
                Our team consists of engineers, sourcing specialists, and quality control experts who understand the nuances of manufacturing. We act as your eyes and ears on the ground, ensuring that what you order is exactly what you get.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Meeting" className="rounded-lg shadow-lg w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Construction" className="rounded-lg shadow-lg w-full h-64 object-cover" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Factory" className="rounded-lg shadow-lg w-full h-64 object-cover" />
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Planning" className="rounded-lg shadow-lg w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Section dark>
        <SectionHeader title="Our Core Values" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display uppercase">Precision</h3>
            <p className="text-gray-600">We don't guess. We verify. Our engineering background ensures technical specifications are met with exact precision.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display uppercase">Partnership</h3>
            <p className="text-gray-600">We are not just a service provider; we are your partner. Your success is our success, and we work to protect your interests.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display uppercase">Integrity</h3>
            <p className="text-gray-600">Transparent pricing, honest communication, and ethical business practices are the foundation of our company.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="bg-brand-dark text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-display font-bold uppercase mb-8">Ready to work with us?</h2>
          <Button asLink to="/contact" variant="primary" size="lg">Contact Our Team</Button>
        </div>
      </Section>
    </Layout>
  );
}
