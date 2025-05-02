import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core"

// Verificar se a variável de ambiente está definida
if (!process.env.NEON_DATABASE_URL) {
  console.warn("Aviso: NEON_DATABASE_URL não está definida!")
}

// Criar o cliente SQL do Neon
const sql = neon(process.env.NEON_DATABASE_URL!)

// Definir o esquema
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  messages: json("messages").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const knowledgeBases = pgTable("knowledge_bases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  documentCount: serial("document_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Criar o cliente Drizzle
export const db = drizzle(sql, { schema: { conversations, knowledgeBases } })

// Exportar consultas
export const query = {
  conversations: {
    findMany: async ({ limit }: { limit?: number } = {}) => {
      return db
        .select()
        .from(conversations)
        .limit(limit || 100)
    },
    create: async ({ data }: { data: any }) => {
      return db.insert(conversations).values(data)
    },
  },
  knowledgeBases: {
    findMany: async ({ limit }: { limit?: number } = {}) => {
      return db
        .select()
        .from(knowledgeBases)
        .limit(limit || 100)
    },
  },
}
