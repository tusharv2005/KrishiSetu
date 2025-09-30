# Contributing to Crop Kisan Sahayyak

Thank you for your interest in contributing to Crop Kisan Sahayyak! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/crop-kisan-sahayyak.git
   cd crop-kisan-sahayyak
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## 🎯 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide clear description and steps to reproduce
- Include relevant screenshots or error messages
- Label issues appropriately (bug, feature, enhancement)

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Consider the impact on existing functionality
- Provide mockups or examples if possible

### Code Contributions

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   # or
   git commit -m "fix: resolve your bug description"
   ```

4. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript/React
- Use TypeScript for all new code
- Follow React best practices and hooks
- Use functional components with hooks
- Implement proper error handling

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Maintain accessibility standards

### File Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Utilities in `src/lib/`
- Types in component files or separate type files

### Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for components
- Use kebab-case for file names
- Use descriptive names

## 🧪 Testing

### Manual Testing
- Test all user flows
- Verify responsive design
- Check accessibility
- Test with different browsers

### Code Quality
- Run linting: `npm run lint`
- Fix any TypeScript errors
- Ensure proper error handling
- Add comments for complex logic

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design verified

### PR Description
- Clear title describing the change
- Detailed description of what was changed
- Screenshots for UI changes
- Reference related issues
- List any breaking changes

### Review Process
- Maintainers will review your PR
- Address feedback promptly
- Keep PRs focused and small
- Respond to review comments

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Feature-specific components
├── pages/              # Page components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── data/               # Mock data and constants
└── assets/             # Images and static files
```

## 🎨 Design System

### Colors
- Primary: Orange/Amber theme
- Success: Green
- Warning: Yellow
- Error: Red
- Info: Blue

### Components
- Use shadcn/ui components
- Maintain consistency with existing design
- Follow accessibility guidelines
- Ensure mobile-first approach

## 🌟 Areas for Contribution

### High Priority
- Bug fixes and performance improvements
- Accessibility enhancements
- Mobile responsiveness improvements
- Documentation updates

### Medium Priority
- New features for farmer dashboard
- Enhanced marketplace functionality
- Additional crop types and data
- UI/UX improvements

### Low Priority
- Code refactoring
- Test coverage improvements
- Performance optimizations
- Developer experience enhancements

## 📞 Getting Help

- Open an issue for questions
- Join discussions in GitHub Discussions
- Check existing documentation
- Review closed issues for similar problems

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Crop Kisan Sahayyak! Together, we can empower farmers with better technology and tools.

---

**Happy Coding!** 🚀
