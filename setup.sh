#!/bin/bash

# =================================
# ALGOTRIP SETUP SCRIPT
# =================================

echo "🚀 AlgoTrip Environment Setup"
echo "================================"

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled"
        exit 1
    fi
fi

# Copy template
if [ -f ".env.example" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
else
    echo "❌ .env.example not found!"
    exit 1
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit .env.local with your actual API keys"
echo "2. Choose ONE AI provider and uncomment it"
echo "3. Run: pnpm dev"
echo ""
echo "🔗 Setup links:"
echo "• Convex: https://convex.dev"
echo "• Clerk: https://clerk.dev"
echo "• Arcjet: https://arcjet.com"
echo "• Unsplash: https://unsplash.com/developers"
echo "• Groq: https://console.groq.com"
echo "• OpenRouter: https://openrouter.ai"
echo "• Ollama: https://ollama.ai"
echo "• LM Studio: https://lmstudio.ai"
echo ""
echo "📚 For detailed setup instructions, see:"
echo "• README.md (Bahasa Indonesia)"
echo "• README_EN.md (English)"
echo "• AI_PROVIDER_GUIDE.md (Bahasa Indonesia)"
echo "• AI_PROVIDER_GUIDE_EN.md (English)"
