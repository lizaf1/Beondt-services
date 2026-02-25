/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Industries from '@/pages/Industries';
import Services from '@/pages/Services';
import Process from '@/pages/Process';
import Contact from '@/pages/Contact';
import Quote from '@/pages/Quote';
import QualityControl from '@/pages/QualityControl';
import Blog from '@/pages/Blog';

import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';

import { ContentProvider } from '@/context/ContentContext';

export default function App() {
  return (
    <HelmetProvider>
      <ContentProvider>
        <Router>
          <Helmet>
            <title>BEONDT Sourcing | China Industrial & Building Materials Procurement Experts</title>
            <meta name="description" content="BEONDT Sourcing provides professional China sourcing services for machinery, electronics, agricultural technology, and building materials including marble, granite, and ceramics." />
            <meta name="keywords" content="China industrial sourcing company, Machinery sourcing China, Building materials sourcing China, Marble granite supplier China, Electronics manufacturer China, Agricultural equipment sourcing China, OEM manufacturing China" />
          </Helmet>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/quality-control" element={<QualityControl />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ContentProvider>
    </HelmetProvider>
  );
}
