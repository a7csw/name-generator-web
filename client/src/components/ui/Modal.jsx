import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  titleClassName = '',
  bodyClassName = ''
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1] 
            }}
            className={`
              relative w-full ${sizes[size] || sizes.md} 
              bg-gradient-to-br from-dark-800/95 to-dark-900/95 
              backdrop-blur-xl border border-white/10 rounded-2xl 
              shadow-2xl overflow-hidden ${className}
            `}
          >
            {/* Header */}
            {title && (
              <div className={`
                flex items-center justify-between p-6 border-b border-white/10
                ${titleClassName}
              `}>
                <h2 className="text-xl font-semibold text-white">
                  {title}
                </h2>
                {showCloseButton && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Body */}
            <div className={`
              p-6 ${bodyClassName}
            `}>
              {children}
            </div>

            {/* Close button for modals without title */}
            {!title && showCloseButton && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 z-10"
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Modal Header component
Modal.Header = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between p-6 border-b border-white/10 ${className}`}>
    {children}
  </div>
);

// Modal Body component
Modal.Body = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Modal Footer component
Modal.Footer = ({ children, className = '' }) => (
  <div className={`flex items-center justify-end gap-3 p-6 border-t border-white/10 ${className}`}>
    {children}
  </div>
);

export default Modal; 