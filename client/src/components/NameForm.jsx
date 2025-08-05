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
      // Map region to culture for API compatibility - use the actual region names
      const regionToCulture = {
        'arabic': 'arabic',
        'islamic': 'islamic',
        'asian': 'asian', 
        'western': 'western',
        'jewish': 'jewish',
        'african': 'african',
        'global': 'global',
        'latin': 'latin',
        'northAmerican': 'northAmerican',
        'european': 'european',
        'slavic': 'slavic',
        'scandinavian': 'scandinavian',
        'oceanic': 'oceanic',
        'korean': 'korean',
        'japanese': 'japanese'
      };
      
      setFilters({
        gender: selectedGender,
        culture: regionToCulture[selectedRegion] || 'global',
      });
    }
  }, [selectedGender, selectedRegion, setFilters]);

  const selectedGenderData = genders.find(g => g.id === filters.gender);
  const selectedCulture = cultures.find(c => c.id === filters.culture);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filters.gender || !filters.culture) return;
    
    console.log('🚀 Submitting name generation request with:', {
      gender: filters.gender,
      culture: filters.culture,
      count: filters.count,
      feeling: selectedFeeling,
    });
    
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
    // Update the region based on culture selection - use direct mapping
    const cultureToRegion = {
      'arabic': 'arabic',
      'islamic': 'islamic',
      'asian': 'asian',
      'western': 'western',
      'jewish': 'jewish',
      'african': 'african',
      'global': 'global',
      'latin': 'latin',
      'northAmerican': 'northAmerican',
      'european': 'european',
      'slavic': 'slavic',
      'scandinavian': 'scandinavian',
      'oceanic': 'oceanic',
      'korean': 'korean',
      'japanese': 'japanese'
    };
    setRegion(cultureToRegion[culture?.id] || 'global');
    setFilters({ culture: culture?.id || '' });
  };

  const canGenerate = filters.gender && filters.culture && !isGenerating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.02, 0.08, 0.02],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary-500/15 to-accent-purple/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.1, 0.03],
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-accent-purple/15 to-primary-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.01, 0.05, 0.01],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-accent-pink/10 to-accent-orange/10 rounded-full blur-3xl"
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={goBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10 backdrop-blur-sm border border-white/10"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{t('back')}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <div className="max-w-4xl w-full mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
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
              className="mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-3xl flex items-center justify-center mx-auto border border-primary-500/30 shadow-2xl">
                <SparklesIcon className="h-12 w-12 text-primary-400" />
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-purple bg-clip-text text-transparent mb-8 leading-tight">
              {t('generateNames')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              {t('fineTune')}
            </p>
          </motion.div>

          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/5 via-primary-500/5 to-accent-purple/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12"
          >
            
            {/* Summary Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('yourSelection')}</h3>
              <p className="text-gray-400 text-lg mb-8">Review and adjust your preferences</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Gender Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-primary-500/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                      <span className="text-4xl">
                        {selectedGender === 'male' ? '👨' : selectedGender === 'female' ? '👩' : '👥'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-2">{t('gender')}</p>
                    <p className="text-white font-bold text-2xl capitalize">{t(selectedGender || 'male')}</p>
                  </div>
                </motion.div>

                {/* Origin Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-purple/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-purple/30 transition-colors duration-300">
                      <span className="text-4xl">🌍</span>
                    </div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-2">{t('origin')}</p>
                    <p className="text-white font-bold text-2xl">{t(selectedRegion || 'global')}</p>
                  </div>
                </motion.div>

                {/* Feeling Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-pink/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-accent-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-pink/30 transition-colors duration-300">
                      <span className="text-4xl">✨</span>
                    </div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-2">{t('feeling')}</p>
                    <p className="text-white font-bold text-2xl">{t(selectedFeeling || 'unique')}</p>
                  </div>
                </motion.div>
              </div>

              {/* Name Count Progress */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-white">{filters.count}</span>
                    <span className="text-2xl text-gray-400">{t('names')}</span>
                  </div>
                  <div className="w-full max-w-lg mx-auto bg-white/10 rounded-full h-4 overflow-hidden mb-4">
                    <motion.div 
                      className="bg-gradient-to-r from-primary-500 to-accent-purple h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(filters.count / 10) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-gray-500 text-lg">
                    {t('chooseBetween')}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Controls */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Customize Your Selection</h3>
              <p className="text-gray-400 text-lg mb-8">Fine-tune your preferences for the perfect names</p>
              
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                
                {/* Gender Selection */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    {t('gender')} *
                  </label>
                  <Listbox value={selectedGenderData} onChange={handleGenderChange}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-6 pl-6 pr-12 text-left border border-white/10 hover:border-primary-500/40 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 text-xl">
                        <span className="block truncate text-white">
                          {selectedGenderData?.label || t(selectedGender || 'male')}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <ChevronUpDownIcon className="h-6 w-6 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      
                      <Transition
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-dark-800/95 backdrop-blur-xl py-2 shadow-2xl border border-white/10 focus:outline-none">
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
                                    'relative cursor-pointer select-none py-4 pl-12 pr-4 mx-2 rounded-xl transition-colors duration-200 text-lg',
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
                                        <CheckIcon className="h-6 w-6" />
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
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    {t('culturalOrigin')} *
                  </label>
                  <Listbox value={selectedCulture} onChange={handleCultureChange}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-6 pl-6 pr-12 text-left border border-white/10 hover:border-primary-500/40 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 text-xl">
                        <span className="block truncate text-white">
                          {selectedCulture?.label || t(selectedRegion || 'global')}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <ChevronUpDownIcon className="h-6 w-6 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      
                      <Transition
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-dark-800/95 backdrop-blur-xl py-2 shadow-2xl border border-white/10 focus:outline-none">
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
                                    'relative cursor-pointer select-none py-4 pl-12 pr-4 mx-2 rounded-xl transition-colors duration-200 text-lg',
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
                                        <CheckIcon className="h-6 w-6" />
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
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    {t('numberOfNames')}
                  </label>
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="text-5xl font-bold text-white">{filters.count}</span>
                      <span className="text-2xl text-gray-400">{t('names')}</span>
                    </div>
                    <div className="relative mb-6">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={filters.count}
                        onChange={(e) => setFilters({ count: parseInt(e.target.value) || 1 })}
                        className="w-full h-5 bg-white/10 rounded-2xl appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-lg text-gray-500 mt-4">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-lg">
                      {t('chooseBetween')}
                    </p>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    loading={isGenerating}
                    disabled={!canGenerate}
                    className="w-full text-2xl font-bold py-8 rounded-2xl"
                  >
                    ✨ {t('generateBeautiful')}
                  </Button>
                </div>
              </form>
            </div>

            {/* Feature Highlights */}
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('readyToDiscover')}</h3>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                {t('generateBeautifulNames')} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('fromCulturalTraditions')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-6">💖</div>
                  <h4 className="text-white font-semibold text-xl mb-4">{t('meaningfulOrigins')}</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{t('meaningfulOriginsDesc')}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-6">🌟</div>
                  <h4 className="text-white font-semibold text-xl mb-4">{t('culturalAuthenticity')}</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{t('culturalAuthenticityDesc')}</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-6">📋</div>
                  <h4 className="text-white font-semibold text-xl mb-4">{t('easyToCopy')}</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{t('easyToCopyDesc')}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NameForm; 