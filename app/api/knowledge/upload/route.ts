import { NextResponse } from "next/server"
import { processDocumentsWithPinecone } from "@/lib/pinecone-utils"

export async function POST(request: Request) {
  try {
    const { type, content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Conteúdo não fornecido" }, { status: 400 })
    }

    let textToProcess = ""

    if (type === "text") {
      textToProcess = content
    } else if (type === "url") {
      // Buscar conteúdo da URL
      try {
        const response = await fetch(content)
        if (!response.ok) {
          throw new Error(`Erro ao buscar URL: ${response.statusText}`)
        }
        const html = await response.text()

        // Extrair texto do HTML (simplificado)
        textToProcess = html
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      } catch (fetchError) {
        console.error("Erro ao buscar URL:", fetchError)
        return NextResponse.json({ error: "Erro ao buscar conteúdo da URL" }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: "Tipo de conteúdo inválido" }, { status: 400 })
    }

    // Processar o texto e armazenar no Pinecone
    const chunks = await processDocumentsWithPinecone([textToProcess])

    return NextResponse.json({
      success: true,
      message: "Conteúdo processado com sucesso",
      chunks,
    })
  } catch (error) {
    console.error("Erro ao processar conhecimento:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
