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

// Configuração do Drizzle para compatibilidade com código existente
const connectionString = process.env.NEON_NEON_NEON_DATABASE_URL || process.env.POSTGRES_URL || ""
const client = postgres(connectionString)
export const db = drizzle(client)

export async function checkDatabaseConnection() {
  try {
    // Verificar conexão com o Supabase
    const { data, error } = await supabaseAdmin.from("health_check").select().limit(1)

    if (error) throw error

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
