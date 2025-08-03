import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon as HeartOutline, 
  SpeakerWaveIcon, 
  DocumentDuplicateIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid,
  CheckIcon 
} from '@heroicons/react/24/solid';
import { useCopyToClipboard } from '../hooks/useNameGenerator';
import Badge from './ui/Badge';
import Tooltip from './ui/Tooltip';
import useNameStore from '../store/useNameStore';

const NameCard = ({ name }) => {
  const { t } = useNameStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const copyToClipboard = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard.mutate(`${name.name} - ${name.meaning}`);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${name.name}. ${name.meaning}`);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getFeelingColor = (feeling) => {
    const feelingColors = {
      strong: 'emerald',
      beautiful: 'pink',
      wise: 'blue',
      peaceful: 'emerald',
      brave: 'orange',
      gentle: 'purple',
      mysterious: 'gray',
      joyful: 'yellow',
      noble: 'purple',
      creative: 'pink',
      adventurous: 'orange',
      elegant: 'purple',
      loyal: 'blue',
      radiant: 'yellow',
      unique: 'purple'
    };
    return feelingColors[feeling] || 'gray';
  };

  // Gender-based styling
  const getGenderStyling = () => {
    switch (name.gender) {
      case 'male':
        return {
          gradient: 'from-blue-500/10 to-indigo-500/10',
          accent: 'text-blue-400',
          border: 'border-blue-500/20',
          glow: 'group-hover:shadow-blue-500/20'
        };
      case 'female':
        return {
          gradient: 'from-pink-500/10 to-rose-500/10',
          accent: 'text-pink-400',
          border: 'border-pink-500/20',
          glow: 'group-hover:shadow-pink-500/20'
        };
      default:
        return {
          gradient: 'from-purple-500/10 to-violet-500/10',
          accent: 'text-purple-400',
          border: 'border-purple-500/20',
          glow: 'group-hover:shadow-purple-500/20'
        };
    }
  };

  const styling = getGenderStyling();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        layout: { duration: 0.3 }
      }}
      className="group relative"
    >
      <div className={`
        relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl 
        rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 
        transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl ${styling.glow}
      `}>
        
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styling.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
        
        {/* Content */}
        <div className="relative z-10">
          
          {/* Header with name and favorite */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight break-words"
                layout
              >
                {name.name}
              </motion.h3>
              
              {/* Origin and feeling badges */}
              <div className="flex flex-wrap gap-2 mb-2">
                {name.origin && (
                  <Badge 
                    variant="glass" 
                    size="xs" 
                    icon={<GlobeAltIcon className="w-3 h-3" />}
                    animated
                  >
                    {name.origin}
                  </Badge>
                )}
                {name.feeling && (
                  <Badge 
                    variant={getFeelingColor(name.feeling)} 
                    size="xs" 
                    animated
                  >
                    {name.feeling}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {/* Info button */}
              <Tooltip 
                content={`Learn more about the name "${name.name}"`}
                position="top"
                icon={true}
              />
              
              {/* Favorite button */}
              <motion.button
                onClick={toggleFavorite}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {isFavorite ? (
                    <motion.div
                      key="filled"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <HeartSolid className="h-5 w-5 text-red-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="outline"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <HeartOutline className="h-5 w-5 text-gray-400 hover:text-red-400 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
          
          {/* Meaning with rating */}
          <div className="mb-4">
            <motion.p 
              className="text-gray-300 text-sm md:text-base leading-relaxed break-words"
              layout
            >
              {name.meaning}
            </motion.p>
            
            {/* Name rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-3 h-3 ${
                      i < Math.floor(Math.random() * 3) + 3 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-500'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {Math.floor(Math.random() * 200) + 100} {t('peopleLoveThisName')}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            
            {/* Copy button */}
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex-1 justify-center min-w-0"
            >
              <AnimatePresence mode="wait">
                {showCopied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckIcon className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="truncate">{t('copied')}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <DocumentDuplicateIcon className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{t('copy')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Speak button */}
            <motion.button
              onClick={handleSpeak}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex-1 justify-center min-w-0"
            >
              <SpeakerWaveIcon className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{t('listen')}</span>
            </motion.button>
          </div>
        </div>
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
        
        {/* Corner accent */}
        <div className={`absolute top-3 right-3 w-2 h-2 ${styling.accent.replace('text-', 'bg-')} rounded-full opacity-60`} />
      </div>
    </motion.div>
  );
};

export default NameCard; 