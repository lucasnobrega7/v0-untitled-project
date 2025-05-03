import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"

export async function GET() {
  try {
    // Verificar a conexão com o banco de dados
    const result = await db.execute(sql`SELECT NOW()`)

    return NextResponse.json({
      message: "Conexão com o banco de dados estabelecida com sucesso",
      timestamp: result.rows[0],
      databaseUrl: process.env.NEON_DATABASE_URL ? "Configurado" : "Não configurado",
      neonDatabaseUrl: process.env.NEON_NEON_DATABASE_URL ? "Configurado" : "Não configurado",
    })
  } catch (error: any) {
    console.error("Erro ao verificar conexão com o banco de dados:", error)
    return NextResponse.json(
      {
        error: error.message || "Erro interno do servidor",
        databaseUrl: process.env.NEON_DATABASE_URL ? "Configurado" : "Não configurado",
        neonDatabaseUrl: process.env.NEON_NEON_DATABASE_URL ? "Configurado" : "Não configurado",
      },
      { status: 500 },
    )
  }
}
