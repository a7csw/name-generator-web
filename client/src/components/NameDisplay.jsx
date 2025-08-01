import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, DocumentDuplicateIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import useNameStore from '../store/useNameStore';
import { useCopyToClipboard } from '../hooks/useNameGenerator';
import NameCard from './NameCard';
import Button from './ui/Button';

const NameDisplay = () => {
  const { 
    generatedNames, 
    isGenerating, 
    currentStep,
    selectedGender,
    selectedRegion,
    selectedFeeling,
    resetWizard,
    t 
  } = useNameStore();
  
  const copyToClipboard = useCopyToClipboard();
  const [copyAllSuccess, setCopyAllSuccess] = React.useState(false);

  const showInitialState = currentStep === 'generator' && generatedNames.length === 0 && !isGenerating;
  const showLoadingState = isGenerating;
  const showResultsState = generatedNames.length > 0 && !isGenerating;

  const handleCopyAll = () => {
    const allNames = generatedNames.map(name => `${name.name} - ${name.meaning}`).join('\n');
    copyToClipboard.mutate(allNames);
    setCopyAllSuccess(true);
    setTimeout(() => setCopyAllSuccess(false), 2000);
  };

  const handleGenerateMore = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-accent-purple/8 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 pt-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <SparklesIcon className="h-12 w-12 text-primary-400 mx-auto" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-purple bg-clip-text text-transparent mb-4">
              NameCraft
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t('discoverNames')}
            </p>
          </motion.div>

          {/* Initial State - Ready to discover */}
          <AnimatePresence mode="wait">
            {showInitialState && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-8"
                >
                  <div className="text-6xl mb-4">✨</div>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('readyToDiscover')}
                </h2>
                <p className="text-base md:text-lg text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                  {t('generateBeautifulNames')} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('fromCulturalTraditions')}
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="text-2xl mb-2">💝</div>
                    <p className="text-sm text-gray-300">{t('meaningfulOrigins')}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="text-2xl mb-2">🌟</div>
                    <p className="text-sm text-gray-300">{t('culturalAuthenticity')}</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <p className="text-sm text-gray-300">{t('easyToCopy')}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Loading State - Enhanced animations */}
            {showLoadingState && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="mb-8"
                >
                  <ArrowPathIcon className="h-16 w-16 text-primary-400 mx-auto" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('creatingNames')}
                </h2>
                
                <div className="max-w-md mx-auto mb-8">
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-base text-gray-400 mb-4"
                  >
                    {t('craftingNames')}
                  </motion.p>
                  
                  {/* Enhanced loading bar */}
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      animate={{ x: [-200, 200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-32 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                    />
                  </div>
                </div>

                {/* Loading magic text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-sm text-primary-300"
                >
                  ✨ {t('weavingMagic')} ✨
                </motion.div>
              </motion.div>
            )}

            {/* Results State - Enhanced layout */}
            {showResultsState && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Results header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
                >
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {t('yourBeautifulNames')} ✨
                    </h2>
                    <p className="text-sm md:text-base text-gray-400">
                      {generatedNames.length} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('tradition')}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleCopyAll}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 min-w-[120px]"
                    >
                      <AnimatePresence mode="wait">
                        {copyAllSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <CheckIcon className="h-4 w-4 text-green-400" />
                            <span>{t('copied')}</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4" />
                            <span>{t('copyAll')}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>

                    <Button
                      onClick={handleGenerateMore}
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <SparklesIcon className="h-4 w-4" />
                      {t('generateMore')}
                    </Button>
                  </div>
                </motion.div>

                {/* Names grid - Enhanced responsiveness */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                  <AnimatePresence>
                    {generatedNames.map((name, index) => (
                      <motion.div
                        key={`${name.name}-${index}`}
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <NameCard name={name} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Bottom actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-center"
                >
                  <Button
                    onClick={resetWizard}
                    variant="outline"
                    size="lg"
                    className="mx-auto"
                  >
                    🎯 {t('startOver')}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NameDisplay; 