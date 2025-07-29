import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, SparklesIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore';
import Button from './ui/Button';

const Header = () => {
  const { isDarkMode, toggleDarkMode, clearData, generatedNames } = useNameStore();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Title */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <SparklesIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="h-8 w-8 text-blue-300 dark:text-blue-600 opacity-50" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Name Generator
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Discover meaningful names from different cultures
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Clear Results Button */}
            {generatedNames.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearData}
                className="hidden sm:flex"
              >
                Clear Results
              </Button>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 