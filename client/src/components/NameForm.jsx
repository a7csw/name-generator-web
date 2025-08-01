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
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.12, 0.05],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-purple/20 to-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.06, 0.02],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-pink/15 to-accent-orange/15 rounded-full blur-3xl"
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
        <div className="max-w-5xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
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
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-3xl flex items-center justify-center mx-auto border border-primary-500/30">
                <SparklesIcon className="h-10 w-10 text-primary-400" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-purple bg-clip-text text-transparent mb-6 leading-tight">
              {t('generateNames')}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('fineTune')}
            </p>
          </motion.div>

          {/* Centered Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-primary-500/10 via-accent-purple/10 to-accent-pink/10 backdrop-blur-xl rounded-3xl p-8 border border-primary-500/20 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('yourSelection')}</h3>
                <p className="text-gray-400">Review and adjust your preferences</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gender Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-primary-500/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                      <span className="text-3xl">
                        {selectedGender === 'male' ? '👨' : selectedGender === 'female' ? '👩' : '👥'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">{t('gender')}</p>
                    <p className="text-white font-bold text-xl capitalize">{t(selectedGender || 'male')}</p>
                  </div>
                </motion.div>

                {/* Origin Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-purple/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-accent-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-purple/30 transition-colors duration-300">
                      <span className="text-3xl">🌍</span>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">{t('origin')}</p>
                    <p className="text-white font-bold text-xl">{t(selectedRegion || 'global')}</p>
                  </div>
                </motion.div>

                {/* Feeling Selection */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-pink/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-accent-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-pink/30 transition-colors duration-300">
                      <span className="text-3xl">✨</span>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">{t('feeling')}</p>
                    <p className="text-white font-bold text-xl">{t(selectedFeeling || 'unique')}</p>
                  </div>
                </motion.div>
              </div>

              {/* Name Count Progress */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-white">{filters.count}</span>
                    <span className="text-lg text-gray-400">{t('names')}</span>
                  </div>
                  <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary-500 to-accent-purple h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(filters.count / 10) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {t('chooseBetween')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Customize Your Selection</h3>
              <p className="text-gray-400">Fine-tune your preferences for the perfect names</p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
              
              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                  {t('gender')} *
                </label>
                <Listbox value={selectedGenderData} onChange={handleGenderChange}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-5 pl-6 pr-12 text-left border border-white/10 hover:border-primary-500/40 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 text-lg">
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
                <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                  {t('culturalOrigin')} *
                </label>
                <Listbox value={selectedCulture} onChange={handleCultureChange}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm py-5 pl-6 pr-12 text-left border border-white/10 hover:border-primary-500/40 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 text-lg">
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
                <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                  {t('numberOfNames')}
                </label>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-white">{filters.count}</span>
                    <span className="text-xl text-gray-400">{t('names')}</span>
                  </div>
                  <div className="relative mb-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={filters.count}
                      onChange={(e) => setFilters({ count: parseInt(e.target.value) || 1 })}
                      className="w-full h-4 bg-white/10 rounded-2xl appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {t('chooseBetween')}
                  </p>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  loading={isGenerating}
                  disabled={!canGenerate}
                  className="w-full text-xl font-bold py-6 rounded-2xl"
                >
                  ✨ {t('generateBeautiful')}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('readyToDiscover')}</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t('generateBeautifulNames')} {t(selectedGender || 'male')} {t('names')} {t('from')} {t(selectedRegion || 'global')} {t('fromCulturalTraditions')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">💖</div>
                <h4 className="text-white font-semibold text-lg mb-2">{t('meaningfulOrigins')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t('meaningfulOriginsDesc')}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">🌟</div>
                <h4 className="text-white font-semibold text-lg mb-2">{t('culturalAuthenticity')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t('culturalAuthenticityDesc')}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center group hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">📋</div>
                <h4 className="text-white font-semibold text-lg mb-2">{t('easyToCopy')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t('easyToCopyDesc')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NameForm; 