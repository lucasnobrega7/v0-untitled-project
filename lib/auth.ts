import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { getServerSession as nextAuthGetServerSession } from "next-auth"
import bcrypt from "bcryptjs"

// Export getServerSession
export const getServerSession = nextAuthGetServerSession

export const authOptions: NextAuthOptions = {
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
          throw new Error("Credenciais inválidas")
        }

        try {
          // Usar o adaptador do Supabase para buscar o usuário
          const { data: user, error } = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(credentials.email)}`,
            {
              headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
                "Content-Type": "application/json",
                Prefer: "return=representation",
              },
            },
          )
            .then((res) => res.json())
            .then((data) => ({ data: data[0] || null, error: null }))
            .catch((error) => ({ data: null, error }))

          if (error || !user) {
            console.error("Erro ao buscar usuário:", error)
            throw new Error("Usuário não encontrado")
          }

          // Verificar senha
          if (!user.password) {
            throw new Error("Conta não configurada para login com senha")
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            throw new Error("Senha incorreta")
          }

          // Buscar roles do usuário
          const { data: userRoles } = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${user.id}`,
            {
              headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`,
                "Content-Type": "application/json",
              },
            },
          )
            .then((res) => res.json())
            .then((data) => ({ data: data || [] }))
            .catch((error) => ({ data: [] }))

          const roles = userRoles?.map((ur: any) => ur.role) || []

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            roles: roles,
          }
        } catch (error) {
          console.error("Erro na autenticação:", error)
          throw new Error("Falha na autenticação")
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async jwt({ token, user, account }) {
      // Adicionar dados do usuário ao token
      if (user) {
        token.id = user.id
        token.roles = user.roles || []
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.roles = token.roles as string[]
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
