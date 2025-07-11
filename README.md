# AI Personal Assistant

<div align="center">
  <img src="./public/logo1.svg" alt="AI Personal Assistant Logo" width="200" height="200">
  
  <h3>Your Intelligent Companion for Enhanced Productivity</h3>
  
  <p>
    <strong>AI Personal Assistant</strong> is a modern, intuitive platform that brings together multiple specialized AI assistants to help you accomplish tasks, boost creativity, and streamline your workflow.
  </p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Convex-Backend-FF6B6B?style=for-the-badge" alt="Convex">
  </div>

  <div style="margin-top: 20px;">
    <a href="#demo">View Demo</a> •
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </div>
</div>

---

## ✨ Features

### 🎯 **Multi-Assistant Selection**
- Choose from a curated collection of specialized AI assistants
- Each assistant tailored for specific tasks and domains
- Seamless switching between different AI personalities

### 🎨 **Modern UI/UX**
- Beautiful glassmorphism design with gradient effects
- Smooth animations and micro-interactions
- Dark/Light mode toggle with system preference detection
- Fully responsive design for all devices

### 🔐 **Secure Authentication**
- Google OAuth integration for secure sign-in
- User session management with persistent storage
- Protected routes and user-specific data

### 🌟 **Smart Workspace**
- Personalized dashboard for each user
- Real-time conversation history
- Context-aware AI responses
- Customizable assistant preferences

### 🚀 **Performance Optimized**
- Server-side rendering with Next.js 14
- Optimized images and lazy loading
- Efficient state management
- Fast, responsive user interface

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context API
- **Authentication**: Google OAuth 2.0

### Backend
- **Database**: Convex (Real-time database)
- **API**: Convex Functions
- **Authentication**: Google OAuth integration
- **File Storage**: Convex File Storage

### Development Tools
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

---

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google OAuth credentials
- Convex account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-personal-assistant.git
cd ai-personal-assistant
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Database Setup
```bash
# Install Convex CLI
npm install -g convex

# Set up Convex
npx convex dev

# Push schema to Convex
npx convex dev --push-schema
```

### 5. Run the Application
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

### Getting Started

1. **Sign In**: Use your Google account to authenticate
2. **Select Assistants**: Choose from available AI assistants based on your needs
3. **Start Conversations**: Begin interacting with your selected AI assistants
4. **Customize**: Adjust settings and preferences in your workspace

### Available AI Assistants

- **📝 Writing Assistant**: Help with content creation, editing, and proofreading
- **💼 Business Advisor**: Strategic planning and business analysis
- **🎨 Creative Assistant**: Design ideas, brainstorming, and creative projects
- **📊 Data Analyst**: Data interpretation and visualization
- **🔬 Research Assistant**: Information gathering and analysis
- **💻 Code Helper**: Programming assistance and debugging

### Key Features

- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant synchronization across devices
- **Smart Suggestions**: Context-aware assistance recommendations


---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📋 Roadmap

### Current Version (v1.0)
- ✅ Google OAuth authentication
- ✅ AI assistant selection
- ✅ Basic workspace functionality
- ✅ Dark/Light mode toggle
- ✅ Responsive design

### Upcoming Features (v1.1)
- 🔄 Enhanced conversation history
- 🔄 Assistant customization options
- 🔄 File upload and processing
- 🔄 Export conversation transcripts
- 🔄 Advanced search functionality

### Future Enhancements (v2.0)
- 📝 Voice conversation support
- 📝 Multi-language support
- 📝 Advanced analytics dashboard
- 📝 Team collaboration features
- 📝 API for third-party integrations

---

## 🐛 Known Issues

- [ ] Occasional OAuth redirect delays
- [ ] Theme toggle may not persist in incognito mode
- [ ] Mobile keyboard may overlap input fields

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Convex](https://convex.dev/) for real-time backend services
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Google OAuth](https://developers.google.com/identity) for secure authentication

---

