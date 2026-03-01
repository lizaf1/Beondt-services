import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useContent } from '@/context/ContentContext';

export default function Quote() {
  const content = useContent();
  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">{content.quote_header_title || 'Request a Quote'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {content.quote_header_subtitle || "Tell us about your project requirements, and we'll provide a detailed proposal."}
          </p>
        </div>
      </div>

      <Section className="bg-brand-gray">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <form className="space-y-8">
            <div>
              <h3 className="text-xl font-bold font-display uppercase mb-4 border-b pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                  <input type="url" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display uppercase mb-4 border-b pb-2">Product Requirements</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Category *</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none">
                    <option>Select a category...</option>
                    <option>Industrial Instruments</option>
                    <option>Machinery & Equipment</option>
                    <option>Electronics</option>
                    <option>Electrical Equipment</option>
                    <option>Agriculture Technology</option>
                    <option>Building Materials</option>
                    <option>Custom OEM / ODM</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Details / Specifications *</label>
                  <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="Please describe the product, materials, dimensions, and any specific requirements..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Quantity *</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="e.g. 1000 units" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Price (USD) (Optional)</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="e.g. $50 per unit" />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">Submit Request</Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our privacy policy. We will respond within 24 hours.
            </p>
          </form>
        </div>
      </Section>
    </Layout>
  );
}
