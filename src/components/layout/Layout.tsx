import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/ContentContext';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <img 
      src="/logo.png" 
      alt="BEONDT Sourcing" 
      className="h-12 w-auto object-contain" 
    />
  </Link>
);

const NavItem = ({ to, children, mobile = false, onClick }: { to: string; children: React.ReactNode; mobile?: boolean; onClick?: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "font-medium transition-colors hover:text-brand-green uppercase tracking-wide text-sm",
      mobile ? "block py-3 text-lg border-b border-gray-100" : "text-gray-700"
    )}
  >
    {children}
  </Link>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const content = useContent();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="bg-brand-dark text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand-green" /> {content.contact_address || 'Hefei, Anhui, China'}</span>
            <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-brand-green" /> {content.contact_email || 'Info@beondt.net'}</span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-brand-green transition-colors">Support</Link>
            <Link to="/quote" className="hover:text-brand-green transition-colors">Request Quote</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/industries">Industries</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/process">Process</NavItem>
            <NavItem to="/quality-control">QC</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <Link 
              to="/quote" 
              className="bg-brand-green text-white px-6 py-2.5 rounded font-medium hover:bg-opacity-90 transition-all uppercase tracking-wide text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="px-4 py-4 flex flex-col">
            <NavItem to="/" mobile onClick={() => setIsOpen(false)}>Home</NavItem>
            <NavItem to="/about" mobile onClick={() => setIsOpen(false)}>About</NavItem>
            <NavItem to="/industries" mobile onClick={() => setIsOpen(false)}>Industries</NavItem>
            <NavItem to="/services" mobile onClick={() => setIsOpen(false)}>Services</NavItem>
            <NavItem to="/process" mobile onClick={() => setIsOpen(false)}>Process</NavItem>
            <NavItem to="/quality-control" mobile onClick={() => setIsOpen(false)}>Quality Control</NavItem>
            <NavItem to="/blog" mobile onClick={() => setIsOpen(false)}>Blog</NavItem>
            <NavItem to="/contact" mobile onClick={() => setIsOpen(false)}>Contact</NavItem>
            <Link 
              to="/quote" 
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-brand-green text-white text-center py-3 rounded font-medium uppercase tracking-wide"
            >
              Request a Quote
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export const Footer = () => {
  const content = useContent();
  
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-1 mb-6">
              <img 
                src="/logo.png" 
                alt="BEONDT Sourcing" 
                className="h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted China sourcing partner. We bridge international buyers with qualified manufacturers, ensuring quality, efficiency, and transparency.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors">Our Services</Link></li>
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Industries</Link></li>
              <li><Link to="/process" className="hover:text-brand-green transition-colors">Sourcing Process</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Industries</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Machinery & Equipment</Link></li>
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Electronics</Link></li>
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Building Materials</Link></li>
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Agriculture Tech</Link></li>
              <li><Link to="/industries" className="hover:text-brand-green transition-colors">Industrial Instruments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green shrink-0" />
                <span>{content.contact_address || 'No. 90, Innovation Avenue, Hefei, Anhui, China'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-green shrink-0" />
                <span>{content.contact_phone || '+86 0551 6466 2624'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-green shrink-0" />
                <span>{content.contact_email || 'Info@beondt.net'}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Anhui Beyondt Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const content = useContent();
  const whatsappNumber = content.contact_whatsapp1 ? content.contact_whatsapp1.replace(/[^0-9]/g, '') : '8618055182909';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        {children}
      </main>
      <Footer />
      
      {/* WhatsApp Float */}
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};
