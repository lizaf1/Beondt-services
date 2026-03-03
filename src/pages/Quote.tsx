import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useContent } from '@/context/ContentContext';

export default function Quote() {
  const content = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      setAttachment(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: `Country: ${formData.get('country')}
Website: ${formData.get('website')}
Category: ${formData.get('category')}
Details: ${formData.get('details')}
Quantity: ${formData.get('quantity')}
Target Price: ${formData.get('price')}`,
      type: 'quote',
      attachment
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      setIsSuccess(true);
      setAttachment('');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Request Submitted!</h3>
              <p className="text-gray-600">Thank you for your request. We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-xl font-bold font-display uppercase mb-4 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input name="name" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input name="company" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input name="email" required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input name="phone" required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <input name="country" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                    <input name="website" type="url" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-display uppercase mb-4 border-b pb-2">Product Requirements</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Category *</label>
                    <select name="category" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none">
                      <option value="">Select a category...</option>
                      <option value="Industrial Instruments">Industrial Instruments</option>
                      <option value="Machinery & Equipment">Machinery & Equipment</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Electrical Equipment">Electrical Equipment</option>
                      <option value="Agriculture Technology">Agriculture Technology</option>
                      <option value="Building Materials">Building Materials</option>
                      <option value="Custom OEM / ODM">Custom OEM / ODM</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Details / Specifications *</label>
                    <textarea name="details" required rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="Please describe the product, materials, dimensions, and any specific requirements..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Quantity *</label>
                      <input name="quantity" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="e.g. 1000 units" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Price (USD) (Optional)</label>
                      <input name="price" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none" placeholder="e.g. $50 per unit" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-grow">
                        <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                        <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 flex items-center justify-between">
                          <span className="truncate">{attachment ? attachment.split('/').pop() : 'Choose a file...'}</span>
                          <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Browse'}
                          </Button>
                        </div>
                      </div>
                      {attachment && (
                        <Button type="button" variant="ghost" onClick={() => setAttachment('')} className="text-red-500 hover:bg-red-50">
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to our privacy policy. We will respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </Section>
    </Layout>
  );
}
