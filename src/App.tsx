/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/industries" element={<PageWrapper><Industries /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/process" element={<PageWrapper><Process /></PageWrapper>} />
        <Route path="/quality-control" element={<PageWrapper><QualityControl /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/quote" element={<PageWrapper><Quote /></PageWrapper>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/admin/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

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
          <AnimatedRoutes />
        </Router>
      </ContentProvider>
    </HelmetProvider>
  );
}
