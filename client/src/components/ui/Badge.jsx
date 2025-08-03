import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  animated = false,
  icon = null 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    primary: 'bg-primary-100 text-primary-800 border border-primary-200',
    secondary: 'bg-gray-100 text-gray-600 border border-gray-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    danger: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    dark: 'bg-gray-800 text-gray-100 border border-gray-700',
    light: 'bg-white text-gray-800 border border-gray-200',
    purple: 'bg-purple-100 text-purple-800 border border-purple-200',
    pink: 'bg-pink-100 text-pink-800 border border-pink-200',
    emerald: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    orange: 'bg-orange-100 text-orange-800 border border-orange-200',
    // Glass morphism variants
    glass: 'bg-white/10 text-white border border-white/20 backdrop-blur-sm',
    glassPrimary: 'bg-primary-500/20 text-primary-300 border border-primary-400/30 backdrop-blur-sm',
    glassSuccess: 'bg-green-500/20 text-green-300 border border-green-400/30 backdrop-blur-sm',
    glassWarning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 backdrop-blur-sm',
    glassDanger: 'bg-red-500/20 text-red-300 border border-red-400/30 backdrop-blur-sm',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const classes = `${baseClasses} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`;

  const BadgeContent = () => (
    <>
      {icon && (
        <span className={`mr-1.5 ${iconSizes[size] || iconSizes.md}`}>
          {icon}
        </span>
      )}
      {children}
    </>
  );

  if (animated) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
      >
        <BadgeContent />
      </motion.span>
    );
  }

  return (
    <span className={classes}>
      <BadgeContent />
    </span>
  );
};

export default Badge; 