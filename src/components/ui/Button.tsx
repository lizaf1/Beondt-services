import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  to?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  asLink, 
  to, 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 uppercase tracking-wide rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-brand-green text-white hover:bg-opacity-90 shadow-md hover:shadow-lg focus:ring-brand-green",
    secondary: "bg-brand-dark text-white hover:bg-gray-800 shadow-md hover:shadow-lg focus:ring-brand-dark",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white focus:ring-brand-dark",
    white: "bg-white text-brand-dark hover:bg-gray-100 shadow-md hover:shadow-lg focus:ring-white",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (asLink && to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
