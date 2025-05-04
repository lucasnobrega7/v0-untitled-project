import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { supabaseAdmin } from "@/lib/db"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { getServerSession as nextAuthGetServerSession } from "next-auth"

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

        // Buscar usuário pelo email
        const { data: user, error } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) {
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
        const { data: userRoles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", user.id)

        const roles = userRoles?.map((ur) => ur.role) || []

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          roles: roles,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Adicionar dados do usuário ao token
      if (user) {
        token.id = user.id
        token.roles = user.roles || []
      }

      // Se for login com Google, sincronizar com o Supabase
      if (account && account.provider === "google") {
        await syncGoogleUser(token, account)
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
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Função para sincronizar usuário do Google com o Supabase
async function syncGoogleUser(token: any, account: any) {
  try {
    // Verificar se o usuário já existe no Supabase
    const { data: existingUser } = await supabaseAdmin.from("users").select().eq("email", token.email).single()

    if (!existingUser) {
      // Criar novo usuário
      const { data: newUser, error } = await supabaseAdmin
        .from("users")
        .insert({
          id: uuidv4(),
          email: token.email,
          name: token.name,
          image: token.picture,
        })
        .select()
        .single()

      if (error) {
        console.error("Erro ao criar usuário no Supabase:", error)
        return
      }

      // Adicionar role padrão
      await supabaseAdmin.from("user_roles").insert({
        id: uuidv4(),
        user_id: newUser.id,
        role: "viewer",
      })

      token.id = newUser.id
      token.roles = ["viewer"]
    } else {
      // Atualizar usuário existente
      await supabaseAdmin
        .from("users")
        .update({
          name: token.name,
          image: token.picture,
        })
        .eq("id", existingUser.id)

      // Buscar roles do usuário
      const { data: userRoles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", existingUser.id)

      token.id = existingUser.id
      token.roles = userRoles?.map((ur) => ur.role) || []
    }

    // Sincronizar conta OAuth
    const { data: existingAccount } = await supabaseAdmin
      .from("accounts")
      .select()
      .eq("provider", "google")
      .eq("provider_account_id", account.providerAccountId)
      .single()

    if (!existingAccount) {
      await supabaseAdmin.from("accounts").insert({
        id: uuidv4(),
        user_id: token.id,
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
      })
    }
  } catch (error) {
    console.error("Erro ao sincronizar usuário com Supabase:", error)
  }
}
