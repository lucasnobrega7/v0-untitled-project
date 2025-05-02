import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.COHERE_API_KEY) {
      return NextResponse.json({ error: "API key da Cohere não configurada" }, { status: 500 })
    }

    // Obter o texto do corpo da requisição
    const { text } = await request.json()

    // Fazer a requisição para a API da Cohere
    const response = await fetch("https://api.cohere.ai/v1/embed", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: [text],
        model: "embed-english-v3.0",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Erro na API da Cohere")
    }

    const data = await response.json()
    const embeddings = data.embeddings[0]

    // Retornar o resultado
    return NextResponse.json({
      dimensions: embeddings.length,
      preview: embeddings.slice(0, 5),
    })
  } catch (error: any) {
    console.error("Erro ao testar Cohere:", error)
    return NextResponse.json({ error: error.message || "Erro ao conectar com a API da Cohere" }, { status: 500 })
  }
}
