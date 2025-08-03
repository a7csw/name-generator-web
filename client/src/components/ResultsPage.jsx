import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, SparklesIcon, ClipboardDocumentIcon, SpeakerWaveIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import useNameStore from '../store/useNameStore.js';

const ResultsPage = () => {
  const { 
    selectedGender, 
    selectedRegion, 
    selectedFeeling, 
    goBack, 
    resetWizard, 
    t,
    generatedNames,
    setGeneratedNames,
    isGenerating,
    setIsGenerating
  } = useNameStore();

  const [copiedName, setCopiedName] = useState(null);
  const [speakingName, setSpeakingName] = useState(null);

  // Enhanced mock data for demonstration
  const mockNames = {
    male: {
      arabic: [
        { name: 'Ahmed', meaning: 'Most praised one, praiseworthy' },
        { name: 'Ali', meaning: 'Elevated, noble, high' },
        { name: 'Omar', meaning: 'Life, flourishing' },
        { name: 'Hassan', meaning: 'Beautiful, good, handsome' },
        { name: 'Yusuf', meaning: 'God will increase' },
        { name: 'Ibrahim', meaning: 'Father of many' },
        { name: 'Khalid', meaning: 'Eternal, immortal' },
        { name: 'Tariq', meaning: 'Morning star, he who knocks at the door' }
      ],
      jewish: [
        { name: 'Matthew', meaning: 'Gift of God' },
        { name: 'John', meaning: 'God is gracious' },
        { name: 'Michael', meaning: 'Who is like God?' },
        { name: 'David', meaning: 'Beloved' },
        { name: 'Daniel', meaning: 'God is my judge' },
        { name: 'Gabriel', meaning: 'God is my strength' },
        { name: 'Samuel', meaning: 'Name of God' },
        { name: 'Benjamin', meaning: 'Son of the right hand' }
      ],
      western: [
        { name: 'William', meaning: 'Resolute protector' },
        { name: 'James', meaning: 'Supplanter' },
        { name: 'Robert', meaning: 'Bright fame' },
        { name: 'Alexander', meaning: 'Defender of the people' },
        { name: 'Christopher', meaning: 'Bearer of Christ' },
        { name: 'Nicholas', meaning: 'Victory of the people' },
        { name: 'Sebastian', meaning: 'Venerable, revered' },
        { name: 'Theodore', meaning: 'Gift of God' }
      ],
      asian: [
        { name: 'Arjun', meaning: 'Bright, shining, white' },
        { name: 'Krishna', meaning: 'Dark, black' },
        { name: 'Ravi', meaning: 'Sun' },
        { name: 'Vikram', meaning: 'Valor, prowess' },
        { name: 'Rohit', meaning: 'Red, rising sun' },
        { name: 'Amit', meaning: 'Infinite, endless' },
        { name: 'Rajesh', meaning: 'Ruler of kings' },
        { name: 'Suresh', meaning: 'Ruler of gods' }
      ],
      african: [
        { name: 'Kofi', meaning: 'Born on Friday' },
        { name: 'Kwame', meaning: 'Born on Saturday' },
        { name: 'Amani', meaning: 'Peace' },
        { name: 'Zuberi', meaning: 'Strong' },
        { name: 'Jabari', meaning: 'Brave one' },
        { name: 'Kendrick', meaning: 'Royal ruler' },
        { name: 'Malik', meaning: 'King, master' },
        { name: 'Omari', meaning: 'God the highest' }
      ],
      european: [
        { name: 'Lucas', meaning: 'Light-giving' },
        { name: 'Felix', meaning: 'Happy, fortunate' },
        { name: 'Adrian', meaning: 'From Hadria' },
        { name: 'Victor', meaning: 'Conqueror' },
        { name: 'Leo', meaning: 'Lion' },
        { name: 'Maximilian', meaning: 'Greatest' },
        { name: 'Raphael', meaning: 'God has healed' },
        { name: 'Dominic', meaning: 'Of the Lord' }
      ],
      slavic: [
        { name: 'Dimitri', meaning: 'Follower of Demeter' },
        { name: 'Vladimir', meaning: 'Ruler of the world' },
        { name: 'Boris', meaning: 'Fighter, warrior' },
        { name: 'Ivan', meaning: 'God is gracious' },
        { name: 'Nikolai', meaning: 'Victory of the people' },
        { name: 'Sergei', meaning: 'Servant' },
        { name: 'Anatoly', meaning: 'Sunrise' },
        { name: 'Yuri', meaning: 'Farmer' }
      ],
      scandinavian: [
        { name: 'Erik', meaning: 'Eternal ruler' },
        { name: 'Magnus', meaning: 'Great' },
        { name: 'Thor', meaning: 'Thunder' },
        { name: 'Bjorn', meaning: 'Bear' },
        { name: 'Gunnar', meaning: 'Warrior' },
        { name: 'Leif', meaning: 'Heir, descendant' },
        { name: 'Ragnar', meaning: 'Warrior of the gods' },
        { name: 'Sven', meaning: 'Young man' }
      ],
      japanese: [
        { name: 'Hiroto', meaning: 'Abundant person' },
        { name: 'Kenji', meaning: 'Strong, second son' },
        { name: 'Takashi', meaning: 'Noble, prosperous' },
        { name: 'Yuki', meaning: 'Happiness, snow' },
        { name: 'Kazuki', meaning: 'Harmonious hope' },
        { name: 'Ryo', meaning: 'Good, excellent' },
        { name: 'Sora', meaning: 'Sky' },
        { name: 'Haruto', meaning: 'Sun, flying' }
      ],
      korean: [
        { name: 'Min-jun', meaning: 'Quick and talented' },
        { name: 'Seo-jun', meaning: 'Excellence and talented' },
        { name: 'Do-yoon', meaning: 'Path and allow' },
        { name: 'Ji-hun', meaning: 'Wisdom and kindness' },
        { name: 'Yoon-seo', meaning: 'Allow and excellence' },
        { name: 'Jin-woo', meaning: 'Advance and universe' },
        { name: 'Dong-hyun', meaning: 'East and bright' },
        { name: 'Sung-min', meaning: 'Success and clever' }
      ],
      latin: [
        { name: 'Marcus', meaning: 'Warlike' },
        { name: 'Julius', meaning: 'Youthful' },
        { name: 'Antonius', meaning: 'Priceless' },
        { name: 'Claudius', meaning: 'Lame' },
        { name: 'Flavius', meaning: 'Golden-haired' },
        { name: 'Valentinus', meaning: 'Strong, healthy' },
        { name: 'Maximus', meaning: 'Greatest' },
        { name: 'Aurelius', meaning: 'Golden' }
      ],
      north_american: [
        { name: 'Mason', meaning: 'Stone worker' },
        { name: 'Logan', meaning: 'Little hollow' },
        { name: 'Hunter', meaning: 'One who hunts' },
        { name: 'Wyatt', meaning: 'Brave in war' },
        { name: 'Carter', meaning: 'Cart driver' },
        { name: 'Grayson', meaning: 'Son of the steward' },
        { name: 'Lincoln', meaning: 'Town by the pool' },
        { name: 'Chase', meaning: 'Hunter' }
      ],
      oceanic: [
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Manaia', meaning: 'Spiritual guardian' },
        { name: 'Tane', meaning: 'God of forests' },
        { name: 'Rangi', meaning: 'Sky' },
        { name: 'Maui', meaning: 'Trickster hero' },
        { name: 'Tama', meaning: 'Son, boy' },
        { name: 'Ariki', meaning: 'Chief, leader' },
        { name: 'Hemi', meaning: 'James' }
      ],
      global: [
        { name: 'Zain', meaning: 'Beauty, grace' },
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Aria', meaning: 'Air, melody' },
        { name: 'Nova', meaning: 'New' },
        { name: 'Atlas', meaning: 'Enduring' },
        { name: 'Phoenix', meaning: 'Dark red' },
        { name: 'Orion', meaning: 'Rising in the sky' },
        { name: 'Zen', meaning: 'Meditation' }
      ]
    },
    female: {
      arabic: [
        { name: 'Aisha', meaning: 'Living, alive, she who lives' },
        { name: 'Fatima', meaning: 'Captivating, one who abstains' },
        { name: 'Maryam', meaning: 'Wished-for child, rebellion' },
        { name: 'Khadija', meaning: 'Premature child' },
        { name: 'Amina', meaning: 'Trustworthy, honest' },
        { name: 'Zahra', meaning: 'Bright, shining, radiant' },
        { name: 'Layla', meaning: 'Night, dark beauty' },
        { name: 'Yasmin', meaning: 'Jasmine flower' }
      ],
      jewish: [
        { name: 'Mary', meaning: 'Wished-for child, rebellion' },
        { name: 'Sarah', meaning: 'Princess, noblewoman' },
        { name: 'Elizabeth', meaning: 'God is my oath' },
        { name: 'Grace', meaning: 'God\'s favor' },
        { name: 'Faith', meaning: 'Trust, belief' },
        { name: 'Hope', meaning: 'Expectation, trust' },
        { name: 'Joy', meaning: 'Happiness, rejoicing' },
        { name: 'Ruth', meaning: 'Companion, friend' }
      ],
      western: [
        { name: 'Emma', meaning: 'Universal, whole' },
        { name: 'Olivia', meaning: 'Olive tree' },
        { name: 'Ava', meaning: 'Life, bird' },
        { name: 'Isabella', meaning: 'God is my oath' },
        { name: 'Sophia', meaning: 'Wisdom' },
        { name: 'Charlotte', meaning: 'Free man' },
        { name: 'Amelia', meaning: 'Work' },
        { name: 'Mia', meaning: 'Mine, bitter' }
      ],
      asian: [
        { name: 'Priya', meaning: 'Beloved, dear one' },
        { name: 'Kavya', meaning: 'Poetry, poem' },
        { name: 'Ananya', meaning: 'Unique, incomparable' },
        { name: 'Diya', meaning: 'Lamp, light' },
        { name: 'Ishita', meaning: 'Desired, superior' },
        { name: 'Meera', meaning: 'Prosperous, devotee of Krishna' },
        { name: 'Riya', meaning: 'Singer, graceful' },
        { name: 'Shreya', meaning: 'Auspicious, superior' }
      ],
      african: [
        { name: 'Zara', meaning: 'Blooming flower, princess' },
        { name: 'Aisha', meaning: 'Living, alive' },
        { name: 'Fatima', meaning: 'Captivating' },
        { name: 'Amani', meaning: 'Peace' },
        { name: 'Zuri', meaning: 'Beautiful' },
        { name: 'Nala', meaning: 'Successful' },
        { name: 'Kiara', meaning: 'Bright, clear' },
        { name: 'Zola', meaning: 'Quiet, tranquil' }
      ],
      european: [
        { name: 'Sofia', meaning: 'Wisdom' },
        { name: 'Eva', meaning: 'Life' },
        { name: 'Luna', meaning: 'Moon' },
        { name: 'Stella', meaning: 'Star' },
        { name: 'Aurora', meaning: 'Dawn' },
        { name: 'Valentina', meaning: 'Strong, healthy' },
        { name: 'Isabella', meaning: 'God is my oath' },
        { name: 'Victoria', meaning: 'Victory' }
      ],
      slavic: [
        { name: 'Natasha', meaning: 'Born on Christmas' },
        { name: 'Katya', meaning: 'Pure' },
        { name: 'Anya', meaning: 'Grace' },
        { name: 'Mila', meaning: 'Gracious, dear' },
        { name: 'Nadia', meaning: 'Hope' },
        { name: 'Sasha', meaning: 'Defender of mankind' },
        { name: 'Vera', meaning: 'Faith' },
        { name: 'Lena', meaning: 'Light' }
      ],
      scandinavian: [
        { name: 'Freya', meaning: 'Lady' },
        { name: 'Astrid', meaning: 'Beautiful, loved' },
        { name: 'Ingrid', meaning: 'Beautiful' },
        { name: 'Helena', meaning: 'Light' },
        { name: 'Saga', meaning: 'Story' },
        { name: 'Liv', meaning: 'Life' },
        { name: 'Elin', meaning: 'Light' },
        { name: 'Maya', meaning: 'Water' }
      ],
      japanese: [
        { name: 'Sakura', meaning: 'Cherry blossom' },
        { name: 'Yuki', meaning: 'Happiness, snow' },
        { name: 'Hana', meaning: 'Flower' },
        { name: 'Aiko', meaning: 'Child of love' },
        { name: 'Mika', meaning: 'Beautiful fragrance' },
        { name: 'Kimi', meaning: 'Noble' },
        { name: 'Sora', meaning: 'Sky' },
        { name: 'Mai', meaning: 'Dance' }
      ],
      korean: [
        { name: 'Ji-eun', meaning: 'Wisdom and kindness' },
        { name: 'Min-seo', meaning: 'Quick and excellence' },
        { name: 'Seo-yeon', meaning: 'Excellence and beautiful' },
        { name: 'Ye-jin', meaning: 'Beautiful and precious' },
        { name: 'Hye-jin', meaning: 'Bright and precious' },
        { name: 'Soo-jin', meaning: 'Excellence and precious' },
        { name: 'Ji-min', meaning: 'Wisdom and clever' },
        { name: 'Yoon-ji', meaning: 'Allow and wisdom' }
      ],
      latin: [
        { name: 'Aurora', meaning: 'Dawn' },
        { name: 'Luna', meaning: 'Moon' },
        { name: 'Stella', meaning: 'Star' },
        { name: 'Flora', meaning: 'Flower' },
        { name: 'Diana', meaning: 'Divine' },
        { name: 'Venus', meaning: 'Love, beauty' },
        { name: 'Juno', meaning: 'Queen of the gods' },
        { name: 'Minerva', meaning: 'Wisdom' }
      ],
      north_american: [
        { name: 'Harper', meaning: 'Harp player' },
        { name: 'Scarlett', meaning: 'Red' },
        { name: 'Violet', meaning: 'Purple flower' },
        { name: 'Hazel', meaning: 'Hazel tree' },
        { name: 'Willow', meaning: 'Willow tree' },
        { name: 'Autumn', meaning: 'Fall season' },
        { name: 'Skylar', meaning: 'Scholar' },
        { name: 'Paisley', meaning: 'Church' }
      ],
      oceanic: [
        { name: 'Moana', meaning: 'Ocean' },
        { name: 'Tiana', meaning: 'Princess' },
        { name: 'Hine', meaning: 'Girl, daughter' },
        { name: 'Aroha', meaning: 'Love' },
        { name: 'Kiri', meaning: 'Tree bark' },
        { name: 'Mere', meaning: 'Mary' },
        { name: 'Anahera', meaning: 'Angel' },
        { name: 'Kahurangi', meaning: 'Precious' }
      ],
      global: [
        { name: 'Nova', meaning: 'New' },
        { name: 'Luna', meaning: 'Moon' },
        { name: 'Aria', meaning: 'Air, melody' },
        { name: 'Zara', meaning: 'Blooming flower' },
        { name: 'Maya', meaning: 'Water' },
        { name: 'Sage', meaning: 'Wise' },
        { name: 'Iris', meaning: 'Rainbow' },
        { name: 'Jade', meaning: 'Green stone' }
      ]
    },
    unisex: {
      arabic: [
        { name: 'Samir', meaning: 'Entertaining companion' },
        { name: 'Noor', meaning: 'Light, illumination' },
        { name: 'Safiya', meaning: 'Pure, serene' },
        { name: 'Halima', meaning: 'Gentle, patient' },
        { name: 'Zara', meaning: 'Blooming flower, princess' },
        { name: 'Salma', meaning: 'Safe, peaceful' },
        { name: 'Rana', meaning: 'Beautiful thing, to gaze' },
        { name: 'Leena', meaning: 'Tender, soft' }
      ],
      jewish: [
        { name: 'Jordan', meaning: 'Flowing down' },
        { name: 'Taylor', meaning: 'Cutter of cloth' },
        { name: 'Morgan', meaning: 'Sea-born' },
        { name: 'Casey', meaning: 'Vigilant' },
        { name: 'Avery', meaning: 'Ruler of elves' },
        { name: 'Riley', meaning: 'Rye clearing' },
        { name: 'Quinn', meaning: 'Wise' },
        { name: 'Drew', meaning: 'Wise' }
      ],
      western: [
        { name: 'Alex', meaning: 'Defender of the people' },
        { name: 'Jordan', meaning: 'Flowing down' },
        { name: 'Taylor', meaning: 'Cutter of cloth' },
        { name: 'Morgan', meaning: 'Sea-born' },
        { name: 'Casey', meaning: 'Vigilant' },
        { name: 'Avery', meaning: 'Ruler of elves' },
        { name: 'Riley', meaning: 'Rye clearing' },
        { name: 'Quinn', meaning: 'Wise' }
      ],
      asian: [
        { name: 'Aadi', meaning: 'First, beginning' },
        { name: 'Aarav', meaning: 'Peaceful' },
        { name: 'Advait', meaning: 'Unique' },
        { name: 'Aarush', meaning: 'First ray of sun' },
        { name: 'Aaradhya', meaning: 'Worshipped' },
        { name: 'Aarvi', meaning: 'Peace' },
        { name: 'Aarika', meaning: 'Goddess' },
        { name: 'Aarini', meaning: 'Goddess' }
      ],
      african: [
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Zuri', meaning: 'Beautiful' },
        { name: 'Amani', meaning: 'Peace' },
        { name: 'Kofi', meaning: 'Born on Friday' },
        { name: 'Zara', meaning: 'Blooming flower' },
        { name: 'Aisha', meaning: 'Living, alive' },
        { name: 'Fatima', meaning: 'Captivating' },
        { name: 'Nala', meaning: 'Successful' }
      ],
      european: [
        { name: 'Alex', meaning: 'Defender of the people' },
        { name: 'Sam', meaning: 'Told by God' },
        { name: 'Jordan', meaning: 'Flowing down' },
        { name: 'Taylor', meaning: 'Cutter of cloth' },
        { name: 'Morgan', meaning: 'Sea-born' },
        { name: 'Casey', meaning: 'Vigilant' },
        { name: 'Avery', meaning: 'Ruler of elves' },
        { name: 'Riley', meaning: 'Rye clearing' }
      ],
      slavic: [
        { name: 'Sasha', meaning: 'Defender of mankind' },
        { name: 'Misha', meaning: 'Who is like God?' },
        { name: 'Dasha', meaning: 'Gift of God' },
        { name: 'Vanya', meaning: 'God is gracious' },
        { name: 'Natasha', meaning: 'Born on Christmas' },
        { name: 'Katya', meaning: 'Pure' },
        { name: 'Anya', meaning: 'Grace' },
        { name: 'Mila', meaning: 'Gracious, dear' }
      ],
      scandinavian: [
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Liv', meaning: 'Life' },
        { name: 'Elin', meaning: 'Light' },
        { name: 'Maya', meaning: 'Water' },
        { name: 'Erik', meaning: 'Eternal ruler' },
        { name: 'Magnus', meaning: 'Great' },
        { name: 'Thor', meaning: 'Thunder' },
        { name: 'Bjorn', meaning: 'Bear' }
      ],
      japanese: [
        { name: 'Yuki', meaning: 'Happiness, snow' },
        { name: 'Sora', meaning: 'Sky' },
        { name: 'Hiroto', meaning: 'Abundant person' },
        { name: 'Kenji', meaning: 'Strong, second son' },
        { name: 'Sakura', meaning: 'Cherry blossom' },
        { name: 'Hana', meaning: 'Flower' },
        { name: 'Aiko', meaning: 'Child of love' },
        { name: 'Mika', meaning: 'Beautiful fragrance' }
      ],
      korean: [
        { name: 'Min-jun', meaning: 'Quick and talented' },
        { name: 'Seo-jun', meaning: 'Excellence and talented' },
        { name: 'Ji-eun', meaning: 'Wisdom and kindness' },
        { name: 'Min-seo', meaning: 'Quick and excellence' },
        { name: 'Do-yoon', meaning: 'Path and allow' },
        { name: 'Ji-hun', meaning: 'Wisdom and kindness' },
        { name: 'Yoon-seo', meaning: 'Allow and excellence' },
        { name: 'Jin-woo', meaning: 'Advance and universe' }
      ],
      latin: [
        { name: 'Aurora', meaning: 'Dawn' },
        { name: 'Luna', meaning: 'Moon' },
        { name: 'Stella', meaning: 'Star' },
        { name: 'Marcus', meaning: 'Warlike' },
        { name: 'Julius', meaning: 'Youthful' },
        { name: 'Antonius', meaning: 'Priceless' },
        { name: 'Flora', meaning: 'Flower' },
        { name: 'Diana', meaning: 'Divine' }
      ],
      north_american: [
        { name: 'Harper', meaning: 'Harp player' },
        { name: 'Mason', meaning: 'Stone worker' },
        { name: 'Logan', meaning: 'Little hollow' },
        { name: 'Hunter', meaning: 'One who hunts' },
        { name: 'Scarlett', meaning: 'Red' },
        { name: 'Violet', meaning: 'Purple flower' },
        { name: 'Hazel', meaning: 'Hazel tree' },
        { name: 'Willow', meaning: 'Willow tree' }
      ],
      oceanic: [
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Moana', meaning: 'Ocean' },
        { name: 'Manaia', meaning: 'Spiritual guardian' },
        { name: 'Tane', meaning: 'God of forests' },
        { name: 'Tiana', meaning: 'Princess' },
        { name: 'Hine', meaning: 'Girl, daughter' },
        { name: 'Aroha', meaning: 'Love' },
        { name: 'Kiri', meaning: 'Tree bark' }
      ],
      global: [
        { name: 'Nova', meaning: 'New' },
        { name: 'Luna', meaning: 'Moon' },
        { name: 'Aria', meaning: 'Air, melody' },
        { name: 'Zain', meaning: 'Beauty, grace' },
        { name: 'Kai', meaning: 'Sea' },
        { name: 'Zara', meaning: 'Blooming flower' },
        { name: 'Maya', meaning: 'Water' },
        { name: 'Sage', meaning: 'Wise' }
      ]
    }
  };

  useEffect(() => {
    generateNames();
  }, []);

  const generateNames = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get mock data based on selections
    const names = mockNames[selectedGender]?.[selectedRegion] || mockNames[selectedGender]?.western || [];
    
    setGeneratedNames(names);
    setIsGenerating(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedName(text);
      setTimeout(() => setCopiedName(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyAllNames = async () => {
    const allNames = generatedNames.map(item => `${item.name} - ${item.meaning}`).join('\n');
    await copyToClipboard(allNames);
  };

  const speakName = (name) => {
    if ('speechSynthesis' in window) {
      if (speakingName === name) {
        window.speechSynthesis.cancel();
        setSpeakingName(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(name);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.onend = () => setSpeakingName(null);
        utterance.onerror = () => setSpeakingName(null);
        setSpeakingName(name);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1], opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 20, repeat: Infinity, ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1], opacity: [0.02, 0.06, 0.02],
          }}
          transition={{
            duration: 25, repeat: Infinity, ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-56 h-56 bg-accent-purple/8 rounded-full blur-2xl"
        />
      </div>

      {/* Header */}
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
              onClick={goBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              {t('back')}
            </motion.button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
                {t('yourBeautifulNames')}
              </h1>
              <p className="text-sm text-gray-400">
                {t(selectedGender)} • {t(selectedRegion)} • {t(selectedFeeling)}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetWizard}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-2xl hover:bg-white/10"
            >
              {t('startOver')}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
                 {/* Enhanced Loading State */}
         <AnimatePresence>
           {isGenerating && (
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="text-center py-20"
             >
               {/* Main sparkle icon */}
               <motion.div
                 animate={{ 
                   rotate: 360,
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ 
                   rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                   scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                 }}
                 className="mb-8 relative"
               >
                 <SparklesIcon className="h-20 w-20 text-primary-400 mx-auto" />
                 
                 {/* Orbiting sparkles */}
                 {[...Array(6)].map((_, i) => (
                   <motion.div
                     key={i}
                     animate={{
                       rotate: [0, 360],
                       scale: [0.5, 1.2, 0.5],
                       opacity: [0.3, 1, 0.3],
                     }}
                     transition={{
                       duration: 4, repeat: Infinity, delay: i * 0.3, ease: "linear"
                     }}
                     className="absolute w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-purple rounded-full"
                     style={{ 
                       top: '50%', 
                       left: '50%', 
                       transform: `rotate(${i * 60}deg) translateY(-60px) translateX(-6px)`, 
                     }}
                   />
                 ))}
               </motion.div>
               
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent"
               >
                 {t('creatingNames')}
               </motion.h2>
               
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8, duration: 0.8 }}
                 className="text-xl text-gray-300 mb-6"
               >
                 {t('craftingNames')}
               </motion.p>
               
               <motion.div
                 animate={{ 
                   opacity: [0.5, 1, 0.5],
                   scale: [1, 1.05, 1]
                 }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="text-lg text-primary-400 font-medium"
               >
                 {t('weavingMagic')}
               </motion.div>
               
               {/* Progress dots */}
               <div className="flex justify-center gap-2 mt-8">
                 {[...Array(3)].map((_, i) => (
                   <motion.div
                     key={i}
                     animate={{
                       scale: [1, 1.5, 1],
                       opacity: [0.3, 1, 0.3],
                     }}
                     transition={{
                       duration: 1.5, repeat: Infinity, delay: i * 0.2,
                     }}
                     className="w-3 h-3 bg-primary-400 rounded-full"
                   />
                 ))}
               </div>
             </motion.div>
           )}
         </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {!isGenerating && generatedNames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyAllNames}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border border-white/20"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {t('copyAll')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNames}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  {t('generateMore')}
                </motion.button>
              </div>

                             {/* Names Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {generatedNames.map((nameData, index) => (
                   <motion.div
                     key={`${nameData.name}-${index}`}
                     initial={{ opacity: 0, y: 20, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                     whileHover={{ 
                       y: -8, 
                       scale: 1.02,
                       transition: { duration: 0.2 }
                     }}
                     className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:bg-white/8 transition-all duration-300 group overflow-hidden"
                   >
                     {/* Gradient overlay on hover */}
                     <motion.div
                       initial={{ opacity: 0 }}
                       whileHover={{ opacity: 1 }}
                       className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-purple/5 rounded-3xl"
                     />
                     
                     {/* Sparkle effect */}
                     <motion.div
                       animate={{ 
                         rotate: [0, 360],
                         scale: [1, 1.2, 1],
                         opacity: [0.3, 0.8, 0.3]
                       }}
                       transition={{ 
                         duration: 4, 
                         repeat: Infinity,
                         ease: "easeInOut"
                       }}
                       className="absolute top-2 right-2 text-primary-400/30 text-lg"
                     >
                       ✨
                     </motion.div>
                     
                     <div className="relative z-10">
                       <div className="flex items-start justify-between mb-4">
                         <div className="flex-1">
                           <motion.h3 
                             className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300"
                             whileHover={{ scale: 1.05 }}
                             transition={{ duration: 0.2 }}
                           >
                             {nameData.name}
                           </motion.h3>
                           <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                             {nameData.meaning}
                           </p>
                         </div>
                         
                         <div className="flex gap-2 ml-4">
                           <motion.button
                             whileHover={{ scale: 1.1, rotate: 5 }}
                             whileTap={{ scale: 0.9 }}
                             onClick={() => copyToClipboard(nameData.name)}
                             className="p-2 text-gray-400 hover:text-emerald-400 transition-all duration-200 rounded-xl hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-400/20"
                             title="Copy name"
                           >
                             <ClipboardDocumentIcon className="h-5 w-5" />
                           </motion.button>
                           
                           <motion.button
                             whileHover={{ scale: 1.1, rotate: -5 }}
                             whileTap={{ scale: 0.9 }}
                             onClick={() => speakName(nameData.name)}
                             className={`p-2 rounded-xl transition-all duration-200 ${
                               speakingName === nameData.name 
                                 ? 'text-primary-400 bg-primary-400/20 shadow-lg shadow-primary-400/20' 
                                 : 'text-gray-400 hover:text-primary-400 hover:bg-primary-400/10 hover:shadow-lg hover:shadow-primary-400/20'
                             }`}
                             title="Speak name"
                           >
                             <SpeakerWaveIcon className="h-5 w-5" />
                           </motion.button>
                         </div>
                       </div>
                       
                       {/* Copy feedback */}
                       {copiedName === nameData.name && (
                         <motion.div
                           initial={{ opacity: 0, y: 10, scale: 0.8 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: -10, scale: 0.8 }}
                           className="flex items-center gap-2 text-emerald-400 text-sm font-medium"
                         >
                           <motion.div
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ duration: 0.5 }}
                           >
                             ✓
                           </motion.div>
                           {t('copied')}
                         </motion.div>
                       )}
                       
                       {/* Speaking indicator */}
                       {speakingName === nameData.name && (
                         <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="flex items-center gap-2 text-primary-400 text-sm font-medium mt-2"
                         >
                           <motion.div
                             animate={{ scale: [1, 1.3, 1] }}
                             transition={{ duration: 1, repeat: Infinity }}
                           >
                             🔊
                           </motion.div>
                           Speaking...
                         </motion.div>
                       )}
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultsPage; 