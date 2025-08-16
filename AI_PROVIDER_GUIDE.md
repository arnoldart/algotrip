# 🤖 Panduan Konfigurasi AI Provider

> 🌐 **[README Bahasa Indonesia](README.md)** | **[README English](README_EN.md)** | **[AI Provider Guide (EN)](AI_PROVIDER_GUIDE_EN.md)**

## ✅ Status Saat Ini
- **Provider Aktif**: OpenRouter (google/gemini-2.5-flash)
- **Validasi**: ✅ Berfungsi dengan baik
- **Aplikasi**: ✅ Berjalan dengan sukses

## 🔧 Sistem Validasi

Aplikasi secara otomatis memvalidasi konfigurasi AI provider saat startup:

### ✅ Konfigurasi Valid
```bash
# Hanya satu provider dengan API key dan model yang dikonfigurasi
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
**Hasil**: ✅ `Using Ollama (ollama) with model: qwen2.5:7b`

### ❌ Tidak Ada Provider yang Dikonfigurasi
```bash
# Semua provider dikomentari atau kosong
# GROQ_API=
# GROQ_MODEL=
# OPENROUTER_API=
# OPENROUTER_MODEL=
```
**Hasil**: ❌ Error meminta untuk mengkonfigurasi satu provider dengan model

### ❌ Konfigurasi Model Hilang
```bash
# Provider dikonfigurasi tapi model hilang
GROQ_API=gsk_your_key
# GROQ_MODEL=  <- Hilang!
```
**Hasil**: ❌ Error meminta untuk mengatur model untuk provider

### ❌ Multiple Provider Dikonfigurasi
```bash
# Multiple provider aktif
GROQ_API=your_key
GROQ_MODEL=llama-3.1-70b-versatile
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
**Hasil**: ❌ Error meminta untuk mengkonfigurasi hanya satu provider

## 🚀 Provider yang Didukung

### 1. Groq (Direkomendasikan)
```bash
GROQ_API=gsk_...
GROQ_MODEL=llama-3.1-70b-versatile
```
- **Model**: Dapat dikonfigurasi (llama-3.1-70b-versatile, dll.)
- **Kecepatan**: ⚡ Inference sangat cepat
- **Biaya**: 💰 Bayar per token
- **Setup**: Daftar di [console.groq.com](https://console.groq.com)

### 2. OpenRouter
```bash
OPENROUTER_API=sk-or-v1-...
OPENROUTER_MODEL=google/gemini-2.5-flash
```
- **Model**: Dapat dikonfigurasi (google/gemini-2.5-flash, dll.)
- **Kecepatan**: ⚡ Cepat
- **Biaya**: 💰 Bayar per token
- **Setup**: Daftar di [openrouter.ai](https://openrouter.ai)

### 3. Ollama (Lokal)
```bash
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
- **Model**: Dapat dikonfigurasi (qwen2.5:7b, llama3.1, dll.)
- **Kecepatan**: 🔄 Tergantung hardware
- **Biaya**: 🆓 Gratis (lokal)
- **Setup**: Install [Ollama](https://ollama.ai) + `ollama pull qwen2.5:7b`

### 4. LM Studio (Lokal)
```bash
LM_STUDIO_URI=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
```
- **Model**: 🔧 Dapat dikonfigurasi (tergantung model yang dimuat)
- **Kecepatan**: 🔄 Tergantung hardware
- **Biaya**: 🆓 Gratis (lokal)
- **Setup**: Install [LM Studio](https://lmstudio.ai) + start server

## 🧪 Testing Konfigurasi

Untuk menguji konfigurasi Anda, jalankan:
```bash
pnpm dev
```

Cek output di console untuk melihat validasi:
```
🔧 Validating AI configuration...
✅ Using [Provider] ([type]) with model: [model_name]
```

## 📝 Template Environment Variables

```bash
# AI Providers - KONFIGURASI HANYA SATU DALAM SATU WAKTU!
# API key/URI dan MODEL diperlukan untuk setiap provider

# Option 1: Groq (Direkomendasikan)
# GROQ_API=gsk_your_groq_api_key
# GROQ_MODEL=llama-3.1-70b-versatile

# Option 2: OpenRouter
# OPENROUTER_API=sk-or-v1-your_openrouter_api_key
# OPENROUTER_MODEL=google/gemini-2.5-flash

# Option 3: Ollama (Saat Ini Aktif)
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Option 4: LM Studio (Lokal)
# LM_STUDIO_URI=http://localhost:1234/v1
# LM_STUDIO_MODEL=local-model
```

## 🔄 Mengganti Provider

1. Komentari provider saat ini (kedua variabel)
2. Uncomment provider yang diinginkan
3. Tambahkan API key/URI dan nama model Anda
4. Restart development server

Contoh beralih dari Ollama ke Groq:
```bash
# Option 1: Groq
GROQ_API=gsk_your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile

# Option 3: Ollama 
# OLLAMA_URI=http://localhost:11434
# OLLAMA_MODEL=qwen2.5:7b
```

## 🛡️ Error Handling

Aplikasi mencakup error handling yang komprehensif:
- ✅ Validasi startup dengan pesan error yang jelas
- ✅ Runtime error handling untuk kegagalan API
- ✅ Fallback responses untuk respon AI yang tidak valid
- ✅ Perlindungan rate limiting dengan Arcjet

## 🔍 Masalah Umum

### Masalah: "No AI provider configured properly!"
**Solusi**: Pastikan API key/URI dan MODEL diatur untuk satu provider.

### Masalah: "Multiple AI providers configured"
**Solusi**: Komentari semua provider kecuali satu.

### Masalah: "Model not configured for [Provider]"
**Solusi**: Atur environment variable MODEL untuk provider yang dipilih.

### Masalah: Respon AI tidak konsisten
**Solusi**: Periksa apakah model yang dipilih sesuai untuk interaksi berbasis chat.

## 📚 Rekomendasi Model

### Untuk Chat/Percakapan:
- **Groq**: `llama-3.1-70b-versatile`, `llama-3.1-8b-instant`
- **OpenRouter**: `google/gemini-2.5-flash`, `anthropic/claude-3.5-sonnet`
- **Ollama**: `qwen2.5:7b`, `llama3.1:8b`

### Untuk Output JSON:
- **Groq**: `llama-3.1-70b-versatile` (kepatuhan JSON terbaik)
- **OpenRouter**: `google/gemini-2.5-flash` (output terstruktur yang baik)
- **Ollama**: `qwen2.5:7b` (dukungan JSON yang layak)

## 🎯 Tips Performa

1. **Groq**: Inference tercepat, bagus untuk produksi
2. **OpenRouter**: Keseimbangan yang baik antara kecepatan dan variasi model
3. **Ollama**: Terbaik untuk privasi, memerlukan hardware yang baik
4. **LM Studio**: Setup lokal yang mudah, manajemen GUI

Pilih berdasarkan prioritas Anda: kecepatan, biaya, privasi, atau kemudahan penggunaan.
