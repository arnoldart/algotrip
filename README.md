# 🌍 Algo Trip - AI-Powered Trip Planner

> 🌐 **[English Version](README_EN.md)** | **[AI Provider Guide](AI_PROVIDER_GUIDE.md)** | **[AI Provider Guide (EN)](AI_PROVIDER_GUIDE_EN.md)**

AlgoTrip adalah aplikasi web yang membantu Anda merencanakan perjalanan yang sempurna dengan bantuan kecerdasan buatan. Aplikasi ini menggunakan AI untuk membuat itinerary perjalanan yang personal dan detail berdasarkan preferensi, budget, dan kebutuhan Anda.

## ✨ Fitur Utama

- **AI Trip Planning**: Chatbot AI interaktif yang membantu merencanakan perjalanan step-by-step
- **Personal Itinerary**: Membuat jadwal perjalanan detail dengan rekomendasi tempat, hotel, dan aktivitas
- **Budget Management**: Kalkulasi biaya perjalanan dengan harga dalam IDR
- **Image Integration**: Menampilkan gambar real dari hotel dan tempat wisata menggunakan DuckDuckGo Search
- **User Authentication**: Sistem login/register dengan Clerk
- **Trip Management**: Menyimpan dan mengelola rencana perjalanan
- **Rate Limiting**: Pembatasan penggunaan dengan Arcjet untuk mencegah spam
- **Responsive Design**: Interface yang mobile-friendly dengan Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework dengan App Router
- **React 19** - Library JavaScript untuk UI
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** & **Tabler Icons** - Icon libraries
- **Motion** - Animation library
- **Magic UI** - UI components

### Backend & Database
- **Convex** - Real-time database dan backend
- **Clerk** - Authentication dan user management
- **Arcjet** - Rate limiting dan security

### AI & Integration
- **Groq** - Fast AI inference with Llama models
- **Ollama** - Local AI model (Qwen2.5:7b)
- **OpenAI/OpenRouter** - Cloud AI model integration
- **LM Studio** - Local AI model server
- **Unplash Image** - Image search untuk hotel dan tempat wisata

### Development Tools
- **PNPM** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (versi 18+)
2. **PNPM** package manager
3. **AI Provider** (pilih salah satu):
   - **Groq API** untuk cloud inference yang cepat
   - **Ollama** untuk local AI model
   - **OpenRouter** untuk berbagai AI models
   - **LM Studio** untuk local AI server
4. **Convex** account untuk database
5. **Clerk** account untuk authentication

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
Salin file template dan isi dengan nilai aktual:
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi dengan nilai API keys Anda:
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
# AI PROVIDER (PILIH SALAH SATU SAJA!)
# =================================
# Groq (Recommended - Fast cloud inference)
GROQ_API=your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile

# Atau OpenRouter (Multiple AI models)
OPENROUTER_API=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.5-flash

# Atau Ollama (Local AI)
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Atau LM Studio (Local AI server)
LM_STUDIO_URI=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
```

⚠️ **PENTING**: 
- Konfigurasi hanya SATU AI provider. Aplikasi akan error jika lebih dari satu provider dikonfigurasi.
- Setiap provider memerlukan dua environment variables: API key/URI + MODEL name.

4. **Setup AI Provider**

Pilih salah satu AI provider:

**Option A: Groq (Recommended)**
```bash
# Daftar di https://console.groq.com
# Dapatkan API key dan tambahkan ke .env.local:
GROQ_API=your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile
```

**Option B: Ollama (Local)**
```bash
# Install Ollama dari https://ollama.ai
# Download model yang dibutuhkan
ollama pull qwen2.5:7b
# Set URI dan model di .env.local:
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```

**Option C: OpenRouter**
```bash
# Daftar di https://openrouter.ai
# Dapatkan API key dan tambahkan ke .env.local:
OPENROUTER_API=your_openrouter_api_key
OPENROUTER_MODEL=google/gemini-2.5-flash
```

**Option D: LM Studio**
```bash
# Install LM Studio dari https://lmstudio.ai
# Start local server dan set URI di .env.local:
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

Jika konfigurasi benar, Anda akan melihat:
```
🔧 Validating AI configuration...
✅ Using [Provider Name] ([provider type]) with model: [model name]
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## ⚠️ Important Notes

- **Konfigurasi hanya SATU AI provider** - Aplikasi akan menampilkan error jika lebih dari satu provider dikonfigurasi
- **Validasi otomatis** - Sistem akan memvalidasi konfigurasi saat startup
- **Error handling** - Pesan error yang jelas akan ditampilkan jika ada masalah konfigurasi

## 📱 Cara Menggunakan

1. **Registrasi/Login**: Daftar atau masuk menggunakan email
2. **Chat dengan AI**: Klik "Create new trip" dan ikuti pertanyaan AI:
   - Lokasi asal
   - Destinasi tujuan
   - Jumlah peserta (Solo/Couple/Family/Friends)
   - Budget (Low/Medium/High)
   - Durasi perjalanan
   - Minat perjalanan (adventure, cultural, food, dll)
3. **Review Itinerary**: AI akan generate jadwal perjalanan lengkap dengan:
   - Rekomendasi hotel dengan harga
   - Aktivitas harian
   - Estimasi waktu dan biaya
   - Gambar tempat wisata
4. **Simpan Trip**: Rencana perjalanan tersimpan di "My Trips"

## 🏗️ Struktur Project

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
1. Push ke GitHub repository
2. Connect repository di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Environment Variables untuk Production
Pastikan semua environment variables sudah di-set di platform hosting Anda.

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub repository atau hubungi developer.

---