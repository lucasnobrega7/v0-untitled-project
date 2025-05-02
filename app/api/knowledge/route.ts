import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/user-context"
import { db } from "@/lib/db"
import { knowledgeBases } from "@/lib/db/schema"

export async function GET() {
  try {
    const session = await getServerSession()

    // Se não houver bases de conhecimento, criar uma padrão
    const existingBases = await db.select().from(knowledgeBases)

    if (existingBases.length === 0) {
      // Criar uma base de conhecimento padrão usando o índice existente
      const [defaultBase] = await db
        .insert(knowledgeBases)
        .values({
          name: "Base de Conhecimento Padrão",
          description: "Base de conhecimento padrão usando o índice agentesdeconversao",
          indexName: "agentesdeconversao",
        })
        .returning()

      return NextResponse.json([defaultBase])
    }

    return NextResponse.json(existingBases)
  } catch (error: any) {
    console.error("Erro ao buscar bases de conhecimento:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    const { name, description } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Nome não fornecido" }, { status: 400 })
    }

    // Usar o índice existente para todas as bases de conhecimento
    const indexName = "agentesdeconversao"

    const [knowledgeBase] = await db
      .insert(knowledgeBases)
      .values({
        name,
        description,
        indexName,
      })
      .returning()

    return NextResponse.json(knowledgeBase)
  } catch (error: any) {
    console.error("Erro ao criar base de conhecimento:", error)
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 })
  }
}
