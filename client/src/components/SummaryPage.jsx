import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore.js';
import { useGenerateNames } from '../hooks/useNameGenerator';
import axios from 'axios';

const API_URL = 'https://api.namegenerator.mohdrarprojects.com/generateGemini';

const SummaryPage = () => {
  const {
    selectedGender,
    selectedRegion,
    selectedFeeling,
    goBack,
    setIsGenerating,
    setGeneratedNames,
    setLastGenerated,
    setStep,
    t,
  } = useNameStore();

  const generateNamesMutation = useGenerateNames();

  const handleGenerateNames = async () => {
    try {
      setIsGenerating(true);

      const response = await axios.post(
        API_URL,
        {
          title: 'generating human names',
          role: 'you are an expert',
          nameStyle: selectedFeeling,
          nameGender: selectedGender,
          nameOrigin: selectedRegion,
          nameTone: selectedFeeling,
        }
      );

      console.log('API Response:', response.data);

      // Process the response data to match expected format
      let processedNames = [];

      // Check if response has names property with string format: **Name** - Description\n
      if (
        response.data &&
        response.data.names &&
        typeof response.data.names === 'string'
      ) {
        const namesString = response.data.names;

        // Parse the format: "1. **Name** - Description\n2. **Name** - Description\n..."
        const namePattern = /\*\*(.*?)\*\*\s*-\s*(.*?)(?=\n|$)/g;
        const matches = [...namesString.matchAll(namePattern)];

        if (matches.length > 0) {
          processedNames = matches.map(match => ({
            name: match[1].trim(),
            meaning: match[2].trim(),
            origin: selectedRegion,
            gender: selectedGender,
          }));
        }
      }

      // Fallback: if no names found, try other formats
      if (processedNames.length === 0) {
        if (response.data && Array.isArray(response.data)) {
          // If response.data is already an array of names
          processedNames = response.data.map(item => ({
            name: item.name || item,
            meaning: item.meaning || item.description || 'Beautiful name',
            origin: item.origin || selectedRegion,
            gender: item.gender || selectedGender,
          }));
        } else if (
          response.data &&
          response.data.names &&
          Array.isArray(response.data.names)
        ) {
          // If response.data has a names property as array
          processedNames = response.data.names.map(item => ({
            name: item.name || item,
            meaning: item.meaning || item.description || 'Beautiful name',
            origin: item.origin || selectedRegion,
            gender: item.gender || selectedGender,
          }));
        } else if (response.data && typeof response.data === 'object') {
          // If response.data is an object, try to extract names from various possible structures
          const possibleNameArrays = [
            response.data.result,
            response.data.data,
            Object.values(response.data).find(val => Array.isArray(val)),
          ];

          for (const nameArray of possibleNameArrays) {
            if (Array.isArray(nameArray) && nameArray.length > 0) {
              processedNames = nameArray.map(item => ({
                name: item.name || item,
                meaning: item.meaning || item.description || 'Beautiful name',
                origin: item.origin || selectedRegion,
                gender: item.gender || selectedGender,
              }));
              break;
            }
          }
        }
      }

      // Final fallback: if still no names, create from string response
      if (processedNames.length === 0 && response.data) {
        const responseText =
          typeof response.data === 'string'
            ? response.data
            : JSON.stringify(response.data);
        // Try to extract names from text (simple approach)
        const nameMatches = responseText.match(/[A-Z][a-z]+/g);
        if (nameMatches && nameMatches.length > 0) {
          processedNames = nameMatches.slice(0, 8).map(name => ({
            name: name,
            meaning: 'Beautiful name',
            origin: selectedRegion,
            gender: selectedGender,
          }));
        }
      }

      // Ensure we have at least some names
      if (processedNames.length === 0) {
        throw new Error('No names found in API response');
      }

      // Store the generated names
      setGeneratedNames(processedNames);
      setLastGenerated();
      setIsGenerating(false);

      // Navigate to the generator step (NameDisplay)
      setStep('generator');

      console.log('Successfully processed names:', processedNames);
    } catch (error) {
      console.error('Error generating names:', error);
      setIsGenerating(false);

      // Fallback: provide some default names
      const fallbackNames = [
        {
          name: 'Aria',
          meaning: 'Air, melody',
          origin: selectedRegion,
          gender: selectedGender,
        },
        {
          name: 'Luna',
          meaning: 'Moon',
          origin: selectedRegion,
          gender: selectedGender,
        },
        {
          name: 'Nova',
          meaning: 'New star',
          origin: selectedRegion,
          gender: selectedGender,
        },
        {
          name: 'Sage',
          meaning: 'Wise one',
          origin: selectedRegion,
          gender: selectedGender,
        },
        {
          name: 'River',
          meaning: 'Flowing water',
          origin: selectedRegion,
          gender: selectedGender,
        },
      ];

      setGeneratedNames(fallbackNames);
      setLastGenerated();
      setStep('generator');
    }
  };

  const selectionItems = [
    {
      label: t('gender'),
      value: t(selectedGender),
      icon:
        selectedGender === 'male'
          ? '👨'
          : selectedGender === 'female'
            ? '👩'
            : '👥',
      color:
        selectedGender === 'male'
          ? 'text-blue-400'
          : selectedGender === 'female'
            ? 'text-pink-400'
            : 'text-purple-400',
    },
    {
      label: t('origin'),
      value: t(selectedRegion),
      icon: getRegionIcon(selectedRegion),
      color: 'text-emerald-400',
    },
    {
      label: t('feeling'),
      value: t(selectedFeeling),
      icon: getFeelingIcon(selectedFeeling),
      color: 'text-yellow-400',
    },
  ];

  function getRegionIcon(region) {
    const icons = {
      arabic: '🇸🇦',
      islamic: '☪️',
      asian: '🇮🇳',
      western: '🇺🇸',
      jewish: '⛪',
      african: '🌍',
      global: '🌐',
      latin: '🇮🇹',
      north_american: '🇨🇦',
      european: '🇪🇺',
      slavic: '🇷🇺',
      scandinavian: '🇸🇪',
      oceanic: '🇦🇺',
      korean: '🇰🇷',
      japanese: '🇯🇵',
    };
    return icons[region] || '🌍';
  }

  function getFeelingIcon(feeling) {
    const icons = {
      strong: '💪',
      soft: '🌸',
      brave: '🛡️',
      mysterious: '🔮',
      wise: '🧠',
      joyful: '😊',
      noble: '👑',
      peaceful: '🕊️',
      passionate: '🔥',
      unique: '⭐',
      creative: '🎨',
      adventurous: '🗺️',
      elegant: '💎',
      loyal: '🤝',
      radiant: '✨',
    };
    return icons[feeling] || '✨';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
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
            ease: 'easeInOut',
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-16"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-6"
            >
              <SparklesIcon className="h-16 w-16 text-primary-400 mx-auto" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('readyToDiscover')}
            </h1>

            <p className="text-xl text-gray-300 font-light">
              {t('generateBeautifulNames')} {t('fromCulturalTraditions')}
            </p>
          </motion.div>

          {/* Selection Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {t('yourSelection')}
              </h2>

              <div className="space-y-4">
                {selectionItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">
                          {item.label}
                        </p>
                        <p className={`text-lg font-semibold ${item.color}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-emerald-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: t('meaningfulOrigins'),
                  description: t('meaningfulOriginsDesc'),
                  icon: '🌟',
                },
                {
                  title: t('culturalAuthenticity'),
                  description: t('culturalAuthenticityDesc'),
                  icon: '🏛️',
                },
                {
                  title: t('easyToCopy'),
                  description: t('easyToCopyDesc'),
                  icon: '📋',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="text-center p-4"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Generate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(124, 110, 242, 0.6)',
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateNames}
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
                <SparklesIcon className="h-6 w-6" />
                {t('generateBeautiful')}
                <SparklesIcon className="h-6 w-6" />
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
