export interface AIProvider {
  type: 'groq' | 'openrouter' | 'ollama' | 'lmstudio';
  name: string;
  apiKey?: string;
  baseURL?: string;
  model: string;
}

export function validateAIConfig(): AIProvider {
  const providers = [
    {
      type: 'groq' as const,
      name: 'Groq',
      apiKey: process.env.GROQ_API,
      model: process.env.GROQ_MODEL
    },
    {
      type: 'openrouter' as const,
      name: 'OpenRouter',
      apiKey: process.env.OPENROUTER_API,
      baseURL: 'https://openrouter.ai/api/v1',
      model: process.env.OPENROUTER_MODEL
    },
    {
      type: 'ollama' as const,
      name: 'Ollama',
      baseURL: process.env.OLLAMA_URI || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL
    },
    {
      type: 'lmstudio' as const,
      name: 'LM Studio',
      baseURL: process.env.LM_STUDIO_URI,
      model: process.env.LM_STUDIO_MODEL
    }
  ];

  // Filter providers that have valid configuration
  const availableProviders = providers.filter(provider => {
    if (provider.type === 'groq' || provider.type === 'openrouter') {
      return provider.apiKey && 
             provider.apiKey.trim() !== '' && 
             provider.apiKey !== 'your_groq_api_key' && 
             provider.apiKey !== 'your_openrouter_api_key' &&
             provider.model && 
             provider.model.trim() !== '';
    }
    if (provider.type === 'ollama') {
      const uri = provider.baseURL || '';
      return uri.trim() !== '' && 
             uri !== 'http://localhost:11434' && 
             process.env.OLLAMA_URI && 
             process.env.OLLAMA_URI.trim() !== '' &&
             provider.model && 
             provider.model.trim() !== '';
    }
    if (provider.type === 'lmstudio') {
      const uri = provider.baseURL || '';
      return uri.trim() !== '' && 
             uri !== 'http://localhost:1234/v1' && 
             process.env.LM_STUDIO_URI && 
             process.env.LM_STUDIO_URI.trim() !== '' &&
             provider.model && 
             provider.model.trim() !== '';
    }
    return false;
  });

  if (availableProviders.length === 0) {
    throw new Error(
      'No AI provider configured properly! Please set one of the following environment variables:\n' +
      '- GROQ_API + GROQ_MODEL (for Groq)\n' +
      '- OPENROUTER_API + OPENROUTER_MODEL (for OpenRouter)\n' +
      '- OLLAMA_URI + OLLAMA_MODEL (for Ollama)\n' +
      '- LM_STUDIO_URI + LM_STUDIO_MODEL (for LM Studio)\n\n' +
      'Both API key/URI and MODEL must be provided for each provider.'
    );
  }

  if (availableProviders.length > 1) {
    const configuredProviders = availableProviders.map(p => p.name).join(', ');
    throw new Error(
      `Multiple AI providers configured: ${configuredProviders}. ` +
      'Please configure only ONE provider at a time by setting only one set of environment variables.'
    );
  }

  const selectedProvider = availableProviders[0];
  
  // Ensure model is always defined at this point
  if (!selectedProvider.model || selectedProvider.model.trim() === '') {
    throw new Error(
      `Model not configured for ${selectedProvider.name}. ` +
      `Please set ${selectedProvider.type.toUpperCase()}_MODEL environment variable.`
    );
  }

  return selectedProvider as AIProvider;
}

export function getAIProviderInfo(): string {
  try {
    const provider = validateAIConfig();
    return `Using ${provider.name} (${provider.type}) with model: ${provider.model}`;
  } catch (error) {
    return `AI Configuration Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
