import { Pinecone } from "@pinecone-database/pinecone"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// Configurações específicas para o índice existente
const PINECONE_INDEX_NAME = "agentesdeconversao"
const PINECONE_DIMENSION = 1024
const PINECONE_METRIC = "cosine"

// Inicializar cliente Pinecone
let pineconeClient: Pinecone | null = null

export async function getPineconeClient() {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    })
  }
  return pineconeClient
}

// Obter o índice existente
export async function getPineconeIndex() {
  const pinecone = await getPineconeClient()
  return pinecone.index(PINECONE_INDEX_NAME)
}

// Criar embeddings usando o modelo llama-text-embed-v2 via API do Pinecone
export async function createEmbeddingsWithPinecone(texts: string[]) {
  const pinecone = await getPineconeClient()

  try {
    // Usar a API de inferência do Pinecone para criar embeddings
    const embeddings = await pinecone.embeddings.embed({
      model: "llama-text-embed-v2",
      inputs: texts,
    })

    return embeddings
  } catch (error) {
    console.error("Erro ao criar embeddings com Pinecone:", error)
    throw error
  }
}

// Processar documentos e armazená-los no Pinecone usando a API de inferência
export async function processDocumentsWithPinecone(documents: string[]) {
  // Dividir documentos em chunks menores
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const docs = await Promise.all(
    documents.map(async (doc, i) => {
      const chunks = await textSplitter.splitText(doc)
      return chunks
    }),
  )

  // Flatten array of arrays
  const flatDocs = docs.flat()

  // Obter o índice do Pinecone
  const index = await getPineconeIndex()

  // Criar embeddings usando a API de inferência do Pinecone
  const embeddings = await createEmbeddingsWithPinecone(flatDocs)

  // Preparar os vetores para upsert
  const vectors = flatDocs.map((text, i) => ({
    id: `doc-${Date.now()}-${i}`,
    values: embeddings[i],
    metadata: {
      text: text, // Usar o campo "text" conforme configurado no índice
      source: `document-${Math.floor(i / (flatDocs.length / documents.length))}`,
    },
  }))

  // Inserir os vetores no índice
  await index.upsert(vectors)

  return flatDocs.length
}

// Função para consultar o índice usando a API de inferência
export async function queryPineconeIndex(query: string, topK = 5) {
  const index = await getPineconeIndex()

  // Criar embedding para a consulta
  const queryEmbeddings = await createEmbeddingsWithPinecone([query])

  // Consultar o índice
  const queryResponse = await index.query({
    vector: queryEmbeddings[0],
    topK,
    includeMetadata: true,
  })

  return queryResponse.matches
}
