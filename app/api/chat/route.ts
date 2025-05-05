import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
})

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    // Get user IP or identifier for rate limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous"
    const rateLimitKey = `ratelimit:chat:${ip}`

    // Check rate limit (5 requests per minute)
    const requests = await redis.incr(rateLimitKey)
    if (requests === 1) {
      await redis.expire(rateLimitKey, 60) // Expire after 60 seconds
    }

    if (requests > 5) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Parse the request body
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    // Use OpenAI
    const model = openai("gpt-4o")

    // Create a streaming response
    const result = streamText({
      model,
      messages,
      maxTokens: 2000,
      temperature: 0.7,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    })

    // Return the streaming response
    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "An error occurred during the chat request" }, { status: 500 })
  }
}
