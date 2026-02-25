import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 uppercase tracking-wider rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const variants = {
    primary: "bg-brand-green text-white hover:bg-brand-green/90 shadow-[0_4px_14px_0_rgba(124,189,40,0.39)] hover:shadow-[0_6px_20px_rgba(124,189,40,0.23)] focus:ring-brand-green",
    secondary: "bg-brand-dark text-white hover:bg-black shadow-md hover:shadow-lg focus:ring-brand-dark",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white focus:ring-brand-dark",
    white: "bg-white text-brand-dark hover:bg-gray-50 shadow-sm hover:shadow-md focus:ring-white",
    ghost: "text-brand-dark hover:bg-gray-100 focus:ring-gray-200",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
    icon: "p-2",
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
