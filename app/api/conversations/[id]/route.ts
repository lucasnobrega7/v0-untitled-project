import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/user-context"
import { db } from "@/lib/db"
import { conversations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()
    const conversationId = params.id

    const conversationResults = await db.query.conversations.findMany({
      where: eq(conversations.id, conversationId),
      with: {
        messages: {
          orderBy: (messages, { asc }) => [asc(messages.createdAt)],
        },
        agent: true,
      },
    })

    const conversation = conversationResults[0]

    if (!conversation) {
      return NextResponse.json({ error: "Conversa não encontrada" }, { status: 404 })
    }

    // Verificar se o usuário tem acesso a esta conversa
    if (conversation.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    return NextResponse.json(conversation)
  } catch (error: any) {
    console.error("Erro ao buscar conversa:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
