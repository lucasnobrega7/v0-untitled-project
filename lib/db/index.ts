import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

// Verificar se a variável de ambiente está definida
const databaseUrl = process.env.NEON_NEON_DATABASE_URL || process.env.NEON_NEON_DATABASE_URL

if (!databaseUrl) {
  console.warn(
    "AVISO CRÍTICO: Nenhuma variável de ambiente de banco de dados (NEON_DATABASE_URL ou NEON_NEON_DATABASE_URL) está definida!",
  )
}

// Criar o cliente SQL do Neon com tratamento de erros melhorado
let sql
try {
  if (!databaseUrl) {
    throw new Error("URL do banco de dados não definida")
  }

  // Inicializar o cliente Neon
  sql = neon(databaseUrl)
  console.log("Cliente Neon inicializado com sucesso")
} catch (error) {
  console.error("Erro ao inicializar cliente Neon:", error)

  // Fallback para um cliente que vai lançar erros mais claros quando usado
  sql = {
    query: () => {
      throw new Error(
        "Conexão com banco de dados não inicializada. Verifique as variáveis de ambiente NEON_DATABASE_URL ou NEON_NEON_DATABASE_URL.",
      )
    },
  }
}

// Criar o cliente Drizzle com opções de log para depuração
export const db = drizzle(sql, {
  schema,
  logger: true,
})

// Função de utilidade para verificar a conexão
export async function checkDatabaseConnection() {
  try {
    const result = await db.execute(schema.sql`SELECT NOW() as current_time`)
    return {
      success: true,
      timestamp: result.rows[0]?.current_time || null,
      message: "Conexão com o banco de dados estabelecida com sucesso",
    }
  } catch (error: any) {
    console.error("Erro ao verificar conexão com banco de dados:", error)
    return {
      success: false,
      error: error.message || "Erro desconhecido",
      code: error.code || "UNKNOWN",
    }
  }
}

// Exportar o esquema para uso em outros arquivos
export * from "./schema"
