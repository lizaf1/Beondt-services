import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function Contact() {
  const content = useContent();

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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" placeholder="Company Name" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all" placeholder="How can we help you?" />
              </div>

              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
