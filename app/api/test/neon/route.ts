import { type NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

export async function POST(request: NextRequest) {
  try {
    // Verificar se a URL do banco de dados está configurada
    const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_NEON_DATABASE_URL

    if (!databaseUrl) {
      return NextResponse.json({ error: "URL do banco de dados Neon não configurada" }, { status: 500 })
    }

    // Obter a consulta do corpo da requisição
    const { query } = await request.json()

    // Inicializar o pool de conexões
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    })

    // Executar a consulta
    const result = await pool.query(query)

    // Fechar o pool
    await pool.end()

    // Retornar o resultado
    return NextResponse.json({
      rows: result.rows,
      rowCount: result.rowCount,
    })
  } catch (error: any) {
    console.error("Erro ao testar Neon:", error)
    return NextResponse.json({ error: error.message || "Erro ao conectar com o banco de dados Neon" }, { status: 500 })
  }
}
