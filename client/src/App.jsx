import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage.jsx';
import GenderSelection from './components/GenderSelection.jsx';
import RegionSelection from './components/RegionSelection.jsx';
import FeelingSelection from './components/FeelingSelection.jsx';
import NameForm from './components/NameForm.jsx';
import NameDisplay from './components/NameDisplay.jsx';
import useNameStore from './store/useNameStore.js';
import './App.css';

function App() {
  const { currentStep } = useNameStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'gender':
        return <GenderSelection />;
      case 'region':
        return <RegionSelection />;
      case 'feeling':
        return <FeelingSelection />;
      case 'generator':
        return <GeneratorPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Generator Page Component
const GeneratorPage = () => {
  const { selectedGender, selectedRegion, resetWizard } = useNameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      {/* Header with Back Button */}
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
              onClick={resetWizard}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Start Over
            </motion.button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
                NameCraft
              </h1>
              <p className="text-sm text-gray-400">
                {selectedGender} • {selectedRegion} names
              </p>
            </div>

            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <NameForm />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            <NameDisplay />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default App;
