import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore';

const GenderSelection = () => {
  const { setGender, goToRegionSelection, goBack, t } = useNameStore();

  const genderOptions = [
    {
      id: 'male',
      nameKey: 'male',
      emoji: '👨',
      icon: '♂️',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      bgGlow: 'group-hover:shadow-blue-500/20',
      accent: 'text-blue-400',
      descriptionKey: 'maleDesc',
      patternKey: 'malePattern',
      patternColor: 'text-blue-400'
    },
    {
      id: 'female',
      nameKey: 'female',
      emoji: '👩',
      icon: '♀️',
      gradient: 'from-pink-500/10 to-rose-500/10',
      bgGlow: 'group-hover:shadow-pink-500/20',
      accent: 'text-pink-400',
      descriptionKey: 'femaleDesc',
      patternKey: 'femalePattern',
      patternColor: 'text-pink-400'
    },
    {
      id: 'unisex',
      nameKey: 'unisex',
      emoji: '👥',
      icon: '⚧',
      gradient: 'from-purple-500/10 to-violet-500/10',
      bgGlow: 'group-hover:shadow-purple-500/20',
      accent: 'text-purple-400',
      descriptionKey: 'unisexDesc',
      patternKey: 'unisexPattern',
      patternColor: 'text-purple-400'
    }
  ];

  const handleGenderSelect = (gender) => {
    setGender(gender.id);
    goToRegionSelection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.02, 0.06, 0.02],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-56 h-56 bg-accent-purple/8 rounded-full blur-2xl"
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={goBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/10"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{t('back')}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 pt-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-4"
            >
              <SparklesIcon className="h-8 w-8 text-primary-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-3 leading-tight px-4">
              {t('chooseCategory')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
              {t('selectGender')}
            </p>
          </motion.div>

          {/* Gender Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {genderOptions.map((gender, index) => (
                <motion.div
                  key={gender.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGenderSelect(gender)}
                  className="group cursor-pointer perspective-1000"
                >
                  <div className={`
                    relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl 
                    rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 
                    transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl h-full
                    ${gender.bgGlow}
                  `}>
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gender.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      
                      {/* Header with emoji and accent */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-2xl md:text-3xl"
                        >
                          {gender.emoji}
                        </motion.div>
                        <div className={`w-2 h-2 ${gender.accent.replace('text-', 'bg-')} rounded-full opacity-60`} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight break-words min-h-[3rem] flex items-center">
                        {t(gender.nameKey)}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-gray-400 mb-4 flex-1 leading-relaxed">
                        {t(gender.descriptionKey)}
                      </p>
                      
                      {/* Pattern */}
                      <p className={`text-sm font-medium ${gender.patternColor} mb-4 leading-relaxed`}>
                        {t(gender.patternKey)}
                      </p>
                      
                      {/* NAME STYLE section - Fixed design */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 mt-auto">
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                          {t('nameStyle')}
                        </div>
                        <div className={`text-xs font-medium ${gender.patternColor} leading-relaxed line-clamp-2`}>
                          {t(gender.patternKey)}
                        </div>
                      </div>
                      
                      {/* Next indicator */}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="text-xs text-primary-400 font-bold">→</div>
                      </motion.div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500 font-light">
              {t('clickToSelect')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection; 