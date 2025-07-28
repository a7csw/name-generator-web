# NameCraft - AI-Powered Name Generator

A modern, professional web application for generating beautiful and meaningful names from various cultural traditions. Built with React, Node.js, and powered by AI.

## 🌟 Features

- **Multi-Language Support**: Available in 9 languages (English, Arabic, Spanish, French, Russian, German, Japanese, Chinese, Hindi)
- **Cultural Diversity**: Names from 15+ cultural origins including Arabic, Islamic, Asian, Western, Jewish, African, and more
- **Interactive Wizard**: Step-by-step name generation process with gender, origin, and feeling selection
- **Professional Design**: Modern dark theme with glassmorphism effects and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **AI-Powered**: Intelligent name generation with cultural authenticity
- **Easy Sharing**: Copy and share generated names with meanings

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **Zustand** - Lightweight state management
- **React Query** - Data fetching and caching
- **Headless UI** - Accessible UI components
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
name-generator-web/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand state management
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                # Node.js backend (future)
├── package.json           # Root dependencies
└── README.md             # Project documentation
```

## 🎨 Design Features

- **Dark Theme**: Premium dark color scheme with purple and blue accents
- **Glassmorphism**: Modern glass-like UI elements with backdrop blur
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive Typography**: Adaptive text sizing for all screen sizes
- **Professional UI**: Clean, modern interface with excellent UX

## 🌍 Supported Languages

1. **English** - Default language
2. **Arabic** - العربية
3. **Spanish** - Español
4. **French** - Français
5. **Russian** - Русский
6. **German** - Deutsch
7. **Japanese** - 日本語
8. **Chinese** - 中文
9. **Hindi** - हिन्दी

## 🎯 Cultural Origins

- Arabic & Islamic
- Asian & Hindu
- Western & European
- Jewish & Hebrew
- African & Tribal
- Global & International
- Latin & Mediterranean
- North American
- European Union
- Slavic & Eastern European
- Scandinavian & Nordic
- Oceanic & Pacific
- Korean & East Asian
- Japanese & Zen

## 🎭 Name Feelings

- Unique & Distinctive
- Strong & Powerful
- Beautiful & Elegant
- Wise & Intelligent
- Peaceful & Serene
- Brave & Courageous
- Gentle & Tender
- Mysterious & Enigmatic
- Joyful & Happy
- Noble & Royal
- Creative & Artistic
- Adventurous & Explorer
- Loving & Caring
- Spiritual & Sacred
- Modern & Contemporary

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/name-generator-web.git
   cd name-generator-web
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   # From the client directory
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
# Build the frontend
cd client
npm run build

# The built files will be in client/dist/
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=NameCraft
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Custom animations and keyframes
- Responsive design utilities
- Performance optimizations

## 🎨 Customization

### Colors
The color scheme can be customized in `client/tailwind.config.js`:

```javascript
colors: {
  primary: {
    900: '#0a0f1a',
    800: '#1a1f2e',
    // ... more shades
  },
  accent: {
    purple: '#8b5cf6',
    pink: '#ec4899',
    // ... more colors
  }
}
```

### Animations
Custom animations are defined in the Tailwind config and can be extended as needed.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Privacy & Security

- No personal data is collected
- All name generation happens locally or through secure API calls
- No tracking or analytics without consent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For the smooth animations
- **Heroicons** - For the beautiful icons
- **All Contributors** - For making this project better

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by the NameCraft Team** 