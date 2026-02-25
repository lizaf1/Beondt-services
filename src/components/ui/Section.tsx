import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section = ({ children, className, id, dark = false }: SectionProps) => (
  <section 
    id={id} 
    className={cn(
      "py-16 md:py-28 px-4 sm:px-6 lg:px-8",
      dark ? "bg-brand-gray" : "bg-white",
      className
    )}
  >
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

export const SectionHeader = ({ title, subtitle, centered = true, light = false }: { title: string; subtitle?: string; centered?: boolean; light?: boolean }) => (
  <div className={cn("mb-16", centered && "text-center")}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4",
        light ? "text-white" : "text-brand-dark"
      )}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "text-lg max-w-2xl",
          centered && "mx-auto",
          light ? "text-gray-300" : "text-gray-600"
        )}
      >
        {subtitle}
      </motion.p>
    )}
    <div className={cn(
      "h-1 w-20 bg-brand-green mt-6",
      centered && "mx-auto"
    )} />
  </div>
);
