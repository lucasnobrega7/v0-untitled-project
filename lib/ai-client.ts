import OpenAI from "openai"
import { CohereClient } from "cohere-ai"

// Cliente OpenAI para acesso aos modelos
let openaiClient: OpenAI | null = null

export function getOpenAIClient() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })
  }
  return openaiClient
}

// Cliente Cohere para embeddings
let cohereClient: CohereClient | null = null

export function getCohereClient() {
  if (!cohereClient) {
    cohereClient = new CohereClient({
      token: process.env.COHERE_API_KEY!,
    })
  }
  return cohereClient
}

export async function generateResponse(prompt: string, modelId = "gpt-4o", options: any = {}) {
  const client = getOpenAIClient()

  const response = await client.chat.completions.create({
    model: modelId,
    messages: [{ role: "user", content: prompt }],
    temperature: options.temperature || 0.7,
    max_tokens: options.maxTokens || 1000,
    stream: false,
  })

  return response
}

export async function createEmbedding(text: string, modelId = "text-embedding-3-small") {
  const client = getOpenAIClient()

  const response = await client.embeddings.create({
    model: modelId,
    input: text,
  })

  return response.data[0].embedding
}

// Função alternativa usando Cohere para embeddings
export async function createCohereEmbedding(text: string) {
  const client = getCohereClient()

  const response = await client.embed({
    texts: [text],
    model: "embed-english-v3.0",
  })

  return response.embeddings[0]
}
