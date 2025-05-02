import { PrismaClient } from "@prisma/client"

// Adicionar logs para debug
console.log("Inicializando PrismaClient...")
console.log("NODE_ENV:", process.env.NODE_ENV)

// Verificar se a variável de ambiente NEON_DATABASE_URL está definida
if (!process.env.NEON_DATABASE_URL) {
  console.warn("Aviso: NEON_DATABASE_URL não está definida!")
}

// Declarar o tipo global para o Prisma
declare global {
  var prisma: PrismaClient | undefined
}

// Inicializar o cliente Prisma com configurações adequadas
const prismaGlobal = global as typeof global & {
  prisma: PrismaClient | undefined
}

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

// Salvar o cliente na variável global para evitar múltiplas instâncias em desenvolvimento
if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = prisma
