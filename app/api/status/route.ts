import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/ai-client"
import { getPineconeClient } from "@/lib/pinecone-utils"
import { db } from "@/lib/db"

export async function GET() {
  const services = []

  // Verificar OpenAI
  try {
    const openai = getOpenAIClient()
    await openai.models.list()
    services.push({
      name: "OpenAI",
      status: "online",
      message: "API conectada e funcionando",
    })
  } catch (error) {
    services.push({
      name: "OpenAI",
      status: "offline",
      message: "Erro na conexão com a API",
    })
  }

  // Verificar Pinecone
  try {
    const pinecone = await getPineconeClient()
    await pinecone.listIndexes()
    services.push({
      name: "Pinecone",
      status: "online",
      message: "API conectada e funcionando",
    })
  } catch (error) {
    services.push({
      name: "Pinecone",
      status: "offline",
      message: "Erro na conexão com a API",
    })
  }

  // Verificar Banco de Dados
  try {
    // Tentar executar uma consulta simples
    await db.query.conversations.findMany({
      limit: 1,
    })
    services.push({
      name: "Banco de Dados (Neon)",
      status: "online",
      message: "Conexão estabelecida com sucesso",
    })
  } catch (error) {
    services.push({
      name: "Banco de Dados (Neon)",
      status: "offline",
      message: "Erro na conexão com o banco de dados",
    })
  }

  return NextResponse.json({ services })
}
