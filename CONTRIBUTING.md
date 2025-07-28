# Contributing to NameCraft

Thank you for your interest in contributing to NameCraft! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** - Search the [Issues](https://github.com/a7csw/name-generator-web/issues) page to see if the bug has already been reported.

2. **Create a new issue** - If the bug hasn't been reported, create a new issue with:
   - Clear and descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### Suggesting Features

1. **Check existing feature requests** - Search the [Issues](https://github.com/a7csw/name-generator-web/issues) page for similar feature requests.

2. **Create a feature request** - If the feature hasn't been requested, create a new issue with:
   - Clear and descriptive title
   - Detailed description of the feature
   - Use cases and benefits
   - Mockups or examples if applicable

### Code Contributions

#### Prerequisites

- Node.js 16+
- npm or yarn
- Git

#### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/name-generator-web.git
   cd name-generator-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the coding standards below
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

## 📋 Coding Standards

### JavaScript/React

- Use **ES6+** features
- Prefer **functional components** with hooks
- Use **const** and **let** instead of **var**
- Use **arrow functions** for consistency
- Follow **camelCase** for variables and functions
- Use **PascalCase** for components
- Add **JSDoc comments** for complex functions

### CSS/Tailwind

- Use **Tailwind CSS utility classes** when possible
- Follow **mobile-first** responsive design
- Use **semantic class names** for custom CSS
- Maintain **consistent spacing** and **color schemes**

### File Structure

```
client/src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── store/         # State management
├── utils/         # Utility functions
└── styles/        # Global styles
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add Arabic language support
fix: resolve text truncation in summary page
docs: update README with new features
style: improve button hover animations
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Guidelines

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test edge cases and error scenarios

## 📝 Documentation

### Code Documentation

- Add **JSDoc comments** for functions and components
- Include **usage examples** for complex components
- Document **props interfaces** for React components
- Add **inline comments** for complex logic

### README Updates

- Update the README when adding new features
- Include **screenshots** for UI changes
- Update **installation instructions** if needed
- Document **new configuration options**

## 🔍 Review Process

### Pull Request Guidelines

1. **Title** - Clear and descriptive
2. **Description** - Explain what and why, not how
3. **Screenshots** - Include for UI changes
4. **Testing** - Describe how you tested
5. **Breaking Changes** - Note any breaking changes

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass and coverage is adequate
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design works on all devices
- [ ] Accessibility standards are met

## 🚀 Getting Help

### Questions and Support

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Documentation** - Check the README and code comments

### Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's code of conduct

## 📄 License

By contributing to NameCraft, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to NameCraft! 🎉 