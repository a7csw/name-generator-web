import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useNameStore from '../store/useNameStore';
import { getRandomNames } from '../data/mockNames';

const EXTERNAL_API_URL = 'https://api.namegenerator.mohdrarprojects.com/generateGemini';

// Configure axios for external API
const externalApi = axios.create({
  timeout: 30000, // 30 seconds timeout for external API
});

// Mapping functions to convert frontend selections to API format
const mapGenderToAPI = (gender) => {
  const mapping = {
    male: 'male',
    female: 'female',
    unisex: 'unisex'
  };
  return mapping[gender] || 'male';
};

const mapRegionToAPI = (region) => {
  const mapping = {
    arabic: 'middle eastern',
    islamic: 'middle eastern',
    asian: 'asian',
    western: 'western',
    latin: 'latin american',
    northAmerican: 'north american',
    european: 'european',
    african: 'african',
    jewish: 'jewish',
    slavic: 'slavic',
    scandinavian: 'scandinavian',
    oceanic: 'oceanic',
    korean: 'korean',
    japanese: 'japanese',
    global: 'global'
  };
  return mapping[region] || 'western';
};

const mapFeelingToAPI = (feeling) => {
  const mapping = {
    strong: 'strong&powerful',
    soft: 'soft&cute',
    brave: 'brave&courageous',
    mysterious: 'mysterious&enigmatic',
    wise: 'wise&intelligent',
    joyful: 'joyful&happy',
    noble: 'noble&elegant',
    peaceful: 'peaceful&calm',
    passionate: 'passionate&intense',
    unique: 'unique&special',
    creative: 'creative&artistic',
    adventurous: 'adventurous&bold',
    elegant: 'elegant&sophisticated',
    loyal: 'loyal&faithful',
    radiant: 'radiant&bright'
  };
  return mapping[feeling] || 'beautiful&meaningful';
};

// Parse the API response to extract names and descriptions
const parseNamesFromResponse = (responseText) => {
  const names = [];
  
  // Split by numbered lines (1., 2., etc.)
  const lines = responseText.split(/\d+\.\s+\*\*/);
  
  lines.forEach((line, index) => {
    if (index === 0) return; // Skip the first empty element
    
    // Extract name and description
    const match = line.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);
    if (match) {
      const name = match[1].trim();
      const description = match[2].trim();
      
      names.push({
        name,
        meaning: description,
        origin: 'API Generated',
        feeling: 'unique'
      });
    }
  });
  
  return names;
};

// Test function to verify parsing logic
const testParsing = () => {
  const testResponse = {
    names: "1. **Aaliyah** - Sublime, high-born\n2. **Layan** - Softness, tenderness\n3. **Jana** - Harvest, fruit\n4. **Salma** - Safe, peaceful\n5. **Hala** - Halo, aureole\n"
  };
  
  const parsed = parseNamesFromResponse(testResponse.names);
  console.log('Test parsing result:', parsed);
  return parsed;
};

// Run test on module load
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    console.log('Testing name parsing function...');
    testParsing();
  }, 1000);
}

// Fetch available cultures
export const useCultures = () => {
  return useQuery({
    queryKey: ['cultures'],
    queryFn: async () => {
      // Return the cultures that map to the API
      return [
        { id: 'arabic', label: 'Arabic', description: 'Traditional Arabic names' },
        { id: 'islamic', label: 'Islamic', description: 'Islamic & Muslim names' },
        { id: 'asian', label: 'Asian', description: 'Hindu, Sanskrit & Eastern names' },
        { id: 'western', label: 'Western', description: 'European & American names' },
        { id: 'latin', label: 'Latin American', description: 'Spanish & Portuguese names' },
        { id: 'northAmerican', label: 'North American', description: 'Modern American names' },
        { id: 'european', label: 'European', description: 'Traditional European names' },
        { id: 'african', label: 'African', description: 'African cultural names' },
        { id: 'jewish', label: 'Jewish', description: 'Hebrew and Jewish names' },
        { id: 'slavic', label: 'Slavic', description: 'Eastern European names' },
        { id: 'scandinavian', label: 'Scandinavian', description: 'Nordic names' },
        { id: 'oceanic', label: 'Oceanic', description: 'Pacific Island names' },
        { id: 'korean', label: 'Korean', description: 'Traditional Korean names' },
        { id: 'japanese', label: 'Japanese', description: 'Traditional Japanese names' },
        { id: 'global', label: 'Global Mix', description: 'Names from around the world' }
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

// Generate names mutation - Now uses external API
export const useGenerateNames = () => {
  const queryClient = useQueryClient();
  const { setGeneratedNames, setIsGenerating, setLastGenerated } = useNameStore();

  return useMutation({
    mutationFn: async ({ gender, culture, count, feeling }) => {
      setIsGenerating(true);
      
      try {
        // Prepare API request body
        const requestBody = {
          title: "generating human names",
          role: "you are an expert",
          nameGender: mapGenderToAPI(gender),
          nameStyle: "traditional",
          nameOrigin: mapRegionToAPI(culture),
          nameTone: mapFeelingToAPI(feeling)
        };

        console.log('Making API request to:', EXTERNAL_API_URL);
        console.log('Request body:', requestBody);

        // Make API call with timeout
        const response = await externalApi.post(EXTERNAL_API_URL, requestBody);
        
        console.log('API Response:', response.data);
        
        if (response.data && response.data.names) {
          // Parse the names from the response
          const parsedNames = parseNamesFromResponse(response.data.names);
          
          // Limit to requested count
          const limitedNames = parsedNames.slice(0, count);
          
          console.log('Parsed names:', limitedNames);
          
          if (limitedNames.length > 0) {
            return limitedNames;
          } else {
            throw new Error('No names parsed from API response');
          }
        } else {
          throw new Error('Invalid response format from API');
        }
        
      } catch (error) {
        console.error('API Error:', error);
        console.log('Error details:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        
        // Fallback to mock data if API fails
        console.log('Falling back to mock data due to API error');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay for fallback
        
        const fallbackNames = getRandomNames(gender, culture, count, feeling);
        console.log('Using fallback names:', fallbackNames);
        return fallbackNames;
      }
    },
    onSuccess: (data) => {
      console.log('Generated names:', data);
      setGeneratedNames(data);
      setLastGenerated();
      setIsGenerating(false);
      
      // Show different toast based on data source
      const isFromAPI = data.length > 0 && data[0].origin === 'API Generated';
      const message = isFromAPI 
        ? `✨ Generated ${data.length} beautiful names from AI!`
        : `✨ Generated ${data.length} beautiful names! (using fallback data)`;
      
      toast.success(message, {
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