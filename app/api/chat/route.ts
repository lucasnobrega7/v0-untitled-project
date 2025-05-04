import { NextResponse } from "next/server"
import { OpenAI } from "openai"

// Garantir que este código só é executado no servidor
export const runtime = "nodejs" // Forçar o runtime Node.js

export async function POST(req: Request) {
  try {
    // Verificar se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY não está configurada")
      return NextResponse.json({ error: "Configuração da API OpenAI não encontrada" }, { status: 500 })
    }

    const { messages } = await req.json()

    // Validar o formato dos dados
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Formato de mensagens inválido" }, { status: 400 })
    }

    // Criar o cliente OpenAI apenas no lado do servidor
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      // Não usar dangerouslyAllowBrowser: true, pois estamos garantindo que este código só roda no servidor
    })

    console.log("Enviando requisição para OpenAI:", JSON.stringify(messages))

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
    })

    console.log("Resposta recebida da OpenAI:", JSON.stringify(response.choices[0]))

    return NextResponse.json({
      response: response.choices[0].message.content,
    })
  } catch (error: any) {
    console.error("Erro na rota /api/chat:", error)

    // Tratamento específico para erros da OpenAI
    if (error.response) {
      console.error("Erro da API OpenAI:", error.response.data)
      return NextResponse.json(
        { error: `Erro da API OpenAI: ${error.response.data?.error?.message || "Erro desconhecido"}` },
        { status: error.response.status || 500 },
      )
    }

    return NextResponse.json(
      { error: `Erro ao obter resposta: ${error.message || "Erro desconhecido"}` },
      { status: 500 },
    )
  }
}
