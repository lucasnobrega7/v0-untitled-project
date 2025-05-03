import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

// Verificar se a variável de ambiente está definida
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_NEON_DATABASE_URL

if (!databaseUrl) {
  console.warn(
    "Aviso: Nenhuma variável de ambiente de banco de dados (NEON_DATABASE_URL ou NEON_NEON_DATABASE_URL) está definida!",
  )
}

// Criar o cliente SQL do Neon
const sql = neon(databaseUrl!)

// Criar o cliente Drizzle
export const db = drizzle(sql, { schema })

// Exportar o esquema para uso em outros arquivos
export * from "./schema"
