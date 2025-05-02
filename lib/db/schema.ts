import { pgTable, text, timestamp, uniqueIndex, varchar, doublePrecision } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"

// Tabela de usuários
export const users = pgTable(
  "users",
  {
    id: varchar("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("email_verified"),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    }
  },
)

// Tabela de bases de conhecimento
export const knowledgeBases = pgTable("knowledge_bases", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description"),
  indexName: text("index_name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabela de agentes
export const agents = pgTable("agents", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description"),
  systemPrompt: text("system_prompt"),
  modelId: text("model_id"),
  temperature: doublePrecision("temperature"),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  knowledgeBaseId: varchar("knowledge_base_id").references(() => knowledgeBases.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabela de conversas
export const conversations = pgTable("conversations", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  agentId: varchar("agent_id")
    .notNull()
    .references(() => agents.id, { onDelete: "cascade" }),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabela de mensagens
export const messages = pgTable("messages", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  conversationId: varchar("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Definição de relações
export const usersRelations = relations(users, ({ many }) => ({
  agents: many(agents),
  conversations: many(conversations),
}))

export const agentsRelations = relations(agents, ({ one, many }) => ({
  user: one(users, {
    fields: [agents.userId],
    references: [users.id],
  }),
  knowledgeBase: one(knowledgeBases, {
    fields: [agents.knowledgeBaseId],
    references: [knowledgeBases.id],
  }),
  conversations: many(conversations),
}))

export const knowledgeBasesRelations = relations(knowledgeBases, ({ many }) => ({
  agents: many(agents),
}))

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  agent: one(agents, {
    fields: [conversations.agentId],
    references: [agents.id],
  }),
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  messages: many(messages),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}))
