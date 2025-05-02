import { type NextRequest, NextResponse } from "next/server"
import { createConversationalChain } from "@/lib/langchain"
import { getServerSession } from "@/lib/user-context"
import { db } from "@/lib/db"
import { agents, conversations, messages } from "@/lib/db/schema"
import { generateResponse } from "@/lib/ai-client"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()

    const { agentId, message: messageContent, conversationId } = await req.json()

    // Buscar configuração do agente
    const agentResults = await db.query.agents.findMany({
      where: eq(agents.id, agentId),
      with: {
        knowledgeBase: true,
      },
    })

    const agent = agentResults[0]

    if (!agent) {
      return NextResponse.json({ error: "Agente não encontrado" }, { status: 404 })
    }

    let conversation

    // Buscar ou criar conversa
    if (conversationId) {
      const conversationResults = await db.query.conversations.findMany({
        where: eq(conversations.id, conversationId),
        with: {
          messages: true,
        },
      })

      conversation = conversationResults[0]

      if (!conversation) {
        return NextResponse.json({ error: "Conversa não encontrada" }, { status: 404 })
      }
    } else {
      const [newConversation] = await db
        .insert(conversations)
        .values({
          agentId,
          userId: session.user.id,
        })
        .returning()

      conversation = {
        ...newConversation,
        messages: [],
      }
    }

    // Registrar mensagem do usuário
    const [userMessage] = await db
      .insert(messages)
      .values({
        conversationId: conversation.id,
        content: messageContent,
        role: "user",
      })
      .returning()

    let response

    // Usar RAG se o agente tiver base de conhecimento
    if (agent.knowledgeBase) {
      // Usar o índice "agentesdeconversao" para todos os agentes com base de conhecimento
      // Em uma implementação completa, você usaria agent.knowledgeBase.indexName
      const chain = await createConversationalChain("agentesdeconversao")

      const previousMessages = conversation.messages || []
      const chatHistory = previousMessages
        .map((m) => `${m.role === "user" ? "Human" : "Assistant"}: ${m.content}`)
        .join("\n")

      const result = await chain.call({
        question: messageContent,
        chat_history: chatHistory,
      })

      response = result.text
    } else {
      // Usar LLM diretamente via OpenAI
      const result = await generateResponse(messageContent, agent.modelId || "gpt-4o", {
        temperature: agent.temperature || 0.7,
        systemPrompt: agent.systemPrompt,
      })

      response = result.choices[0].message.content
    }

    // Registrar resposta do agente
    const [agentMessage] = await db
      .insert(messages)
      .values({
        conversationId: conversation.id,
        content: response,
        role: "assistant",
      })
      .returning()

    return NextResponse.json({
      message: agentMessage,
      conversationId: conversation.id,
    })
  } catch (error: any) {
    console.error("Erro na API de chat:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
