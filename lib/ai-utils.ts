import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { generateCompletion, streamCompletion } from "./portkey"

// Function to generate text using Portkey
export async function generateAIResponse(prompt: string, system?: string) {
  try {
    // Use Portkey for AI responses
    const response = await generateCompletion(prompt, system)

    // Extract the text from the response
    const text = response.choices[0]?.message?.content || ""

    return { success: true, text }
  } catch (error) {
    console.error("Error generating AI response:", error)

    // Fallback to direct OpenAI if Portkey fails
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system: system || "You are a helpful assistant for a SaaS platform.",
      })

      return { success: true, text }
    } catch (fallbackError) {
      console.error("Fallback error generating AI response:", fallbackError)
      return { success: false, error: "Failed to generate response" }
    }
  }
}

// Function to stream text using Portkey
export async function streamAIResponse(prompt: string, system?: string, onChunk?: (chunk: string) => void) {
  try {
    // Use Portkey for streaming
    const stream = await streamCompletion(prompt, system)

    let accumulatedText = ""

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ""
      if (content) {
        accumulatedText += content
        onChunk?.(content)
      }
    }

    return {
      text: Promise.resolve(accumulatedText),
    }
  } catch (error) {
    console.error("Error streaming AI response:", error)

    // Fallback to direct OpenAI if Portkey fails
    try {
      return streamText({
        model: openai("gpt-4o"),
        prompt,
        system: system || "You are a helpful assistant for a SaaS platform.",
        onChunk: ({ chunk }) => {
          if (chunk.type === "text-delta") {
            onChunk?.(chunk.text)
          }
        },
      })
    } catch (fallbackError) {
      console.error("Fallback error streaming AI response:", fallbackError)
      throw fallbackError
    }
  }
}

// Function to analyze customer feedback
export async function analyzeSentiment(feedback: string) {
  try {
    const response = await generateCompletion(
      feedback,
      'Analyze the sentiment of this customer feedback. Respond with a JSON object with the following structure: { "sentiment": "positive" | "neutral" | "negative", "score": number from 0 to 1, "key_points": string[] }',
    )

    const text = response.choices[0]?.message?.content || ""
    return JSON.parse(text)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)

    // Fallback to direct OpenAI
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: feedback,
        system:
          'Analyze the sentiment of this customer feedback. Respond with a JSON object with the following structure: { "sentiment": "positive" | "neutral" | "negative", "score": number from 0 to 1, "key_points": string[] }',
      })

      return JSON.parse(text)
    } catch (fallbackError) {
      console.error("Fallback error analyzing sentiment:", fallbackError)
      return { sentiment: "neutral", score: 0.5, key_points: [] }
    }
  }
}

// Function to summarize text
export async function summarizeText(text: string, maxLength = 100) {
  try {
    const response = await generateCompletion(text, `Summarize the following text in ${maxLength} characters or less.`)

    return response.choices[0]?.message?.content || "Failed to generate summary"
  } catch (error) {
    console.error("Error summarizing text:", error)

    // Fallback to direct OpenAI
    try {
      const { text: summary } = await generateText({
        model: openai("gpt-4o"),
        prompt: text,
        system: `Summarize the following text in ${maxLength} characters or less.`,
      })

      return summary
    } catch (fallbackError) {
      console.error("Fallback error summarizing text:", fallbackError)
      return "Failed to generate summary"
    }
  }
}

// Function to generate content ideas
export async function generateContentIdeas(topic: string, count = 5) {
  try {
    const response = await generateCompletion(
      `Generate ${count} content ideas about ${topic}`,
      "You are a creative content strategist. Generate engaging and relevant content ideas.",
    )

    const text = response.choices[0]?.message?.content || ""
    return text.split("\n").filter((line) => line.trim() !== "")
  } catch (error) {
    console.error("Error generating content ideas:", error)

    // Fallback to direct OpenAI
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate ${count} content ideas about ${topic}`,
        system: "You are a creative content strategist. Generate engaging and relevant content ideas.",
      })

      return text.split("\n").filter((line) => line.trim() !== "")
    } catch (fallbackError) {
      console.error("Fallback error generating content ideas:", fallbackError)
      return []
    }
  }
}
