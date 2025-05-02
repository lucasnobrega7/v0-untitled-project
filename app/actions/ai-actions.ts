"use server"

import { generateAIResponse, analyzeSentiment, summarizeText, generateContentIdeas } from "@/lib/ai-utils"

export async function generateResponse(prompt: string, system?: string) {
  return generateAIResponse(prompt, system)
}

export async function analyzeCustomerFeedback(feedback: string) {
  return analyzeSentiment(feedback)
}

export async function getSummary(text: string, maxLength?: number) {
  return summarizeText(text, maxLength)
}

export async function getContentIdeas(topic: string, count?: number) {
  return generateContentIdeas(topic, count)
}
