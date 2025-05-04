import { NextResponse } from "next/server"
import { OpenAI } from "openai"
import { CohereClient } from "cohere-ai"
import { checkDatabaseConnection } from "@/lib/db"
import { getPineconeClient } from "@/lib/pinecone-utils"

export async function GET() {
  const results = {
    openai: { status: false, error: null },
    cohere: { status: false, error: null },
    pinecone: { status: false, error: null },
    neon: { status: false, error: null },
  }

  // Verificar OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5,
      })

      results.openai.status = !!response.choices[0].message.content
    } catch (error: any) {
      console.error("Erro ao verificar OpenAI:", error)
      results.openai.error = error.message || "Erro desconhecido"
    }
  } else {
    results.openai.error = "API key não configurada"
  }

  // Verificar Cohere
  if (process.env.COHERE_API_KEY) {
    try {
      const cohere = new CohereClient({
        token: process.env.COHERE_API_KEY,
      })

      const response = await cohere.embed({
        texts: ["Hello"],
        model: "embed-english-v3.0",
      })

      results.cohere.status = response.embeddings.length > 0
    } catch (error: any) {
      console.error("Erro ao verificar Cohere:", error)
      results.cohere.error = error.message || "Erro desconhecido"
    }
  } else {
    results.cohere.error = "API key não configurada"
  }

  // Verificar Pinecone
  if (process.env.PINECONE_API_KEY && process.env.PINECONE_ENVIRONMENT) {
    try {
      const pinecone = await getPineconeClient()
      const indexes = await pinecone.listIndexes()

      results.pinecone.status = true
    } catch (error: any) {
      console.error("Erro ao verificar Pinecone:", error)
      results.pinecone.error = error.message || "Erro desconhecido"
    }
  } else {
    results.pinecone.error = "API key ou ambiente não configurados"
  }

  // Verificar Neon
  try {
    const dbResult = await checkDatabaseConnection()
    results.neon.status = dbResult.success

    if (!dbResult.success) {
      results.neon.error = dbResult.error || "Erro desconhecido"
    }
  } catch (error: any) {
    console.error("Erro ao verificar Neon:", error)
    results.neon.error = error.message || "Erro desconhecido"
  }

  return NextResponse.json(results)
}
