import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { 
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { getIcon } from '@/lib/icons';

const Hero = () => {
  const content = useContent();
  
  return (
    <div className="relative min-h-[90vh] flex items-center bg-brand-dark py-20 md:py-0">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Industrial Factory" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 to-brand-dark/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-block bg-brand-green/20 border border-brand-green/30 rounded px-4 py-1.5 mb-6">
            <span className="text-brand-green font-medium tracking-wider text-sm uppercase">Premier China Sourcing Partner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            {content.home_hero_title ? (
              <span dangerouslySetInnerHTML={{ __html: content.home_hero_title.replace(/\n/g, '<br/>') }} />
            ) : (
              <>
                China Industrial <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-lime-400">Sourcing Made Reliable</span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-2xl">
            {content.home_hero_subtitle || "End-to-end sourcing, factory verification, quality control, and global logistics for machinery, electronics, agriculture technology, and construction materials."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asLink to="/quote" size="lg" className="group w-full sm:w-auto">
              Request a Quote 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button asLink to="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-dark w-full sm:w-auto">
              Speak With Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ServiceCard = ({ iconName, title, description }: { iconName: string, title: string, description: string }) => {
  const Icon = getIcon(iconName);
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-brand-gray rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-green transition-colors duration-300">
        <Icon className="w-7 h-7 text-brand-dark group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-display uppercase tracking-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
};

const IndustryCard = ({ iconName, title, description, image }: { iconName: string, title: string, description: string, image: string }) => {
  const Icon = getIcon(iconName);
  return (
    <div className="group relative overflow-hidden rounded-xl h-80 cursor-pointer">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-6 h-6 text-brand-green" />
          <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="relative flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-brand-dark text-white flex items-center justify-center text-2xl font-bold font-display mb-4 z-10 border-4 border-white shadow-lg">
      {number}
    </div>
    <h3 className="text-lg font-bold mb-2 uppercase">{title}</h3>
    <p className="text-sm text-gray-600 max-w-xs">{description}</p>
  </div>
);

export default function Home() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/industries').then(res => res.json()).then(data => setIndustries(data.slice(0, 8)));
    fetch('/api/services').then(res => res.json()).then(data => setServices(data.slice(0, 4)));
  }, []);

  return (
    <Layout>
      <Hero />

      {/* About Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader 
              title="Your Trusted China Sourcing Partner" 
              subtitle="Bridging international buyers with qualified and verified Chinese manufacturers."
              centered={false}
            />
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                BEONDT Sourcing specializes in technical, industrial, and large-scale procurement projects. We don't just find suppliers; we engineer supply chains that ensure cost efficiency, strict quality control, and transparent project execution.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "On-ground China presence with local expertise",
                  "Dedicated engineering & technical support team",
                  "Comprehensive factory audit & verification capabilities",
                  "Multi-stage quality inspections (Pre, During, Post)",
                  "Seamless global shipping & logistics coordination"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="font-medium text-brand-dark">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button asLink to="/about" variant="secondary">Learn More About Us</Button>
              </div>
            </div>
          </div>
          <div className="relative hidden xl:block">
            <div className="absolute -inset-4 bg-brand-green/10 rounded-xl transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1565514020176-dbf2277e3c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Team in warehouse" 
              className="relative rounded-xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-brand-green/10 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-brand-green" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Verified</p>
                  <p className="font-bold text-brand-dark">100% Quality Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Industries Section */}
      <Section dark id="industries">
        <SectionHeader 
          title="Core Industries" 
          subtitle="Specialized sourcing for technical and industrial sectors."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((item) => (
            <React.Fragment key={item.id}>
              <IndustryCard 
                iconName={item.icon}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </React.Fragment>
          ))}
          
          <div className="bg-brand-green rounded-xl p-8 flex flex-col justify-center items-center text-center text-white h-80">
            <h3 className="text-2xl font-bold font-display uppercase mb-4">Need Something Else?</h3>
            <p className="mb-6 opacity-90">We can source custom products for your specific needs.</p>
            <Button asLink to="/contact" variant="white">Contact Us</Button>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionHeader 
          title="Complete Procurement Solutions" 
          subtitle="From factory floor to your door, we handle every step."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item) => (
            <React.Fragment key={item.id}>
              <ServiceCard 
                iconName={item.icon}
                title={item.title}
                description={item.description}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asLink to="/services" variant="outline">View All Services</Button>
        </div>
      </Section>

      {/* Process Section */}
      <Section dark>
        <SectionHeader 
          title="Our Sourcing Process" 
          subtitle="A transparent, step-by-step approach to successful procurement."
        />
        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <Step number="01" title="Analysis" description="We analyze your requirements and specs." />
            <Step number="02" title="Shortlisting" description="We find and verify the best suppliers." />
            <Step number="03" title="Sampling" description="You approve samples before mass production." />
            <Step number="04" title="Production" description="We monitor manufacturing progress." />
            <Step number="05" title="Inspection" description="Strict quality control checks." />
            <Step number="06" title="Delivery" description="Shipping to your destination." />
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-brand-dark text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-6">Why International Buyers Choose BEONDT</h2>
            <p className="text-gray-400 text-lg mb-8">
              We understand the challenges of sourcing from China. Our team eliminates the risks and complexities, giving you a competitive edge.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Direct Access to Verified Factories",
                "Technical Evaluation & Engineering",
                "Transparent Pricing Structure",
                "Comprehensive Risk Mitigation",
                "Strong Supplier Network",
                "Dedicated Project Managers"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-full min-h-[300px] bg-white/5 rounded-xl p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-6 font-display uppercase">Global Reach</h3>
            <p className="text-gray-400 mb-8">Serving clients across major global markets:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded border border-white/5 text-center hover:bg-white/10 transition-colors">
                <span className="block font-bold text-brand-green text-xl mb-1">North America</span>
                <span className="text-xs text-gray-400">USA, Canada, Mexico</span>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/5 text-center hover:bg-white/10 transition-colors">
                <span className="block font-bold text-brand-green text-xl mb-1">Europe</span>
                <span className="text-xs text-gray-400">UK, Germany, France</span>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/5 text-center hover:bg-white/10 transition-colors">
                <span className="block font-bold text-brand-green text-xl mb-1">Middle East</span>
                <span className="text-xs text-gray-400">UAE, Saudi Arabia</span>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/5 text-center hover:bg-white/10 transition-colors">
                <span className="block font-bold text-brand-green text-xl mb-1">Southeast Asia</span>
                <span className="text-xs text-gray-400">Singapore, Malaysia</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="bg-brand-gray rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-6">Start Your China Sourcing Project Today</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Ready to streamline your supply chain? Get a free consultation and quote for your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asLink to="/quote" size="lg">Request a Quote</Button>
            <Button asLink to="/contact" variant="outline" size="lg">Contact Us</Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
