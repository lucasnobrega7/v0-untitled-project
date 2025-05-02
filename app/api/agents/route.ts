import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { agents, knowledgeBases } from "@/lib/db/schema"
import { getServerSession } from "@/lib/user-context"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()

    const data = await req.json()
    const {
      name,
      description,
      systemPrompt,
      modelId,
      temperature,
      useKnowledgeBase,
      knowledgeBaseId,
      newKbName,
      newKbDescription,
    } = data

    let knowledgeBase = null

    // Se o usuário quer usar uma base de conhecimento
    if (useKnowledgeBase) {
      // Se selecionou uma base existente
      if (knowledgeBaseId) {
        const existingKbs = await db.select().from(knowledgeBases).where(eq(knowledgeBases.id, knowledgeBaseId))
        knowledgeBase = existingKbs[0]

        if (!knowledgeBase) {
          return NextResponse.json({ error: "Base de conhecimento não encontrada" }, { status: 404 })
        }
      }
      // Se está criando uma nova base
      else if (newKbName) {
        // Gerar um nome de índice único baseado no nome e timestamp
        const indexName = `${newKbName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`

        const [newKb] = await db
          .insert(knowledgeBases)
          .values({
            name: newKbName,
            description: newKbDescription,
            indexName,
          })
          .returning()

        knowledgeBase = newKb
      }
    }

    // Criar o agente
    const [agent] = await db
      .insert(agents)
      .values({
        name,
        description,
        systemPrompt,
        modelId,
        temperature: Number.parseFloat(temperature.toString()),
        userId: session.user.id,
        knowledgeBaseId: knowledgeBase?.id,
      })
      .returning()

    return NextResponse.json(agent)
  } catch (error: any) {
    console.error("Erro ao criar agente:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()

    const agentsList = await db.query.agents.findMany({
      where: eq(agents.userId, session.user.id),
      with: {
        knowledgeBase: true,
      },
      orderBy: (agents, { desc }) => [desc(agents.createdAt)],
    })

    return NextResponse.json(agentsList)
  } catch (error: any) {
    console.error("Erro ao buscar agentes:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
