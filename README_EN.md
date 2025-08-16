# 🌍 AlgoTrip - AI-Powered Trip Planner

> 🌐 **[Bahasa Indonesia](README.md)** | **[AI Provider Guide](AI_PROVIDER_GUIDE.md)** | **[AI Provider Guide (EN)](AI_PROVIDER_GUIDE_EN.md)**

AlgoTrip is a web application that helps you plan the perfect trip with the assistance of artificial intelligence. This application uses AI to create personalized and detailed travel itineraries based on your preferences, budget, and needs.

## ✨ Key Features

- **AI Trip Planning**: Interactive AI chatbot that helps plan trips step-by-step
- **Personal Itinerary**: Creates detailed travel schedules with recommendations for places, hotels, and activities
- **Budget Management**: Travel cost calculation with prices in IDR
- **Image Integration**: Displays real images of hotels and tourist attractions using Unsplash API
- **User Authentication**: Login/register system with Clerk
- **Trip Management**: Save and manage travel plans
- **Rate Limiting**: Usage limitations with Arcjet to prevent spam
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - JavaScript library for UI
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** & **Tabler Icons** - Icon libraries
- **Motion** - Animation library
- **Magic UI** - UI components

### Backend & Database
- **Convex** - Real-time database and backend
- **Clerk** - Authentication and user management
- **Arcjet** - Rate limiting and security

### AI & Integration
- **Groq** - Fast AI inference with Llama models
- **Ollama** - Local AI model (Qwen2.5:7b)
- **OpenAI/OpenRouter** - Cloud AI model integration
- **LM Studio** - Local AI model server
- **Unsplash API** - Image search for hotels and tourist attractions

### Development Tools
- **PNPM** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (version 18+)
2. **PNPM** package manager
3. **AI Provider** (choose one):
   - **Groq API** for fast cloud inference
   - **Ollama** for local AI model
   - **OpenRouter** for various AI models
   - **LM Studio** for local AI server
4. **Convex** account for database
5. **Clerk** account for authentication

### Installation

1. **Clone repository**
```bash
git clone https://github.com/arnoldart/algotrip.git
cd algotrip
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**
Copy the template file and fill with actual values:
```bash
cp .env.example .env.local
```

Edit `.env.local` and fill with your API keys:
```env
# =================================
# CONVEX DATABASE
# =================================
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

# =================================
# CLERK AUTHENTICATION
# =================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# =================================
# SECURITY & RATE LIMITING
# =================================
ARCJET_KEY=your_arcjet_key

# =================================
# IMAGE SERVICE
# =================================
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# =================================
# AI PROVIDER (CHOOSE ONLY ONE!)
# =================================
# Groq (Recommended - Fast cloud inference)
GROQ_API=your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile

# Or OpenRouter (Multiple AI models)
OPENROUTER_API=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.5-flash

# Or Ollama (Local AI)
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Or LM Studio (Local AI server)
LM_STUDIO_URI=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
```

⚠️ **IMPORTANT**: 
- Configure only ONE AI provider. The application will error if more than one provider is configured.
- Each provider requires two environment variables: API key/URI + MODEL name.

4. **Setup AI Provider**

Choose one AI provider:

**Option A: Groq (Recommended)**
```bash
# Register at https://console.groq.com
# Get API key and add to .env.local:
GROQ_API=your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile
```

**Option B: Ollama (Local)**
```bash
# Install Ollama from https://ollama.ai
# Download required model
ollama pull qwen2.5:7b
# Set URI and model in .env.local:
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```

**Option C: OpenRouter**
```bash
# Register at https://openrouter.ai
# Get API key and add to .env.local:
OPENROUTER_API=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.5-flash
```

**Option D: LM Studio**
```bash
# Install LM Studio from https://lmstudio.ai
# Start local server and set URI in .env.local:
LM_STUDIO_URI=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
```

5. **Setup Convex**
```bash
npx convex dev
```

6. **Run development server**
```bash
pnpm dev
```

If configuration is correct, you will see:
```
🔧 Validating AI configuration...
✅ Using [Provider Name] ([provider type]) with model: [model name]
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ⚠️ Important Notes

- **Configure only ONE AI provider** - Application will show error if more than one provider is configured
- **Automatic validation** - System will validate configuration on startup
- **Error handling** - Clear error messages will be displayed if there are configuration issues

## 📱 How to Use

1. **Register/Login**: Sign up or log in using email
2. **Chat with AI**: Click "Create new trip" and follow AI questions:
   - Starting location
   - Destination
   - Group size (Solo/Couple/Family/Friends)
   - Budget (Low/Medium/High)
   - Trip duration
   - Travel interests (adventure, cultural, food, etc.)
3. **Review Itinerary**: AI will generate complete travel schedule with:
   - Hotel recommendations with prices
   - Daily activities
   - Time and cost estimates
   - Tourist attraction images
4. **Save Trip**: Travel plans are saved in "My Trips"

## 🏗️ Project Structure

```
algotrip/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── api/                 # API routes
│   ├── create-new-trip/     # Trip creation page
│   ├── my-trips/           # User trips management
│   └── _components/        # Shared components
├── components/             # UI components
├── convex/                # Database schema & functions
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
├── utils/                 # Helper functions
└── public/               # Static assets
```

## 🔧 Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Convex
npx convex dev        # Start Convex development
npx convex deploy     # Deploy to Convex
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect repository on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Environment Variables for Production
Make sure all environment variables are set on your hosting platform.

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you have questions or issues, please create an issue on GitHub repository or contact the developer.

---

Built with ❤️ using Next.js and AI
