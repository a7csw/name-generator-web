import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 0.5,
  className = '',
  icon = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          y = triggerRect.top - tooltipRect.height - 8;
          break;
        case 'bottom':
          x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          y = triggerRect.bottom + 8;
          break;
        case 'left':
          x = triggerRect.left - tooltipRect.width - 8;
          y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          break;
        case 'right':
          x = triggerRect.right + 8;
          y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          break;
        default:
          x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          y = triggerRect.top - tooltipRect.height - 8;
      }

      // Ensure tooltip stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (x < 8) x = 8;
      if (x + tooltipRect.width > viewportWidth - 8) {
        x = viewportWidth - tooltipRect.width - 8;
      }
      if (y < 8) y = 8;
      if (y + tooltipRect.height > viewportHeight - 8) {
        y = viewportHeight - tooltipRect.height - 8;
      }

      setCoords({ x, y });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (icon) {
    return (
      <div className={`relative inline-block ${className}`}>
        <div
          ref={triggerRef}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
          className="inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors cursor-help"
        >
          <InformationCircleIcon className="w-5 h-5" />
        </div>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: 'fixed',
                left: coords.x,
                top: coords.y,
                zIndex: 1000,
              }}
              className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700 max-w-xs"
            >
              {content}
              {/* Arrow */}
              <div className="absolute w-2 h-2 bg-gray-900 border-gray-700 transform rotate-45" 
                   style={{
                     left: '50%',
                     top: '100%',
                     marginLeft: '-4px',
                     marginTop: '-4px',
                     borderRight: '1px solid',
                     borderBottom: '1px solid',
                   }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div 
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      className={`relative inline-block ${className}`}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: coords.x,
              top: coords.y,
              zIndex: 1000,
            }}
            className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700 max-w-xs"
          >
            {content}
            {/* Arrow */}
            <div className="absolute w-2 h-2 bg-gray-900 border-gray-700 transform rotate-45" 
                 style={{
                   left: '50%',
                   top: '100%',
                   marginLeft: '-4px',
                   marginTop: '-4px',
                   borderRight: '1px solid',
                   borderBottom: '1px solid',
                 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 