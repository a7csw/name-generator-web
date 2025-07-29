import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeProvider from './components/ThemeProvider';
import LandingPage from './components/LandingPage';
import GenderSelection from './components/GenderSelection';
import RegionSelection from './components/RegionSelection';
import FeelingSelection from './components/FeelingSelection';
import NameForm from './components/NameForm';
import NameDisplay from './components/NameDisplay';
import useNameStore from './store/useNameStore';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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

        {/* Toast Notifications - Updated for dark theme */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#f1f5f9',
              border: '1px solid rgba(124, 110, 242, 0.3)',
              borderRadius: '1rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 30px rgba(124, 110, 242, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#7c6ef2',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
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
