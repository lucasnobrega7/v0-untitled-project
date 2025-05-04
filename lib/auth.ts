import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { compare } from "bcryptjs"
import { Role, ROLE_PERMISSIONS } from "./auth/permissions"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Inicializar cliente Supabase para autenticação
const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

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
    newUser: "/auth/register",
    verifyRequest: "/auth/verify",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          roles: [Role.Viewer], // Papel padrão para novos usuários
        }
      },
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
          // Buscar usuário no Supabase
          const { data: user, error } = await supabase
            .from("users")
            .select("*, user_roles(role)")
            .eq("email", credentials.email)
            .single()

          if (error || !user) {
            console.error("Erro ao buscar usuário:", error)
            return null
          }

          // Verificar senha
          const isPasswordValid = await compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null
          }

          // Extrair roles do usuário
          const roles = user.user_roles?.map((ur: any) => ur.role) || [Role.Viewer]

          return {
            id: user.id,
            name: user.name || user.email.split("@")[0],
            email: user.email,
            image: user.image,
            roles,
          }
        } catch (error) {
          console.error("Erro na autorização:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Passar roles do usuário para o token
      if (user) {
        token.id = user.id
        token.roles = user.roles || [Role.Viewer]
      }

      // Se for login com OAuth, sincronizar com Supabase
      if (account && user) {
        const { access_token, provider } = account

        if (access_token && provider === "google") {
          // Criar sessão no Supabase para usuários OAuth
          await supabase.auth.signInWithIdToken({
            provider: "google",
            token: account.id_token!,
            access_token: access_token,
          })
        }
      }

      return token
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name || ""
        session.user.email = token.email || ""
        session.user.image = token.picture || ""

        // Adicionar roles e permissões à sessão
        const roles = (token.roles || [Role.Viewer]) as Role[]
        session.user.roles = roles

        // Calcular todas as permissões do usuário com base em seus roles
        const permissions = new Set<string>()
        roles.forEach((role) => {
          ROLE_PERMISSIONS[role]?.forEach((permission) => {
            permissions.add(permission)
          })
        })

        session.user.permissions = Array.from(permissions)
      }
      return session
    },
    async signIn({ user, account }) {
      // Garantir que o usuário existe no Supabase após autenticação OAuth
      if (account?.provider === "google" && user.email) {
        const { data, error } = await supabase.from("users").select("id").eq("email", user.email).single()

        if (error || !data) {
          // Criar usuário no Supabase se não existir
          const { error: insertError } = await supabase.from("users").insert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          })

          if (insertError) {
            console.error("Erro ao criar usuário no Supabase:", insertError)
            return false
          }

          // Adicionar role padrão
          await supabase.from("user_roles").insert({
            userId: user.id,
            role: Role.Viewer,
          })
        }
      }

      return true
    },
  },
  events: {
    async signOut({ token }) {
      // Fazer logout também no Supabase quando o usuário faz logout no NextAuth
      if (token) {
        await supabase.auth.signOut()
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}

import { getServerSession as _getServerSession } from "next-auth"

export const getServerSession = async () => {
  return await _getServerSession(authOptions)
}
