// Name database organized by religion and gender
const nameDatabase = {
  muslim: {
    male: [
      { name: "Ahmed", meaning: "Most praised one, praiseworthy" },
      { name: "Ali", meaning: "Elevated, noble, high" },
      { name: "Omar", meaning: "Life, flourishing" },
      { name: "Hassan", meaning: "Beautiful, good, handsome" },
      { name: "Yusuf", meaning: "God will increase" },
      { name: "Ibrahim", meaning: "Father of many" },
      { name: "Khalid", meaning: "Eternal, immortal" },
      { name: "Tariq", meaning: "Morning star, he who knocks at the door" },
      { name: "Samir", meaning: "Entertaining companion" },
      { name: "Malik", meaning: "King, master" },
      { name: "Amin", meaning: "Trustworthy, honest" },
      { name: "Rashid", meaning: "Rightly guided" },
      { name: "Hakim", meaning: "Wise, judicious" },
      { name: "Marwan", meaning: "Solid rock" },
      { name: "Nasser", meaning: "Helper, supporter" }
    ],
    female: [
      { name: "Aisha", meaning: "Living, alive, she who lives" },
      { name: "Fatima", meaning: "Captivating, one who abstains" },
      { name: "Maryam", meaning: "Wished-for child, rebellion" },
      { name: "Khadija", meaning: "Premature child" },
      { name: "Amina", meaning: "Trustworthy, honest" },
      { name: "Zahra", meaning: "Bright, shining, radiant" },
      { name: "Layla", meaning: "Night, dark beauty" },
      { name: "Yasmin", meaning: "Jasmine flower" },
      { name: "Noor", meaning: "Light, illumination" },
      { name: "Safiya", meaning: "Pure, serene" },
      { name: "Halima", meaning: "Gentle, patient" },
      { name: "Zara", meaning: "Blooming flower, princess" },
      { name: "Salma", meaning: "Safe, peaceful" },
      { name: "Rana", meaning: "Beautiful thing, to gaze" },
      { name: "Leena", meaning: "Tender, soft" }
    ]
  },
  christian: {
    male: [
      { name: "Matthew", meaning: "Gift of God" },
      { name: "John", meaning: "God is gracious" },
      { name: "Michael", meaning: "Who is like God?" },
      { name: "David", meaning: "Beloved" },
      { name: "Daniel", meaning: "God is my judge" },
      { name: "Luke", meaning: "Light-giving" },
      { name: "Mark", meaning: "Warlike" },
      { name: "Peter", meaning: "Rock, stone" },
      { name: "Paul", meaning: "Small, humble" },
      { name: "Stephen", meaning: "Crown, garland" },
      { name: "Timothy", meaning: "Honoring God" },
      { name: "Gabriel", meaning: "God is my strength" },
      { name: "Samuel", meaning: "Name of God" },
      { name: "Benjamin", meaning: "Son of the right hand" },
      { name: "Nathaniel", meaning: "Gift of God" }
    ],
    female: [
      { name: "Mary", meaning: "Wished-for child, rebellion" },
      { name: "Sarah", meaning: "Princess, noblewoman" },
      { name: "Elizabeth", meaning: "God is my oath" },
      { name: "Grace", meaning: "God's favor" },
      { name: "Faith", meaning: "Trust, belief" },
      { name: "Hope", meaning: "Expectation, trust" },
      { name: "Joy", meaning: "Happiness, rejoicing" },
      { name: "Ruth", meaning: "Companion, friend" },
      { name: "Esther", meaning: "Star" },
      { name: "Rebecca", meaning: "To tie, bind" },
      { name: "Hannah", meaning: "Favor, grace" },
      { name: "Abigail", meaning: "Father's joy" },
      { name: "Rachel", meaning: "Ewe, innocent" },
      { name: "Miriam", meaning: "Wished-for child" },
      { name: "Deborah", meaning: "Bee" }
    ]
  },
  hindu: {
    male: [
      { name: "Arjun", meaning: "Bright, shining, white" },
      { name: "Krishna", meaning: "Dark, black" },
      { name: "Ravi", meaning: "Sun" },
      { name: "Vikram", meaning: "Valor, prowess" },
      { name: "Rohit", meaning: "Red, rising sun" },
      { name: "Amit", meaning: "Infinite, endless" },
      { name: "Rajesh", meaning: "Ruler of kings" },
      { name: "Suresh", meaning: "Ruler of gods" },
      { name: "Dinesh", meaning: "Lord of the day, sun" },
      { name: "Ganesh", meaning: "Lord of multitudes" },
      { name: "Mahesh", meaning: "Great ruler, Lord Shiva" },
      { name: "Ramesh", meaning: "Lord of Rama" },
      { name: "Naresh", meaning: "King of men" },
      { name: "Hitesh", meaning: "Lord of goodness" },
      { name: "Manish", meaning: "God of mind, Lord Hanuman" }
    ],
    female: [
      { name: "Priya", meaning: "Beloved, dear one" },
      { name: "Kavya", meaning: "Poetry, poem" },
      { name: "Ananya", meaning: "Unique, incomparable" },
      { name: "Diya", meaning: "Lamp, light" },
      { name: "Ishita", meaning: "Desired, superior" },
      { name: "Meera", meaning: "Prosperous, devotee of Krishna" },
      { name: "Riya", meaning: "Singer, graceful" },
      { name: "Shreya", meaning: "Auspicious, superior" },
      { name: "Tanvi", meaning: "Beautiful, slender" },
      { name: "Vanya", meaning: "Gracious gift of God" },
      { name: "Aadhya", meaning: "First power, beginning" },
      { name: "Siya", meaning: "Sita, goddess" },
      { name: "Kiara", meaning: "Little dark one" },
      { name: "Arya", meaning: "Noble, honorable" },
      { name: "Myra", meaning: "Sweet, beloved" }
    ]
  },
  jewish: {
    male: [
      { name: "Jacob", meaning: "Supplanter" },
      { name: "Noah", meaning: "Rest, comfort" },
      { name: "Aaron", meaning: "High mountain, exalted" },
      { name: "Isaac", meaning: "Laughter" },
      { name: "Moses", meaning: "Drawn from water" },
      { name: "Ezra", meaning: "Helper" },
      { name: "Eli", meaning: "Ascended, uplifted" },
      { name: "Asher", meaning: "Happy, blessed" },
      { name: "Levi", meaning: "Joined, attached" },
      { name: "Caleb", meaning: "Bold, dog" },
      { name: "Jonah", meaning: "Dove" },
      { name: "Micah", meaning: "Who is like God?" },
      { name: "Ethan", meaning: "Firm, steadfast" },
      { name: "Nathan", meaning: "Gift from God" },
      { name: "Zion", meaning: "Highest point" }
    ],
    female: [
      { name: "Leah", meaning: "Weary" },
      { name: "Naomi", meaning: "Pleasant, beautiful" },
      { name: "Tamar", meaning: "Date palm" },
      { name: "Shira", meaning: "Song, poetry" },
      { name: "Maya", meaning: "Water" },
      { name: "Zara", meaning: "Blooming flower" },
      { name: "Noa", meaning: "Movement, motion" },
      { name: "Ava", meaning: "Life, bird" },
      { name: "Ella", meaning: "Goddess, oak tree" },
      { name: "Mia", meaning: "Mine, bitter" },
      { name: "Aria", meaning: "Air, melody" },
      { name: "Chloe", meaning: "Blooming, fertility" },
      { name: "Layla", meaning: "Night, dark beauty" },
      { name: "Sofia", meaning: "Wisdom" },
      { name: "Emma", meaning: "Universal, whole" }
    ]
  }
};

const availableReligions = [
  { id: 'muslim', label: 'Muslim/Islamic', description: 'Traditional Islamic names' },
  { id: 'christian', label: 'Christian', description: 'Biblical and Christian names' },
  { id: 'hindu', label: 'Hindu', description: 'Sanskrit and Hindu traditional names' },
  { id: 'jewish', label: 'Jewish', description: 'Hebrew and Jewish traditional names' }
];

const availableGenders = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' }
];

// Service functions
const generateNames = async (gender, religion, count = 10) => {
  try {
    const religionData = nameDatabase[religion.toLowerCase()];
    if (!religionData) {
      throw new Error(`Religion '${religion}' not supported`);
    }

    const genderData = religionData[gender.toLowerCase()];
    if (!genderData) {
      throw new Error(`Gender '${gender}' not available for religion '${religion}'`);
    }

    // Shuffle array and return requested count
    const shuffled = genderData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, genderData.length));

  } catch (error) {
    console.error('Error in generateNames service:', error);
    throw error;
  }
};

const getAvailableReligions = () => {
  return availableReligions;
};

const getAvailableGenders = () => {
  return availableGenders;
};

module.exports = {
  generateNames,
  getAvailableReligions,
  getAvailableGenders
}; 