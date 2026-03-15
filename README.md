# Koluman Games 🎮

Modern, premium, and multi-language gaming platform built with React, TypeScript, and Vite.

## 🚀 Live Demo
Visit the platform at: [games.koluman.se](https://games.koluman.se)

## ✨ Features
- **OLED Dark Mode**: Stunning glassmorphism UI designed for high-end feel.
- **Multi-language Support**: Fully localized in English, Turkish, Swedish, and German using `i18next`.
- **Game Integration**: Seamlessly hosts independent web games (e.g., Space War).
- **Responsive Design**: Optimized for desktops, tablets, and phones.
- **CI/CD Built-in**: Automated FTP deployment via GitHub Actions.

## 🛠️ Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Modern custom properties & Glassmorphism)
- **i18n**: i18next & react-i18next

## 🏁 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/muzafferkoluman/kolumangames.git
   cd kolumangames
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

### 📦 Building for Production
```bash
npm run build
```
The output will be in the `dist` folder.

## 🚢 Deployment
The project uses GitHub Actions for CI/CD. Any push to the `main` branch automatically:
1. Builds the project.
2. Deploys the `dist` folder to the FTP server specified in GitHub Secrets.

## 🤝 Contributing
We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

---
Developed with ❤️ by [muzafferkoluman](https://github.com/muzafferkoluman)
