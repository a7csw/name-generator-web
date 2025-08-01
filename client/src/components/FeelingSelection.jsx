import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, HeartIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore';

const FeelingSelection = () => {
  const { selectedGender, selectedRegion, selectedFeeling, setFeeling, goToGenerator, goBack, t } = useNameStore();

  const feelingOptions = [
    {
      id: 'unique',
      nameKey: 'unique',
      emoji: '✨',
      gradient: 'from-purple-500/10 to-violet-500/10',
      bgGlow: 'group-hover:shadow-purple-500/20',
      accent: 'text-purple-400',
      descriptionKey: 'uniqueDesc',
      patternKey: 'uniquePattern',
      patternColor: 'text-purple-400'
    },
    {
      id: 'strong',
      nameKey: 'strong',
      emoji: '💪',
      gradient: 'from-red-500/10 to-orange-500/10',
      bgGlow: 'group-hover:shadow-red-500/20',
      accent: 'text-red-400',
      descriptionKey: 'strongDesc',
      patternKey: 'strongPattern',
      patternColor: 'text-red-400'
    },
    {
      id: 'beautiful',
      nameKey: 'beautiful',
      emoji: '🌸',
      gradient: 'from-pink-500/10 to-rose-500/10',
      bgGlow: 'group-hover:shadow-pink-500/20',
      accent: 'text-pink-400',
      descriptionKey: 'beautifulDesc',
      patternKey: 'beautifulPattern',
      patternColor: 'text-pink-400'
    },
    {
      id: 'wise',
      nameKey: 'wise',
      emoji: '🧠',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      bgGlow: 'group-hover:shadow-blue-500/20',
      accent: 'text-blue-400',
      descriptionKey: 'wiseDesc',
      patternKey: 'wisePattern',
      patternColor: 'text-blue-400'
    },
    {
      id: 'peaceful',
      nameKey: 'peaceful',
      emoji: '🕊️',
      gradient: 'from-green-500/10 to-emerald-500/10',
      bgGlow: 'group-hover:shadow-green-500/20',
      accent: 'text-green-400',
      descriptionKey: 'peacefulDesc',
      patternKey: 'peacefulPattern',
      patternColor: 'text-green-400'
    },
    {
      id: 'brave',
      nameKey: 'brave',
      emoji: '🦁',
      gradient: 'from-yellow-500/10 to-orange-500/10',
      bgGlow: 'group-hover:shadow-yellow-500/20',
      accent: 'text-yellow-400',
      descriptionKey: 'braveDesc',
      patternKey: 'bravePattern',
      patternColor: 'text-yellow-400'
    },
    {
      id: 'gentle',
      nameKey: 'gentle',
      emoji: '🕯️',
      gradient: 'from-teal-500/10 to-cyan-500/10',
      bgGlow: 'group-hover:shadow-teal-500/20',
      accent: 'text-teal-400',
      descriptionKey: 'gentleDesc',
      patternKey: 'gentlePattern',
      patternColor: 'text-teal-400'
    },
    {
      id: 'mysterious',
      nameKey: 'mysterious',
      emoji: '🔮',
      gradient: 'from-indigo-500/10 to-purple-500/10',
      bgGlow: 'group-hover:shadow-indigo-500/20',
      accent: 'text-indigo-400',
      descriptionKey: 'mysteriousDesc',
      patternKey: 'mysteriousPattern',
      patternColor: 'text-indigo-400'
    },
    {
      id: 'joyful',
      nameKey: 'joyful',
      emoji: '🎉',
      gradient: 'from-yellow-500/10 to-pink-500/10',
      bgGlow: 'group-hover:shadow-yellow-500/20',
      accent: 'text-yellow-400',
      descriptionKey: 'joyfulDesc',
      patternKey: 'joyfulPattern',
      patternColor: 'text-yellow-400'
    },
    {
      id: 'noble',
      nameKey: 'noble',
      emoji: '👑',
      gradient: 'from-yellow-500/10 to-amber-500/10',
      bgGlow: 'group-hover:shadow-yellow-500/20',
      accent: 'text-yellow-400',
      descriptionKey: 'nobleDesc',
      patternKey: 'noblePattern',
      patternColor: 'text-amber-400'
    },
    {
      id: 'passionate',
      nameKey: 'passionate',
      emoji: '🔥',
      gradient: 'from-red-500/10 to-pink-500/10',
      bgGlow: 'group-hover:shadow-red-500/20',
      accent: 'text-red-400',
      descriptionKey: 'passionateDesc',
      patternKey: 'passionatePattern',
      patternColor: 'text-pink-400'
    },
    {
      id: 'creative',
      nameKey: 'creative',
      emoji: '🎨',
      gradient: 'from-purple-500/10 to-pink-500/10',
      bgGlow: 'group-hover:shadow-purple-500/20',
      accent: 'text-purple-400',
      descriptionKey: 'creativeDesc',
      patternKey: 'creativePattern',
      patternColor: 'text-pink-400'
    },
    {
      id: 'adventurous',
      nameKey: 'adventurous',
      emoji: '🗺️',
      gradient: 'from-green-500/10 to-blue-500/10',
      bgGlow: 'group-hover:shadow-green-500/20',
      accent: 'text-green-400',
      descriptionKey: 'adventurousDesc',
      patternKey: 'adventurousPattern',
      patternColor: 'text-blue-400'
    },
    {
      id: 'elegant',
      nameKey: 'elegant',
      emoji: '💎',
      gradient: 'from-gray-500/10 to-slate-500/10',
      bgGlow: 'group-hover:shadow-gray-500/20',
      accent: 'text-gray-400',
      descriptionKey: 'elegantDesc',
      patternKey: 'elegantPattern',
      patternColor: 'text-slate-400'
    },
    {
      id: 'loyal',
      nameKey: 'loyal',
      emoji: '🐕',
      gradient: 'from-brown-500/10 to-amber-500/10',
      bgGlow: 'group-hover:shadow-brown-500/20',
      accent: 'text-brown-400',
      descriptionKey: 'loyalDesc',
      patternKey: 'loyalPattern',
      patternColor: 'text-amber-400'
    },
    {
      id: 'radiant',
      nameKey: 'radiant',
      emoji: '☀️',
      gradient: 'from-yellow-500/10 to-orange-500/10',
      bgGlow: 'group-hover:shadow-yellow-500/20',
      accent: 'text-yellow-400',
      descriptionKey: 'radiantDesc',
      patternKey: 'radiantPattern',
      patternColor: 'text-orange-400'
    }
  ];

  const handleFeelingSelect = (feeling) => {
    setFeeling(feeling.id);
    goToGenerator();
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
        <div className="max-w-6xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 pt-16"
          >
            {/* Selection progression */}
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              <span className="text-xs text-gray-400">{t('gender')}:</span>
              <span className="text-xs font-medium text-white capitalize">{t(selectedGender || 'male')}</span>
              <span className="text-xs text-gray-400 mx-2">→</span>
              <span className="text-xs text-gray-400">{t('origin')}:</span>
              <span className="text-xs font-medium text-white">{t(selectedRegion || 'global')}</span>
              <span className="text-xs text-gray-400 mx-2">→</span>
              <span className="text-xs text-gray-400">{t('feeling')}</span>
            </div>
            
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
              <HeartIcon className="h-8 w-8 text-primary-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-3 leading-tight px-4">
              {t('chooseFeeling')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
              {t('selectEmotional')}
            </p>
          </motion.div>

          {/* Feelings Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {feelingOptions.map((feeling, index) => (
                <motion.div
                  key={feeling.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.05,
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
                  onClick={() => handleFeelingSelect(feeling)}
                  className="group cursor-pointer perspective-1000"
                >
                  <div className={`
                    relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl 
                    rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 
                    transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl h-full
                    ${feeling.bgGlow}
                  `}>
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feeling.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      
                      {/* Header with emoji and accent */}
                      <div className="flex items-start justify-between mb-3">
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
                          {feeling.emoji}
                        </motion.div>
                        <div className={`w-2 h-2 ${feeling.accent.replace('text-', 'bg-')} rounded-full opacity-60`} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight break-words min-h-[2.5rem] flex items-center">
                        {t(feeling.nameKey)}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs md:text-sm text-gray-400 mb-3 flex-1 leading-relaxed">
                        {t(feeling.descriptionKey)}
                      </p>
                      
                      {/* Pattern */}
                      <p className={`text-xs font-medium ${feeling.patternColor} mb-3 leading-relaxed`}>
                        {t(feeling.patternKey)}
                      </p>
                      
                      {/* NAME STYLE section - Fixed design */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 mt-auto">
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                          {t('nameStyle')}
                        </div>
                        <div className={`text-xs font-medium ${feeling.patternColor} leading-relaxed line-clamp-2`}>
                          {t(feeling.patternKey)}
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

export default FeelingSelection; 