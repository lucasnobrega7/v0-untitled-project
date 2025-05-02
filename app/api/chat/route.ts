import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/ai-client"
import { queryPineconeIndex } from "@/lib/pinecone-utils"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Obter a última mensagem do usuário
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ error: "Nenhuma mensagem do usuário encontrada" }, { status: 400 })
    }

    // Consultar a base de conhecimento no Pinecone
    const relevantDocs = await queryPineconeIndex(lastUserMessage.content, 3)

    // Construir o contexto com o conhecimento relevante
    let context = ""
    if (relevantDocs && relevantDocs.length > 0) {
      context = "Informações relevantes da base de conhecimento:\n\n"
      relevantDocs.forEach((doc: any, i: number) => {
        if (doc.metadata && doc.metadata.text) {
          context += `${i + 1}. ${doc.metadata.text}\n\n`
        }
      })
    }

    // Construir o prompt para o OpenAI
    const systemPrompt = `Você é um assistente de IA útil e amigável. 
${context ? `Use as seguintes informações para responder à pergunta do usuário:\n\n${context}` : ""}
Se você não souber a resposta, diga que não sabe em vez de inventar informações.`

    // Obter resposta da OpenAI
    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const assistantResponse = response.choices[0].message.content || "Desculpe, não consegui gerar uma resposta."

    // Salvar a conversa no banco de dados
    try {
      await db.query.conversations.create({
        data: {
          userId: "anonymous", // Em um app real, usaria o ID do usuário autenticado
          messages: JSON.stringify(messages.concat({ role: "assistant", content: assistantResponse })),
          createdAt: new Date(),
        },
      })
    } catch (dbError) {
      console.error("Erro ao salvar conversa:", dbError)
      // Continuar mesmo se houver erro no banco de dados
    }

    return NextResponse.json({ response: assistantResponse })
  } catch (error) {
    console.error("Erro na API de chat:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
