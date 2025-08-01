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
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/20 rounded-full blur-3xl"
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={goBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10 backdrop-blur-sm"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{t('back')}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
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
              className="mb-4"
            >
              <SparklesIcon className="h-12 w-12 text-primary-400 mx-auto" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-4 leading-tight px-4">
              {t('generateNames')}
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto px-4 leading-relaxed">
              {t('fineTune')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
          >
            {/* Selection Summary - Left Column */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="bg-gradient-to-br from-primary-500/10 to-accent-purple/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-primary-500/20 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary-500/20 rounded-xl">
                    <SparklesIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{t('yourSelection')}</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Gender Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">
                            {selectedGender === 'male' ? '👨' : selectedGender === 'female' ? '👩' : '👥'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{t('gender')}</p>
                        <p className="text-white font-bold text-lg capitalize break-words leading-tight">{t(selectedGender || 'male')}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-primary-400 rounded-full opacity-60" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Origin Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🌍</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{t('origin')}</p>
                        <p className="text-white font-bold text-lg break-words leading-tight">{t(selectedRegion || 'global')}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-accent-purple rounded-full opacity-60" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Feeling Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group relative bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent-pink/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">✨</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{t('feeling')}</p>
                        <p className="text-white font-bold text-lg break-words leading-tight">{t(selectedFeeling || 'unique')}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-accent-pink rounded-full opacity-60" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Summary Stats */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400 font-medium">{t('numberOfNames')}</span>
                      <span className="text-sm text-primary-400 font-bold">{filters.count}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-purple h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(filters.count / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {t('chooseBetween')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Controls - Center Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 md:p-8">
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary-500/20 rounded-xl">
                    <SparklesIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{t('generateNames')}</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  
                  {/* Gender Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      {t('gender')} *
                    </label>
                    <Listbox value={selectedGenderData} onChange={handleGenderChange}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-4 pl-4 pr-12 text-left border border-white/10 hover:border-primary-500/30 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300">
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
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-4 pl-4 pr-12 text-left border border-white/10 hover:border-primary-500/30 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300">
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
                                      <span className="block truncate font-medium">
                                        {culture.label}
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

                  {/* Count Selection */}
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
              className="lg:col-span-4"
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
                    className="mb-6"
                  >
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <SparklesIcon className="h-8 w-8 text-primary-400" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t('readyToDiscover')}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                    {t('generateBeautifulNames')} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('fromCulturalTraditions')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300">
                    <div className="text-3xl mb-3">💖</div>
                    <h4 className="text-white font-semibold text-base mb-2">{t('meaningfulOrigins')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('meaningfulOriginsDesc')}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300">
                    <div className="text-3xl mb-3">🌟</div>
                    <h4 className="text-white font-semibold text-base mb-2">{t('culturalAuthenticity')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('culturalAuthenticityDesc')}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300">
                    <div className="text-3xl mb-3">📋</div>
                    <h4 className="text-white font-semibold text-base mb-2">{t('easyToCopy')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('easyToCopyDesc')}</p>
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