# NameCraft - AI-Powered Name Generator

A modern, professional React-based name generator web application with multi-language support, interactive wizard flow, and beautiful dark theme design.

## 🎯 Project Overview

**NameCraft** is a frontend-only React application that provides a sophisticated name generation experience. The backend and AI API integration will be developed separately by the backend team.

### ✨ Features

- **🌍 Multi-Language Support**: 9 languages (English, Arabic, Spanish, French, Russian, German, Japanese, Chinese, Hindi)
- **🎨 Professional Dark Theme**: Premium glassmorphism design with smooth animations
- **🔄 Interactive Wizard Flow**: Step-by-step name generation process
- **🎯 Cultural Diversity**: 15+ cultural origins and name styles
- **💫 Modern UI/UX**: Responsive design with Framer Motion animations
- **📱 Mobile-First**: Optimized for all devices and screen sizes
- **⚡ Performance**: Optimized with React Query and Zustand

## 🏗️ Architecture

### Frontend Stack
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Query** for data fetching
- **Headless UI** for accessible components

### Project Structure
```
client/
├── src/
│   ├── components/          # UI Components
│   │   ├── LandingPage.js   # Welcome screen with language selection
│   │   ├── GenderSelection.js # Gender selection wizard step
│   │   ├── RegionSelection.js # Cultural origin selection
│   │   ├── FeelingSelection.js # Name feeling/emotion selection
│   │   ├── NameForm.js      # Summary and generation form
│   │   ├── NameDisplay.js   # Results display with loading states
│   │   ├── NameCard.js      # Individual name card component
│   │   └── ui/              # Reusable UI components
│   ├── store/
│   │   └── useNameStore.js  # Zustand state management
│   ├── hooks/
│   │   └── useNameGenerator.js # Data fetching hooks
│   └── data/
│       └── mockNames.js     # Mock data for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

The application will run on `http://localhost:3000`

## 🔌 Backend Integration

### Expected API Endpoints

The frontend expects the following backend API endpoints:

#### 1. Generate Names
```http
POST /api/generate-names
Content-Type: application/json

{
  "gender": "male|female|unisex",
  "culture": "arabic|islamic|asian|western|jewish|african|global|latin|north-american|european|slavic|scandinavian|oceanic|korean|japanese",
  "count": 1-10,
  "feeling": "unique|strong|beautiful|wise|peaceful|brave|gentle|mysterious|joyful|noble|creative|adventurous|loving|spiritual|modern"
}
```

**Response:**
```json
{
  "success": true,
  "names": [
    {
      "name": "Ahmad",
      "meaning": "Most commendable, most praiseworthy",
      "origin": "Arabic",
      "feeling": "noble"
    }
  ]
}
```

#### 2. Get Available Options
```http
GET /api/cultures
GET /api/genders
GET /api/feelings
```

**Response:**
```json
{
  "success": true,
  "data": ["arabic", "islamic", "asian", "western", ...]
}
```

### API Configuration

The frontend is configured to connect to:
- **Development**: `http://localhost:3001/api`
- **Production**: Environment variable `REACT_APP_API_URL`

### Mock Data

Currently, the application uses mock data from `client/src/data/mockNames.js` for development and demonstration purposes. Replace this with actual API calls when the backend is ready.

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (`#7c6ef2` to `#8b5cf6`)
- **Accent**: Purple, Pink, Emerald, Orange
- **Background**: Dark theme (`#0a0f1a` to `#1a1f2e`)

### Typography
- **Font**: System UI stack
- **Responsive**: Dynamic font sizing with `clamp()`
- **Multi-language**: Optimized for RTL and LTR languages

### Components
- **Glassmorphism**: Backdrop blur effects
- **Animations**: Smooth transitions with Framer Motion
- **Accessibility**: ARIA labels and keyboard navigation

## 🌍 Internationalization

The application supports 9 languages with complete translations:
- English (en)
- Arabic (ar) - RTL support
- Spanish (es)
- French (fr)
- Russian (ru)
- German (de)
- Japanese (ja)
- Chinese (zh)
- Hindi (hi)

All UI text, error messages, and dynamic content are translated.

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Optimized for touch interactions and various screen sizes.

## 🔧 Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### State Management
- **Zustand**: Global state for user preferences and wizard flow
- **React Query**: Server state management and caching
- **Local Storage**: Persistence for user settings

### Code Style
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS

## 🚀 Deployment

### Build for Production
```bash
cd client
npm run build
```

### Environment Variables
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

## 🤝 Backend Development Guidelines

### For the Backend Team

1. **API Design**: Follow the expected endpoints above
2. **CORS**: Enable CORS for `http://localhost:3000`
3. **Error Handling**: Return consistent error responses
4. **Validation**: Validate all input parameters
5. **Documentation**: Document your API endpoints

### Integration Steps
1. Set up your backend server on port 3001
2. Implement the required API endpoints
3. Test with the frontend application
4. Replace mock data with real API calls
5. Deploy both frontend and backend

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

**Note**: This is a frontend-only repository. The backend and AI API integration will be developed separately and integrated via the specified API endpoints. 