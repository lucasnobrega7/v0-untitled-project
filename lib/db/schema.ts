import { pgTable, text, timestamp, uniqueIndex, varchar, doublePrecision, integer } from "drizzle-orm/pg-core"
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
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    }
  },
)

// Tabela de contas (para autenticação OAuth)
export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => {
    return {
      providerProviderAccountIdKey: uniqueIndex("provider_provider_account_id_key").on(
        table.provider,
        table.providerAccountId,
      ),
    }
  },
)

// Tabela de sessões
export const sessions = pgTable("sessions", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  sessionToken: text("session_token").notNull().unique(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
})

// Tabela de tokens de verificação
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires").notNull(),
  },
  (table) => {
    return {
      identifierTokenKey: uniqueIndex("identifier_token_key").on(table.identifier, table.token),
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

// Tabela de roles
export const roles = pgTable("roles", {
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabela de associação entre usuários e roles
export const userRoles = pgTable(
  "user_roles",
  {
    id: varchar("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => createId()),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // Valor do enum Role
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      userRoleIdx: uniqueIndex("user_role_idx").on(table.userId, table.role),
    }
  },
)

// Definição de relações
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  agents: many(agents),
  conversations: many(conversations),
  userRoles: many(userRoles),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
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

// Relações para userRoles
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
}))
