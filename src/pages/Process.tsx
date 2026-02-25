import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const ProcessStep = ({ number, title, description, details }: { number: string, title: string, description: string, details: string[] }) => (
  <div className="group flex flex-col md:flex-row gap-8 items-start relative pb-16 last:pb-0">
    {/* Line connecting steps */}
    <div className="hidden md:block absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 group-last:hidden" />
    
    <div className="shrink-0 w-16 h-16 rounded-full bg-brand-dark text-white flex items-center justify-center text-2xl font-bold font-display z-10 border-4 border-white shadow-lg">
      {number}
    </div>
    
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-grow">
      <h3 className="text-2xl font-bold font-display uppercase mb-3 text-brand-dark">{title}</h3>
      <p className="text-gray-600 mb-6 text-lg">{description}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Process() {
  return (
    <Layout>
      <div className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">Our Sourcing Process</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            A proven, systematic approach to ensuring quality and efficiency in every project.
          </p>
        </div>
      </div>

      <Section className="bg-brand-gray">
        <div className="max-w-4xl mx-auto">
          <ProcessStep 
            number="01"
            title="Requirement Analysis"
            description="We start by deeply understanding your product specifications, quality standards, and target price."
            details={["Technical drawings review", "Material specifications", "Volume planning", "Target pricing"]}
          />
          <ProcessStep 
            number="02"
            title="Supplier Shortlisting"
            description="We identify potential manufacturers from our verified database and conduct initial screenings."
            details={["Database search", "Initial capability check", "Certification verification", "Request for Quotation (RFQ)"]}
          />
          <ProcessStep 
            number="03"
            title="Sample Approval"
            description="We coordinate the creation of prototypes and samples for your physical approval."
            details={["Prototype development", "Sample inspection", "Iterative improvements", "Final sample sign-off"]}
          />
          <ProcessStep 
            number="04"
            title="Contract & Production"
            description="We negotiate terms, finalize contracts, and oversee the start of mass production."
            details={["Price negotiation", "Sales contract", "Payment terms", "Production schedule"]}
          />
          <ProcessStep 
            number="05"
            title="Inspection & QC"
            description="Our engineers conduct rigorous inspections to ensure products meet approved standards."
            details={["Raw material check", "During production check", "Pre-shipment inspection", "Defect sorting"]}
          />
          <ProcessStep 
            number="06"
            title="Shipping & Delivery"
            description="We handle logistics, customs clearance, and final delivery to your destination."
            details={["Booking containers", "Export documentation", "Customs clearance", "Final delivery"]}
          />
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold uppercase mb-6">Ready to get started?</h2>
          <Button asLink to="/quote" size="lg">Start Your Project</Button>
        </div>
      </Section>
    </Layout>
  );
}
