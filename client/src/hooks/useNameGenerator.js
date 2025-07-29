import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useNameStore from '../store/useNameStore';
import { getRandomNames } from '../data/mockNames';

const BASE_URL = 'http://localhost:3001';

// Configure axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Response interceptor - Always use mock data for now
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Network error, using mock data');
    return Promise.resolve({ data: [] });
  }
);

// Fetch available cultures
export const useCultures = () => {
  return useQuery({
    queryKey: ['cultures'],
    queryFn: async () => {
      // Always return fallback cultures for now
      return [
        { id: 'muslim', label: 'Islamic', description: 'Traditional Islamic names' },
        { id: 'christian', label: 'Christian', description: 'Biblical and Christian names' },
        { id: 'hindu', label: 'Hindu', description: 'Sanskrit and Hindu names' },
        { id: 'jewish', label: 'Jewish', description: 'Hebrew and Jewish names' },
      ];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Fetch available genders
export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: async () => {
      return [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
        { id: 'unisex', label: 'Unisex' },
      ];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Generate names mutation - Always use mock data for demo
export const useGenerateNames = () => {
  const queryClient = useQueryClient();
  const { setGeneratedNames, setIsGenerating, setLastGenerated } = useNameStore();

  return useMutation({
    mutationFn: async ({ gender, culture, count, feeling }) => {
      setIsGenerating(true);
      
      // Add realistic loading delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      // Always use mock data for demonstration
      console.log(`Generating ${count} ${gender} names from ${culture} culture with ${feeling} feeling`);
      return getRandomNames(gender, culture, count, feeling);
    },
    onSuccess: (data) => {
      console.log('Generated names:', data);
      setGeneratedNames(data);
      setLastGenerated();
      setIsGenerating(false);
      toast.success(`✨ Generated ${data.length} beautiful names!`, {
        duration: 3000,
        icon: '🎉',
      });
    },
    onError: (error) => {
      setIsGenerating(false);
      toast.error('Failed to generate names. Please try again.');
      console.error('Name generation error:', error);
    },
  });
};

// Copy to clipboard hook
export const useCopyToClipboard = () => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!', {
        duration: 2000,
        icon: '📋',
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return { copyToClipboard };
}; 