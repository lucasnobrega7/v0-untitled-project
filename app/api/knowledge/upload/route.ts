import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/user-context"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { Pinecone } from "@pinecone-database/pinecone"

// Configurações específicas para o índice existente
const PINECONE_INDEX_NAME = "agentesdeconversao"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    const { text, knowledgeBaseId, filename } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Texto não fornecido" }, { status: 400 })
    }

    // Dividir o texto em chunks menores
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const chunks = await textSplitter.splitText(text)

    // Inicializar cliente Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    })

    // Obter o índice
    const index = pinecone.index(PINECONE_INDEX_NAME)

    // Criar embeddings usando a API de inferência do Pinecone
    const embeddings = await pinecone.embeddings.embed({
      model: "llama-text-embed-v2",
      inputs: chunks,
    })

    // Preparar os vetores para upsert
    const documentId = `doc-${Date.now()}`
    const vectors = chunks.map((chunk, i) => ({
      id: `${documentId}-${i}`,
      values: embeddings[i],
      metadata: {
        text: chunk, // Campo "text" conforme configurado no índice
        source: filename,
        knowledgeBaseId: knowledgeBaseId || "default",
        userId: session.user.id,
        chunkIndex: i,
        totalChunks: chunks.length,
      },
    }))

    // Inserir os vetores no índice
    await index.upsert(vectors)

    return NextResponse.json({
      success: true,
      chunks: chunks.length,
      documentId,
    })
  } catch (error: any) {
    console.error("Erro ao processar documento:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
