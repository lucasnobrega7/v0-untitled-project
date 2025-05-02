import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

// Verificar se a variável de ambiente está definida
if (!process.env.NEON_NEON_DATABASE_URL) {
  console.warn("Aviso: NEON_DATABASE_URL não está definida!")
}

// Criar o cliente SQL do Neon
const sql = neon(process.env.NEON_DATABASE_URL!)

// Criar o cliente Drizzle
export const db = drizzle(sql, { schema })

// Exportar o esquema para uso em outros arquivos
export * from "./schema"
