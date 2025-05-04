import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { compare } from "bcryptjs"
import { MOCK_USER_ID, MOCK_USER_NAME } from "./user-context"

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
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
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
          // Usando Supabase para autenticação
          const { data, error } = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/users`, {
            headers: {
              Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            },
          }).then((res) => res.json())

          if (error) throw error

          const user = data?.find((u: any) => u.email === credentials.email)
          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            name: user.name || user.email.split("@")[0],
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
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
