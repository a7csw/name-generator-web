import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUpIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

const LandingPage = () => {
  const { selectedLanguage, setLanguage, goToGenderSelection, t } = useNameStore();

  const handleContinue = () => {
    goToGenderSelection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary floating orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-full blur-3xl"
        />
        
        {/* Secondary floating orb */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-accent-emerald/15 to-primary-600/15 rounded-full blur-3xl"
        />
        
        {/* Tertiary floating orb */}
        <motion.div
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent-orange/10 to-accent-pink/10 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-primary-400/60 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

        {/* Logo & Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Enhanced Logo Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-8 relative"
          >
            <div className="relative inline-block">
              {/* Main sparkle icon */}
              <SparklesIcon className="h-28 w-28 text-primary-400 mx-auto relative z-10" />
              
              {/* Glow effects */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary-400/30 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-accent-purple/25 rounded-full blur-xl"
              />
              
              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                  className="absolute w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-purple rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-80px) translateX(-6px)`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 relative"
          >
            <span className="bg-gradient-to-r from-primary-300 via-accent-purple to-primary-400 bg-clip-text text-transparent filter drop-shadow-2xl">
              NameCraft
            </span>
            
            {/* Text glow effect */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-primary-300 via-accent-purple to-primary-400 bg-clip-text text-transparent blur-sm opacity-50 -z-10"
            >
              NameCraft
            </motion.div>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed mb-4"
          >
            {t('discoverNames')}
          </motion.p>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto rounded-full"
          />
        </motion.div>

        {/* Enhanced Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mb-16 w-full max-w-6xl"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <GlobeAltIcon className="h-8 w-8 text-primary-400" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{t('chooseLanguage')}</h3>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <GlobeAltIcon className="h-8 w-8 text-accent-purple" />
            </motion.div>
          </motion.div>

          {/* Enhanced Language Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 max-w-5xl mx-auto">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 2 + (index * 0.1), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -8,
                  rotateY: 15,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(lang.code)}
                className={`
                  group relative px-6 py-5 rounded-3xl font-semibold transition-all duration-500 backdrop-blur-lg text-center overflow-hidden
                  ${selectedLanguage === lang.code
                    ? 'bg-gradient-to-br from-primary-500/40 to-accent-purple/40 text-white border-2 border-primary-400 shadow-2xl shadow-primary-500/40 transform scale-105'
                    : 'bg-white/10 text-gray-300 border-2 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40'
                  }
                `}
              >
                {/* Background glow for selected */}
                {selectedLanguage === lang.code && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-3xl"
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Flag with animation */}
                  <motion.div 
                    className="text-3xl md:text-4xl mb-3"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {lang.flag}
                  </motion.div>
                  
                  {/* Language name */}
                  <div className="text-sm md:text-base font-bold leading-tight">
                    {lang.name}
                  </div>
                </div>

                {/* Hover ripple effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0.1 }}
                  className="absolute inset-0 bg-white rounded-3xl"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px rgba(124, 110, 242, 0.6)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="group relative px-16 py-6 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-purple text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-500 overflow-hidden"
          >
            {/* Button glow effect */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-purple opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-4">
              {t('getStarted')}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center"
              >
                <ChevronUpIcon className="h-6 w-6" />
              </motion.div>
            </span>

            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </motion.button>

          {/* Enhanced hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="mt-6 text-gray-400 text-lg font-light"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {t('swipeToContinue')}
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-primary-400/40 hidden lg:block"
        >
          <SparklesIcon className="h-12 w-12" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute top-32 right-32 text-accent-purple/40 hidden lg:block"
        >
          <SparklesIcon className="h-8 w-8" />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 