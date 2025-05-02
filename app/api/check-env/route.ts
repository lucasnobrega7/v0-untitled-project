import { NextResponse } from "next/server"
import { getOpenAIClient, getCohereClient } from "@/lib/ai-client"
import { getPineconeClient } from "@/lib/pinecone-utils"
import { db } from "@/lib/db"

export async function GET() {
  const variables = []

  // Verificar OpenAI API Key
  try {
    const openai = getOpenAIClient()
    await openai.models.list()
    variables.push({
      name: "OpenAI API",
      status: "success",
      message: "Conectado com sucesso à API da OpenAI",
    })
  } catch (error) {
    variables.push({
      name: "OpenAI API",
      status: "error",
      message: "Erro ao conectar à API da OpenAI. Verifique se OPENAI_API_KEY está configurada corretamente.",
    })
  }

  // Verificar Cohere API Key
  try {
    const cohere = getCohereClient()
    // Apenas verificar se o cliente foi inicializado
    if (cohere) {
      variables.push({
        name: "Cohere API",
        status: "success",
        message: "Cliente Cohere inicializado com sucesso",
      })
    } else {
      throw new Error("Cliente não inicializado")
    }
  } catch (error) {
    variables.push({
      name: "Cohere API",
      status: "error",
      message: "Erro ao inicializar cliente Cohere. Verifique se COHERE_API_KEY está configurada corretamente.",
    })
  }

  // Verificar Pinecone API Key
  try {
    const pinecone = await getPineconeClient()
    const indexes = await pinecone.listIndexes()
    variables.push({
      name: "Pinecone API",
      status: "success",
      message: `Conectado com sucesso à API do Pinecone. ${indexes.indexes?.length || 0} índices encontrados.`,
    })
  } catch (error) {
    variables.push({
      name: "Pinecone API",
      status: "error",
      message:
        "Erro ao conectar à API do Pinecone. Verifique se PINECONE_API_KEY e PINECONE_ENVIRONMENT estão configurados corretamente.",
    })
  }

  // Verificar conexão com o banco de dados
  try {
    // Tentar executar uma consulta simples
    await db.query.knowledgeBases.findMany({
      limit: 1,
    })
    variables.push({
      name: "Banco de Dados (Neon)",
      status: "success",
      message: "Conectado com sucesso ao banco de dados",
    })
  } catch (error) {
    variables.push({
      name: "Banco de Dados (Neon)",
      status: "error",
      message: "Erro ao conectar ao banco de dados. Verifique se NEON_DATABASE_URL está configurada corretamente.",
    })
  }

  return NextResponse.json({ variables })
}
