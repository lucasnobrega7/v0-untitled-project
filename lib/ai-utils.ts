import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to generate text using OpenAI
export async function generateAIResponse(prompt: string, system?: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system: system || "You are a helpful assistant for a SaaS platform.",
    })

    return { success: true, text }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return { success: false, error: "Failed to generate response" }
  }
}

// Function to stream text from OpenAI
export async function streamAIResponse(prompt: string, system?: string, onChunk?: (chunk: string) => void) {
  try {
    const result = streamText({
      model: openai("gpt-4o"),
      prompt,
      system: system || "You are a helpful assistant for a SaaS platform.",
      onChunk: ({ chunk }) => {
        if (chunk.type === "text-delta") {
          onChunk?.(chunk.text)
        }
      },
    })

    return result
  } catch (error) {
    console.error("Error streaming AI response:", error)
    throw error
  }
}

// Function to analyze customer feedback
export async function analyzeSentiment(feedback: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: feedback,
      system:
        'Analyze the sentiment of this customer feedback. Respond with a JSON object with the following structure: { "sentiment": "positive" | "neutral" | "negative", "score": number from 0 to 1, "key_points": string[] }',
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return { sentiment: "neutral", score: 0.5, key_points: [] }
  }
}

// Function to summarize text
export async function summarizeText(text: string, maxLength = 100) {
  try {
    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt: text,
      system: `Summarize the following text in ${maxLength} characters or less.`,
    })

    return summary
  } catch (error) {
    console.error("Error summarizing text:", error)
    return "Failed to generate summary"
  }
}

// Function to generate content ideas
export async function generateContentIdeas(topic: string, count = 5) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate ${count} content ideas about ${topic}`,
      system: "You are a creative content strategist. Generate engaging and relevant content ideas.",
    })

    return text.split("\n").filter((line) => line.trim() !== "")
  } catch (error) {
    console.error("Error generating content ideas:", error)
    return []
  }
}
