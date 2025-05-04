import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export const runtime = "nodejs" // Garantir que rode no ambiente Node.js

export async function GET() {
  // Verificar se as variáveis de ambiente necessárias estão definidas
  const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.NEON_NEON_DATABASE_URL

  if (!databaseUrl) {
    console.error("Erro: Variável de ambiente NEON_DATABASE_URL ou NEON_NEON_DATABASE_URL não está definida")
    return NextResponse.json(
      {
        success: false,
        error: "Configuração de banco de dados ausente",
        details: "Variável de ambiente NEON_DATABASE_URL ou NEON_NEON_DATABASE_URL não está definida",
      },
      { status: 500 },
    )
  }

  try {
    console.log("Tentando conectar ao banco de dados diretamente via neon...")

    // Criar uma conexão direta com o Neon
    const sql = neon(databaseUrl)

    // Executar uma consulta simples
    const result = await sql`SELECT NOW() as current_time`

    console.log("Conexão direta bem-sucedida, resultado:", result)

    return NextResponse.json({
      success: true,
      message: "Conexão direta com o banco de dados estabelecida com sucesso",
      timestamp: result[0]?.current_time || null,
      database: {
        url: "Configurado (valor oculto por segurança)",
        type: "Neon PostgreSQL",
      },
    })
  } catch (error: any) {
    console.error("Erro ao verificar conexão direta com o banco de dados:", error)

    // Extrair informações úteis do erro
    const errorMessage = error.message || "Erro desconhecido"
    const errorCode = error.code || "UNKNOWN"

    return NextResponse.json(
      {
        success: false,
        error: "Falha na conexão direta com o banco de dados",
        details: errorMessage,
        code: errorCode,
      },
      { status: 500 },
    )
  }
}
