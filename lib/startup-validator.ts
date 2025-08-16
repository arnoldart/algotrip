import { validateAIConfig, getAIProviderInfo } from './ai-config';

export function validateStartupConfig() {
  console.log('🔧 Validating AI configuration...');
  
  try {
    const provider = validateAIConfig();
    console.log(`✅ ${getAIProviderInfo()}`);
    return provider;
  } catch (error) {
    console.error('❌ AI Configuration Error:');
    console.error(error instanceof Error ? error.message : 'Unknown error');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('\n📋 Setup Instructions:');
      console.log('1. Choose ONE AI provider to use:');
      console.log('   • Groq: Set GROQ_API + GROQ_MODEL in .env.local');
      console.log('   • OpenRouter: Set OPENROUTER_API + OPENROUTER_MODEL in .env.local');
      console.log('   • Ollama: Set OLLAMA_URI + OLLAMA_MODEL in .env.local');
      console.log('   • LM Studio: Set LM_STUDIO_URI + LM_STUDIO_MODEL in .env.local');
      console.log('\n2. Example configurations:');
      console.log('   GROQ_API=gsk_xxx + GROQ_MODEL=llama-3.1-70b-versatile');
      console.log('   OPENROUTER_API=sk-or-v1-xxx + OPENROUTER_MODEL=google/gemini-2.5-flash');
      console.log('   OLLAMA_URI=http://localhost:11434 + OLLAMA_MODEL=qwen2.5:7b');
      console.log('\n3. Restart the development server');
      console.log('\n⚠️  Configure only ONE provider at a time!');
    }
    
    throw error;
  }
}

if (process.env.NODE_ENV === 'development') {
  try {
    validateStartupConfig();
  } catch (error) {
  }
}
