import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Contact() {
  const content = useContent();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    attachment: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type) && !file.type.startsWith('image/')) {
      alert('Invalid file type. Please upload a picture, document, spreadsheet, or PDF.');
      e.target.value = '';
      return;
    }

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
      setFormData((prev) => ({ ...prev, attachment: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            type: 'contact'
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        setIsSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', message: '', attachment: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">{content.contact_header_title || 'Contact Us'}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {content.contact_header_subtitle || 'Get in touch with our team to discuss your sourcing requirements.'}
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-display font-bold uppercase mb-8 text-brand-dark">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-brand-green">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-brand-dark">China Headquarters</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {content.contact_address ? (
                      <span dangerouslySetInnerHTML={{ __html: content.contact_address.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <>
                        No. 90, Innovation Avenue, Hefei<br />
                        Anhui, China
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-brand-green">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-brand-dark">Contact Numbers</h3>
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-medium text-gray-900">Tel:</span> {content.contact_phone || "+86 0551 6466 2624"}</p>
                    <p><span className="font-medium text-gray-900">WhatsApp:</span> {content.contact_whatsapp_1 || "+86 180-5518-2909"}</p>
                    {content.contact_whatsapp_2 && (
                      <p><span className="font-medium text-gray-900">WhatsApp:</span> {content.contact_whatsapp_2}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 font-medium uppercase tracking-wide">Available Mon-Fri, 9am - 6pm (GMT+8)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-brand-green">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-brand-dark">Email</h3>
                  <p className="text-gray-600 font-medium">{content.contact_email || "Info@beondt.net"}</p>
                  <p className="text-sm text-gray-500 mt-2">We aim to respond to all inquiries within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold font-display uppercase mb-6">Send us a message</h3>
            
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium">Thank you! Your message has been sent successfully. We'll be in touch soon.</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-green'} focus:ring-2 focus:border-transparent outline-none transition-all`} 
                    placeholder="Your Name" 
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" 
                    placeholder="Company Name" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-green'} focus:ring-2 focus:border-transparent outline-none transition-all`} 
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-green'} focus:ring-2 focus:border-transparent outline-none transition-all`} 
                  placeholder="How can we help you?" 
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Allowed formats: Images, PDF, Word, Excel. Max size: 5MB.</p>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-grow">
                    <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isUploading} />
                    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 flex items-center justify-between">
                      <span className="truncate">{formData.attachment ? formData.attachment.split('/').pop() : 'Choose a file...'}</span>
                      <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Browse'}
                      </Button>
                    </div>
                  </div>
                  {formData.attachment && (
                    <Button type="button" variant="ghost" onClick={() => setFormData({...formData, attachment: ''})} className="text-red-500 hover:bg-red-50">
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
