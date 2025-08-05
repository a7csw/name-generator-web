import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage.jsx';
import GenderSelection from './components/GenderSelection.jsx';
import RegionSelection from './components/RegionSelection.jsx';
import FeelingSelection from './components/FeelingSelection.jsx';
import SummaryPage from './components/SummaryPage.jsx';
import NameDisplay from './components/NameDisplay.jsx';
import ResultsPage from './components/ResultsPage.jsx';
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
      case 'summary':
        return <SummaryPage />;
      case 'generator':
        return <NameDisplay />;
      case 'results':
        return <ResultsPage />;
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

export default App;
