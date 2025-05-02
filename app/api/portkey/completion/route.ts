import { NextResponse } from "next/server"
import { generateCompletion } from "@/lib/portkey"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const completion = await generateCompletion(prompt)
    const text = completion.choices[0]?.message?.content || ""

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in Portkey completion:", error)
    return NextResponse.json({ error: "Failed to generate completion" }, { status: 500 })
  }
}
