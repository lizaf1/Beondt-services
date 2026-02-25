import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Search, FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const QCStep = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-brand-green" />
    </div>
    <h3 className="text-xl font-bold font-display uppercase mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function QualityControl() {
  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Quality Control</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Our rigorous inspection protocols ensure that every product meets your exact specifications.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeader 
          title="Our QC Methodology" 
          subtitle="We don't just check the final product. We monitor the entire production lifecycle."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <QCStep 
            icon={Search}
            title="Pre-Production Inspection (PPI)"
            description="We verify raw materials and components before production begins to identify potential issues early. This ensures the factory uses the correct materials as specified."
          />
          <QCStep 
            icon={AlertTriangle}
            title="During Production Inspection (DUPRO)"
            description="Our inspectors visit the factory when 20-50% of the order is completed. We check for defects, production speed, and adherence to quality standards."
          />
          <QCStep 
            icon={FileCheck}
            title="Pre-Shipment Inspection (PSI)"
            description="The final check when 100% of goods are produced and at least 80% are packed. We randomly select samples based on AQL standards to ensure quality."
          />
          <QCStep 
            icon={CheckCircle}
            title="Container Loading Check (CLC)"
            description="We supervise the loading process to ensure the correct quantity is loaded securely and the container is sealed properly before departure."
          />
        </div>
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold uppercase mb-6">Why Our QC Matters</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                Quality issues are the biggest risk in international sourcing. A defect discovered after the goods arrive in your country can be disastrously expensive to fix.
              </p>
              <p>
                BEONDT's on-ground team acts as your firewall. We catch issues at the factory, where they can be fixed before shipment.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span className="font-medium">ANSI/ASQ Z1.4 Standard (AQL)</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span className="font-medium">Detailed Photo & Video Reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span className="font-medium">Same-Day Reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span className="font-medium">Corrective Action Plans</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
             <img 
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Quality Inspector" 
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="bg-brand-gray rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-display font-bold uppercase mb-6">Secure Your Supply Chain</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Don't leave quality to chance. Let our experts verify your goods before they ship.
          </p>
          <Button asLink to="/quote" size="lg">Request QC Service</Button>
        </div>
      </Section>
    </Layout>
  );
}
