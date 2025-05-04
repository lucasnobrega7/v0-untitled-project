import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import { MOCK_USER_ID, MOCK_USER_NAME } from "./user-context"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { users } from "./db/schema"

// Mock da sessão para desenvolvimento sem autenticação
export const mockSession = {
  user: {
    id: MOCK_USER_ID,
    name: MOCK_USER_NAME,
    email: "usuario@teste.com",
    image: "https://ui-avatars.com/api/?name=Usuario+Teste",
  },
}

// Função que simula getServerSession sem autenticação real
export async function getServerSession() {
  return mockSession
}

// Opções de autenticação
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const result = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1)
          const user = result[0]

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          console.error("Erro na autorização:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name || ""
        session.user.email = token.email || ""
        session.user.image = token.picture || ""
      }
      return session
    },
    async jwt({ token, user }) {
      if (!token.email) {
        return token
      }

      try {
        const result = await db.select().from(users).where(eq(users.email, token.email)).limit(1)
        const dbUser = result[0]

        if (!dbUser) {
          if (user) {
            token.id = user.id
          }
          return token
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        }
      } catch (error) {
        console.error("Erro ao buscar usuário para JWT:", error)
        // Retorna o token original em caso de erro
        return token
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.error(`[Auth] Error: ${code}`, metadata)
    },
    warn(code) {
      console.warn(`[Auth] Warning: ${code}`)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.debug(`[Auth] Debug: ${code}`, metadata)
      }
    },
  },
}
