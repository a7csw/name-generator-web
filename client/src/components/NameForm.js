import React from 'react';
import { motion } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useCultures, useGenders, useGenerateNames } from '../hooks/useNameGenerator';
import useNameStore from '../store/useNameStore';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';

const NameForm = () => {
  const { 
    filters, 
    setFilters, 
    isGenerating, 
    selectedGender, 
    selectedRegion, 
    selectedFeeling,
    setGender,
    setRegion,
    setFeeling,
    goBack,
    t 
  } = useNameStore();
  
  const { data: cultures = [], isLoading: culturesLoading } = useCultures();
  const { data: genders = [], isLoading: gendersLoading } = useGenders();
  const generateNamesMutation = useGenerateNames();

  // Auto-populate based on wizard selections
  React.useEffect(() => {
    if (selectedGender && selectedRegion) {
      // Map region to culture for API compatibility
      const regionToCulture = {
        'arabic': 'muslim',
        'islamic': 'muslim',
        'asian': 'hindu', 
        'western': 'christian',
        'jewish': 'jewish',
        'african': 'muslim',
        'global': 'christian',
        'latin': 'christian',
        'north_american': 'christian',
        'european': 'christian',
        'slavic': 'christian',
        'scandinavian': 'christian',
        'oceanic': 'christian',
        'korean': 'hindu',
        'japanese': 'hindu'
      };
      
      setFilters({
        gender: selectedGender,
        culture: regionToCulture[selectedRegion] || 'christian',
      });
    }
  }, [selectedGender, selectedRegion, setFilters]);

  const selectedGenderData = genders.find(g => g.id === filters.gender);
  const selectedCulture = cultures.find(c => c.id === filters.culture);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filters.gender || !filters.culture) return;
    
    generateNamesMutation.mutate({
      gender: filters.gender,
      culture: filters.culture,
      count: filters.count,
      feeling: selectedFeeling,
    });
  };

  const handleGenderChange = (gender) => {
    setGender(gender?.id || '');
    setFilters({ gender: gender?.id || '' });
  };

  const handleCultureChange = (culture) => {
    // Update the region based on culture selection
    const cultureToRegion = {
      'muslim': 'arabic',
      'hindu': 'asian',
      'christian': 'western',
      'jewish': 'jewish'
    };
    setRegion(cultureToRegion[culture?.id] || 'global');
    setFilters({ culture: culture?.id || '' });
  };

  const canGenerate = filters.gender && filters.culture && !isGenerating;

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
          className="absolute top-20 right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-80 h-80 bg-accent-purple/8 rounded-full blur-3xl"
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ 
          scale: 1.05, 
          x: -2,
          boxShadow: "0 0 15px rgba(124, 110, 242, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={goBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-200 rounded-2xl hover:bg-white/10"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span className="font-medium">{t('back')}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <div className="max-w-7xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12 pt-16 md:pt-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-6"
            >
              <SparklesIcon className="h-16 w-16 text-primary-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
              {t('generateNames')}
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto">
              {t('fineTune')}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8"
          >
            
            {/* Selection Summary - Left Column */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-primary-500/10 to-accent-purple/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary-500/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <SparklesIcon className="h-6 w-6 text-primary-400" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">{t('yourSelection')}</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Gender Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {selectedGender === 'male' ? '👨' : selectedGender === 'female' ? '👩' : '👥'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{t('gender')}</p>
                        <p className="text-white font-bold text-base capitalize break-words">{t(selectedGender || 'male')}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Origin Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">🌍</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{t('origin')}</p>
                        <p className="text-white font-bold text-base break-words">{t(selectedRegion || 'global')}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Feeling Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">✨</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{t('feeling')}</p>
                        <p className="text-white font-bold text-base break-words">{t(selectedFeeling || 'unique')}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Form Controls - Center Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 md:p-8">
                
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  
                  {/* Gender Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {t('gender')} *
                    </label>
                    <Listbox value={selectedGenderData} onChange={handleGenderChange}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-4 pl-4 pr-12 text-left border border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300">
                          <span className="block truncate text-white">
                            {selectedGenderData?.label || t(selectedGender || 'male')}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>
                        
                        <Transition
                          leave="transition ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-dark-800/90 backdrop-blur-xl py-2 shadow-2xl border border-white/10 focus:outline-none">
                            {gendersLoading ? (
                              <div className="flex items-center justify-center py-6">
                                <LoadingSpinner size="sm" />
                              </div>
                            ) : (
                              genders.map((gender) => (
                                <Listbox.Option
                                  key={gender.id}
                                  value={gender}
                                  className={({ active }) =>
                                    clsx(
                                      'relative cursor-pointer select-none py-3 pl-12 pr-4 mx-2 rounded-xl transition-colors duration-200',
                                      active
                                        ? 'bg-primary-500/20 text-primary-200'
                                        : 'text-white hover:bg-white/5'
                                    )
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span className="block truncate font-medium">
                                        {gender.label}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary-400">
                                          <CheckIcon className="h-5 w-5" />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* Culture Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {t('culturalOrigin')} *
                    </label>
                    <Listbox value={selectedCulture} onChange={handleCultureChange}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-4 pl-4 pr-12 text-left border border-white/10 hover:border-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300">
                          <span className="block truncate text-white">
                            {selectedCulture?.label || t(selectedRegion || 'global')}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>
                        
                        <Transition
                          leave="transition ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-dark-800/90 backdrop-blur-xl py-2 shadow-2xl border border-white/10 focus:outline-none">
                            {culturesLoading ? (
                              <div className="flex items-center justify-center py-6">
                                <LoadingSpinner size="sm" />
                              </div>
                            ) : (
                              cultures.map((culture) => (
                                <Listbox.Option
                                  key={culture.id}
                                  value={culture}
                                  className={({ active }) =>
                                    clsx(
                                      'relative cursor-pointer select-none py-3 pl-12 pr-4 mx-2 rounded-xl transition-colors duration-200',
                                      active
                                        ? 'bg-primary-500/20 text-primary-200'
                                        : 'text-white hover:bg-white/5'
                                    )
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <div>
                                        <span className="block truncate font-medium">
                                          {culture.label}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1 block">
                                          {culture.description}
                                        </span>
                                      </div>
                                      {selected && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary-400">
                                          <CheckIcon className="h-5 w-5" />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* Count Selection - Enhanced Design */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      {t('numberOfNames')}
                    </label>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-white">{filters.count}</span>
                        <span className="text-sm text-gray-400">{t('names')}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={filters.count}
                          onChange={(e) => setFilters({ count: parseInt(e.target.value) || 1 })}
                          className="w-full h-3 bg-white/10 rounded-2xl appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>1</span>
                          <span>5</span>
                          <span>10</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 font-light mt-3 text-center">
                        {t('chooseBetween')}
                      </p>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    loading={isGenerating}
                    disabled={!canGenerate}
                    className="w-full text-lg font-bold py-5"
                  >
                    ✨ {t('generateBeautiful')}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Information Panel - Right Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 md:p-8 h-full">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4"
                  >
                    <SparklesIcon className="h-12 w-12 text-primary-400 mx-auto" />
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {t('readyToDiscover')}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {t('generateBeautiful')} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('culturalTraditions')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                    <div className="text-2xl mb-2">💖</div>
                    <h4 className="text-white font-semibold text-sm mb-1">{t('meaningfulOrigins')}</h4>
                    <p className="text-gray-400 text-xs">{t('meaningfulOriginsDesc')}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                    <div className="text-2xl mb-2">🌟</div>
                    <h4 className="text-white font-semibold text-sm mb-1">{t('culturalAuthenticity')}</h4>
                    <p className="text-gray-400 text-xs">{t('culturalAuthenticityDesc')}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                    <div className="text-2xl mb-2">📋</div>
                    <h4 className="text-white font-semibold text-sm mb-1">{t('easyToCopy')}</h4>
                    <p className="text-gray-400 text-xs">{t('easyToCopyDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NameForm; 