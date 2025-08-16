import OpenAI from "openai";
import { Ollama } from 'ollama';
import Groq from "groq-sdk";
import { AIProvider } from './ai-config';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  format?: 'json' | 'text';
}

export abstract class BaseAIProvider {
  protected provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  abstract chat(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
}

export class GroqProvider extends BaseAIProvider {
  private client: Groq;

  constructor(provider: AIProvider) {
    super(provider);
    if (!provider.apiKey) {
      throw new Error('Groq API key is required');
    }
    this.client = new Groq({
      apiKey: provider.apiKey,
    });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.provider.model,
        messages: messages,
        temperature: options.temperature || 0.3,
        max_tokens: options.maxTokens || 1000,
        response_format: options.format === 'json' ? { type: "json_object" } : undefined,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error(`Groq API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export class OpenRouterProvider extends BaseAIProvider {
  private client: OpenAI;

  constructor(provider: AIProvider) {
    super(provider);
    if (!provider.apiKey || !provider.baseURL) {
      throw new Error('OpenRouter API key and base URL are required');
    }
    this.client = new OpenAI({
      baseURL: provider.baseURL,
      apiKey: provider.apiKey,
    });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.provider.model,
        messages: messages,
        temperature: options.temperature || 0.3,
        max_tokens: options.maxTokens || 1000,
        response_format: options.format === 'json' ? { type: "json_object" } : undefined,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw new Error(`OpenRouter API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export class OllamaProvider extends BaseAIProvider {
  private client: Ollama;

  constructor(provider: AIProvider) {
    super(provider);
    if (!provider.baseURL) {
      throw new Error('Ollama URI is required');
    }
    this.client = new Ollama({ 
      host: provider.baseURL 
    });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const response = await this.client.chat({
        model: this.provider.model,
        messages: messages,
        stream: false,
        format: options.format === 'json' ? 'json' : undefined,
        options: {
          temperature: options.temperature || 0.3,
          top_k: 40,
          top_p: 0.9,
          repeat_penalty: 1.1,
          num_ctx: 4096,
          num_predict: options.maxTokens || 1000,
        }
      });

      return response.message?.content || '';
    } catch (error) {
      console.error('Ollama API Error:', error);
      throw new Error(`Ollama API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export class LMStudioProvider extends BaseAIProvider {
  private client: OpenAI;

  constructor(provider: AIProvider) {
    super(provider);
    if (!provider.baseURL) {
      throw new Error('LM Studio URI is required');
    }
    this.client = new OpenAI({
      baseURL: provider.baseURL,
      apiKey: 'lm-studio', // LM Studio doesn't require a real API key
    });
  }

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.provider.model,
        messages: messages,
        temperature: options.temperature || 0.3,
        max_tokens: options.maxTokens || 1000,
        // LM Studio might not support response_format
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('LM Studio API Error:', error);
      throw new Error(`LM Studio API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Factory function to create the appropriate AI provider
export function createAIProvider(provider: AIProvider): BaseAIProvider {
  switch (provider.type) {
    case 'groq':
      return new GroqProvider(provider);
    case 'openrouter':
      return new OpenRouterProvider(provider);
    case 'ollama':
      return new OllamaProvider(provider);
    case 'lmstudio':
      return new LMStudioProvider(provider);
    default:
      throw new Error(`Unsupported AI provider: ${provider.type}`);
  }
}
