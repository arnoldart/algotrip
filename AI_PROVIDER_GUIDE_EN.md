# 🤖 AI Provider Configuration Guide (English)

> 🌐 **[README Bahasa Indonesia](README.md)** | **[README English](README_EN.md)** | **[AI Provider Guide (ID)](AI_PROVIDER_GUIDE.md)**

## ✅ Current Status
- **Active Provider**: Configurable (depends on .env.local settings)
- **Validation**: ✅ Working properly
- **Application**: ✅ Running successfully with proper configuration

## 🔧 Validation System

The application automatically validates AI provider configuration on startup:

### ✅ Valid Configuration
```bash
# Only one provider with both API key/URI and model configured
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
**Result**: ✅ `Using Ollama (ollama) with model: qwen2.5:7b`

### ❌ No Provider Configured
```bash
# All providers commented or empty
# GROQ_API=
# GROQ_MODEL=
# OPENROUTER_API=
# OPENROUTER_MODEL=
```
**Result**: ❌ Error asking to configure one provider with model

### ❌ Missing Model Configuration
```bash
# Provider configured but model missing
GROQ_API=gsk_your_key
# GROQ_MODEL=  <- Missing!
```
**Result**: ❌ Error asking to set model for the provider

### ❌ Multiple Providers Configured
```bash
# Multiple providers active
GROQ_API=your_key
GROQ_MODEL=llama-3.1-70b-versatile
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
**Result**: ❌ Error asking to configure only one provider

## 🚀 Supported Providers

### 1. Groq (Recommended)
```bash
GROQ_API=gsk_...
GROQ_MODEL=llama-3.1-70b-versatile
```
- **Model**: Configurable (llama-3.1-70b-versatile, etc.)
- **Speed**: ⚡ Very fast inference
- **Cost**: 💰 Pay per token
- **Setup**: Register at [console.groq.com](https://console.groq.com)

### 2. OpenRouter
```bash
OPENROUTER_API=sk-or-v1-...
OPENROUTER_MODEL=google/gemini-2.5-flash
```
- **Model**: Configurable (google/gemini-2.5-flash, etc.)
- **Speed**: ⚡ Fast
- **Cost**: 💰 Pay per token
- **Setup**: Register at [openrouter.ai](https://openrouter.ai)

### 3. Ollama (Local)
```bash
OLLAMA_URI=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```
- **Model**: Configurable (qwen2.5:7b, llama3.1, etc.)
- **Speed**: 🔄 Depends on hardware
- **Cost**: 🆓 Free (local)
- **Setup**: Install [Ollama](https://ollama.ai) + `ollama pull qwen2.5:7b`

### 4. LM Studio (Local)
```bash
LM_STUDIO_URI=http://localhost:1234/v1
LM_STUDIO_MODEL=local-model
```
- **Model**: 🔧 Configurable (depends on loaded model)
- **Speed**: 🔄 Depends on hardware
- **Cost**: 🆓 Free (local)
- **Setup**: Install [LM Studio](https://lmstudio.ai) + start server

## 🧪 Testing Configuration

To test your configuration, check the console output when starting the development server:
```bash
pnpm dev
```

Look for validation messages like:
```
🔧 Validating AI configuration...
✅ Using [Provider] ([type]) with model: [model_name]
```

## 📝 Environment Variables Template

```bash
# AI Providers - CONFIGURE ONLY ONE AT A TIME!
# Both API key/URI and MODEL are required for each provider

# Option 1: Groq (Recommended)
# GROQ_API=gsk_your_groq_api_key
# GROQ_MODEL=llama-3.1-70b-versatile

# Option 2: OpenRouter
# OPENROUTER_API=sk-or-v1-your_openrouter_api_key
# OPENROUTER_MODEL=google/gemini-2.5-flash

# Option 3: Ollama (Local)
# OLLAMA_URI=http://localhost:11434
# OLLAMA_MODEL=qwen2.5:7b

# Option 4: LM Studio (Local)
# LM_STUDIO_URI=http://localhost:1234/v1
# LM_STUDIO_MODEL=local-model
```

## 🔄 Switching Providers

1. Comment out current provider (both variables)
2. Uncomment desired provider
3. Add your API key/URI and model name
4. Restart development server

Example switch from Ollama to Groq:
```bash
# Option 1: Groq
GROQ_API=gsk_your_groq_api_key
GROQ_MODEL=llama-3.1-70b-versatile

# Option 3: Ollama 
# OLLAMA_URI=http://localhost:11434
# OLLAMA_MODEL=qwen2.5:7b
```

## 🛡️ Error Handling

The application includes comprehensive error handling:
- ✅ Startup validation with clear error messages
- ✅ Runtime error handling for API failures
- ✅ Fallback responses for invalid AI responses
- ✅ Rate limiting protection with Arcjet

## 🔍 Common Issues

### Issue: "No AI provider configured properly!"
**Solution**: Make sure both API key/URI and MODEL are set for one provider.

### Issue: "Multiple AI providers configured"
**Solution**: Comment out all providers except one.

### Issue: "Model not configured for [Provider]"
**Solution**: Set the MODEL environment variable for your chosen provider.

### Issue: AI responses are inconsistent
**Solution**: Check if your chosen model is appropriate for chat-based interactions.

## 📚 Model Recommendations

### For Chat/Conversation:
- **Groq**: `llama-3.1-70b-versatile`, `llama-3.1-8b-instant`
- **OpenRouter**: `google/gemini-2.5-flash`, `anthropic/claude-3.5-sonnet`
- **Ollama**: `qwen2.5:7b`, `llama3.1:8b`

### For JSON Output:
- **Groq**: `llama-3.1-70b-versatile` (best JSON compliance)
- **OpenRouter**: `google/gemini-2.5-flash` (good structured output)
- **Ollama**: `qwen2.5:7b` (decent JSON support)

## 🎯 Performance Tips

1. **Groq**: Fastest inference, good for production
2. **OpenRouter**: Good balance of speed and model variety
3. **Ollama**: Best for privacy, requires good hardware
4. **LM Studio**: Easy local setup, GUI management

Choose based on your priorities: speed, cost, privacy, or ease of use.
