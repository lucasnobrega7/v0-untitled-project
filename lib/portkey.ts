import { Portkey } from "portkey-ai"

// Initialize the Portkey client
const portkey = new Portkey({
  apiKey: process.env.PORTKEY_API_KEY || "",
  virtualKey: "open-ai-virtual-95924e",
})

// Portkey utility functions for AI integration

// Base URL for Portkey API
const PORTKEY_BASE_URL = "https://api.portkey.ai/v1"

// Helper function to create headers for Portkey requests
const createPortkeyHeaders = () => {
  return {
    "Content-Type": "application/json",
    "x-portkey-api-key": process.env.PORTKEY_API_KEY || "",
    "x-portkey-mode": "proxy",
    "x-portkey-provider": "openai", // Default provider
    "x-portkey-trace-id": `trace-${Date.now()}`, // Unique trace ID for each request
  }
}

// Generic function to make requests to Portkey
export async function makePortkeyRequest(endpoint: string, body: any, provider = "openai") {
  const url = `${PORTKEY_BASE_URL}${endpoint}`
  const headers = {
    ...createPortkeyHeaders(),
    "x-portkey-provider": provider,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Portkey request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Portkey request error:", error)
    throw error
  }
}

// Function to generate completions via Portkey
export async function generateCompletion(prompt: string, system?: string) {
  try {
    const messages = []

    // Add system message if provided
    if (system) {
      messages.push({ role: "system", content: system })
    }

    // Add user message
    messages.push({ role: "user", content: prompt })

    const chatCompletion = await portkey.chat.completions.create({
      messages,
      model: "gpt-4o",
      max_tokens: 1000,
      temperature: 0.7,
    })

    return chatCompletion
  } catch (error) {
    console.error("Error generating completion with Portkey:", error)
    throw error
  }
}

// Function to stream completions via Portkey
export async function streamCompletion(prompt: string, system?: string) {
  try {
    const messages = []

    // Add system message if provided
    if (system) {
      messages.push({ role: "system", content: system })
    }

    // Add user message
    messages.push({ role: "user", content: prompt })

    const stream = await portkey.chat.completions.create({
      messages,
      model: "gpt-4o",
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    })

    return stream
  } catch (error) {
    console.error("Error streaming completion with Portkey:", error)
    throw error
  }
}

// Function to get available providers from Portkey
// export async function getProviders() {
//   try {
//     const response = await fetch(`${PORTKEY_BASE_URL}/providers`, {
//       headers: {
//         "x-portkey-api-key": process.env.PORTKEY_API_KEY || "",
//       },
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to get providers: ${response.status} ${response.statusText}`)
//     }

//     return await response.json()
//   } catch (error) {
//     console.error("Error getting providers:", error)
//     throw error
//   }
// }

// Function to get usage metrics from Portkey
export async function getUsageMetrics(timeframe = "7d") {
  try {
    // This is a placeholder - the actual implementation would depend on
    // how Portkey exposes usage metrics in their SDK
    const metrics = await portkey.usage.get({ timeframe })
    return metrics
  } catch (error) {
    console.error("Error getting usage metrics from Portkey:", error)
    throw error
  }
}

// Function to get available models from Portkey
export async function getAvailableModels() {
  try {
    // This is a placeholder - the actual implementation would depend on
    // how Portkey exposes model information in their SDK
    const models = await portkey.models.list()
    return models
  } catch (error) {
    console.error("Error getting models from Portkey:", error)
    throw error
  }
}

// Function to get feedback on a completion
export async function getFeedback(completionId: string) {
  try {
    // This is a placeholder - the actual implementation would depend on
    // how Portkey exposes feedback in their SDK
    const feedback = await portkey.feedback.get(completionId)
    return feedback
  } catch (error) {
    console.error("Error getting feedback from Portkey:", error)
    throw error
  }
}

// Function to provide feedback on a completion
export async function provideFeedback(completionId: string, rating: "good" | "bad", comment?: string) {
  try {
    // This is a placeholder - the actual implementation would depend on
    // how Portkey allows providing feedback in their SDK
    const feedback = await portkey.feedback.create({
      completionId,
      rating,
      comment,
    })
    return feedback
  } catch (error) {
    console.error("Error providing feedback to Portkey:", error)
    throw error
  }
}
