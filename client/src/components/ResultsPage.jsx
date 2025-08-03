import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, SparklesIcon, ClipboardDocumentIcon, SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore.js';

const ResultsPage = () => {
  const { 
    selectedGender, 
    selectedRegion, 
    selectedFeeling, 
    goBack, 
    resetWizard, 
    t,
    generatedNames,
    setGeneratedNames,
    isGenerating,
    setIsGenerating
  } = useNameStore();

  const [copiedName, setCopiedName] = useState(null);
  const [speakingName, setSpeakingName] = useState(null);

  // Mock data for demonstration
  const mockNames = {
    male: {
      arabic: [
        { name: 'Ahmed', meaning: 'Most praised one, praiseworthy' },
        { name: 'Ali', meaning: 'Elevated, noble, high' },
        { name: 'Omar', meaning: 'Life, flourishing' },
        { name: 'Hassan', meaning: 'Beautiful, good, handsome' },
        { name: 'Yusuf', meaning: 'God will increase' }
      ],
      jewish: [
        { name: 'Matthew', meaning: 'Gift of God' },
        { name: 'John', meaning: 'God is gracious' },
        { name: 'Michael', meaning: 'Who is like God?' },
        { name: 'David', meaning: 'Beloved' },
        { name: 'Daniel', meaning: 'God is my judge' }
      ],
      western: [
        { name: 'William', meaning: 'Resolute protector' },
        { name: 'James', meaning: 'Supplanter' },
        { name: 'Robert', meaning: 'Bright fame' },
        { name: 'John', meaning: 'God is gracious' },
        { name: 'Michael', meaning: 'Who is like God?' }
      ]
    },
    female: {
      arabic: [
        { name: 'Aisha', meaning: 'Living, alive, she who lives' },
        { name: 'Fatima', meaning: 'Captivating, one who abstains' },
        { name: 'Maryam', meaning: 'Wished-for child, rebellion' },
        { name: 'Khadija', meaning: 'Premature child' },
        { name: 'Amina', meaning: 'Trustworthy, honest' }
      ],
      jewish: [
        { name: 'Mary', meaning: 'Wished-for child, rebellion' },
        { name: 'Sarah', meaning: 'Princess, noblewoman' },
        { name: 'Elizabeth', meaning: 'God is my oath' },
        { name: 'Grace', meaning: 'God\'s favor' },
        { name: 'Faith', meaning: 'Trust, belief' }
      ],
      western: [
        { name: 'Emma', meaning: 'Universal, whole' },
        { name: 'Olivia', meaning: 'Olive tree' },
        { name: 'Ava', meaning: 'Life, bird' },
        { name: 'Isabella', meaning: 'God is my oath' },
        { name: 'Sophia', meaning: 'Wisdom' }
      ]
    }
  };

  useEffect(() => {
    generateNames();
  }, []);

  const generateNames = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get mock data based on selections
    const names = mockNames[selectedGender]?.[selectedRegion] || mockNames[selectedGender]?.western || [];
    
    setGeneratedNames(names);
    setIsGenerating(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedName(text);
      setTimeout(() => setCopiedName(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyAllNames = async () => {
    const allNames = generatedNames.map(item => `${item.name} - ${item.meaning}`).join('\n');
    await copyToClipboard(allNames);
  };

  const speakName = (name) => {
    if ('speechSynthesis' in window) {
      if (speakingName === name) {
        window.speechSynthesis.cancel();
        setSpeakingName(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(name);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.onend = () => setSpeakingName(null);
        utterance.onerror = () => setSpeakingName(null);
        setSpeakingName(name);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1], opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20, repeat: Infinity, ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1], opacity: [0.02, 0.06, 0.02],
          }}
          transition={{
            duration: 25, repeat: Infinity, ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-56 h-56 bg-accent-purple/8 rounded-full blur-2xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 bg-white/5 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={goBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              {t('back')}
            </motion.button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
                {t('yourBeautifulNames')}
              </h1>
              <p className="text-sm text-gray-400">
                {t(selectedGender)} • {t(selectedRegion)} • {t(selectedFeeling)}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetWizard}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10"
            >
              {t('startOver')}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-6"
              >
                <SparklesIcon className="h-16 w-16 text-primary-400 mx-auto" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">{t('creatingNames')}</h2>
              <p className="text-gray-400">{t('craftingNames')}</p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 text-primary-400"
              >
                {t('weavingMagic')}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {!isGenerating && generatedNames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyAllNames}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border border-white/20"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {t('copyAll')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNames}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  {t('generateMore')}
                </motion.button>
              </div>

              {/* Names Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedNames.map((nameData, index) => (
                  <motion.div
                    key={`${nameData.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:bg-white/8 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                          {nameData.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {nameData.meaning}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(nameData.name)}
                          className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/10"
                          title="Copy name"
                        >
                          <ClipboardDocumentIcon className="h-5 w-5" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => speakName(nameData.name)}
                          className={`p-2 rounded-xl transition-all duration-200 ${
                            speakingName === nameData.name 
                              ? 'text-primary-400 bg-primary-400/20' 
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                          title="Speak name"
                        >
                          <SpeakerWaveIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Copy feedback */}
                    {copiedName === nameData.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-emerald-400 text-sm font-medium"
                      >
                        {t('copied')}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultsPage; 