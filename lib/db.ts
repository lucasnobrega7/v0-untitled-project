import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERRO: Variáveis de ambiente do Supabase não configuradas!")
}

// Criar cliente Supabase com a chave anônima para uso no cliente
export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!)

// Criar cliente Supabase com a chave de serviço para uso no servidor (quando disponível)
export const supabaseAdmin = supabaseServiceKey ? createClient<Database>(supabaseUrl!, supabaseServiceKey) : supabase

// Configuração do PostgreSQL para conexão direta (quando necessário)
const pgConfig = {
  host: process.env.POSTGRES_HOST || "db.cdttnoomvugputkweazg.supabase.co",
  port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DATABASE || "postgres",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD,
}

// String de conexão para o PostgreSQL do Supabase
// Prioriza variáveis de ambiente específicas, com fallbacks para construir a string manualmente
const connectionString =
  process.env.SUPABASE_NEON_NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  `postgresql://${pgConfig.username}:${pgConfig.password}@${pgConfig.host}:${pgConfig.port}/${pgConfig.database}`

// Verificar se a string de conexão está definida
if (!connectionString) {
  console.error("ERRO: String de conexão com o banco de dados não configurada!")
}

// Configuração do Drizzle para compatibilidade com código existente
const client = postgres(connectionString)
export const db = drizzle(client)

export async function checkDatabaseConnection() {
  try {
    // Verificar conexão com o Supabase
    const { data, error } = await supabaseAdmin.from("health_check").select().limit(1)

    if (error) {
      // Se a tabela health_check não existir, tenta uma consulta mais genérica
      if (error.code === "42P01") {
        // código para "relation does not exist"
        const { data: userData, error: userError } = await supabaseAdmin.from("users").select().limit(1)
        if (userError) throw userError
        return {
          success: true,
          timestamp: new Date().toISOString(),
          message: "Conexão com o Supabase estabelecida com sucesso (tabela users)",
        }
      } else {
        throw error
      }
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      message: "Conexão com o Supabase estabelecida com sucesso",
    }
  } catch (error: any) {
    console.error("Erro ao verificar conexão com o Supabase:", error)
    return {
      success: false,
      error: error.message || "Erro desconhecido",
      code: error.code || "UNKNOWN",
    }
  }
}
