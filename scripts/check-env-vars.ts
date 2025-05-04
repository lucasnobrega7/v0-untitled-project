#!/usr/bin/env node

/**
 * Script para verificar se todas as variáveis de ambiente necessárias estão configuradas
 */

// Importar dotenv para carregar variáveis de ambiente de arquivos .env
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
dotenv.config({ path: ".env" })

// Lista de variáveis de ambiente necessárias
const requiredEnvVars = [
  // Autenticação
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",

  // Supabase
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",

  // Banco de dados
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_DATABASE",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "NEON_NEON_NEON_DATABASE_URL",

  // APIs de IA
  "OPENAI_API_KEY",
]

// Verificar cada variável de ambiente
const missingVars: string[] = []
const configuredVars: string[] = []

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingVars.push(envVar)
  } else {
    configuredVars.push(envVar)
  }
}

// Exibir resultados
console.log("\n=== VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE ===\n")

if (missingVars.length === 0) {
  console.log("✅ Todas as variáveis de ambiente necessárias estão configuradas!\n")
} else {
  console.log(`❌ Faltam ${missingVars.length} variáveis de ambiente:\n`)
  missingVars.forEach((v) => console.log(`   - ${v}`))
  console.log("\n")
}

console.log("Variáveis configuradas:")
configuredVars.forEach((v) => {
  // Ocultar parte do valor para variáveis sensíveis
  const value = process.env[v]
  const displayValue =
    value && value.length > 8
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : "[valor configurado]"

  console.log(`   - ${v}: ${displayValue}`)
})

console.log("\n")

// Verificar se as strings de conexão estão consistentes
if (process.env.POSTGRES_HOST && process.env.POSTGRES_USER && process.env.POSTGRES_PASSWORD) {
  const expectedConnectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT || "5432"}/${process.env.POSTGRES_DATABASE || "postgres"}`

  if (process.env.NEON_DATABASE_URL && process.env.NEON_DATABASE_URL !== expectedConnectionString) {
    console.log("⚠️ AVISO: A variável NEON_DATABASE_URL não corresponde aos valores individuais de conexão.")
    console.log("   Isso pode causar problemas de conexão com o banco de dados.\n")
  }
}

// Sair com código de erro se houver variáveis faltando
if (missingVars.length > 0) {
  process.exit(1)
} else {
  process.exit(0)
}
