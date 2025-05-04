export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          userId: string
          type: string
          provider: string
          providerAccountId: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          userId: string
          type: string
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          userId?: string
          type?: string
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          sessionToken: string
          userId: string
          expires: string
        }
        Insert: {
          id?: string
          sessionToken: string
          userId: string
          expires: string
        }
        Update: {
          id?: string
          sessionToken?: string
          userId?: string
          expires?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string | null
          email: string | null
          emailVerified: string | null
          image: string | null
          password: string | null
          createdAt: string | null
          updatedAt: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          createdAt?: string | null
          updatedAt?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          createdAt?: string | null
          updatedAt?: string | null
        }
      }
      user_roles: {
        Row: {
          id: string
          userId: string
          role: string
          createdAt: string | null
        }
        Insert: {
          id?: string
          userId: string
          role: string
          createdAt?: string | null
        }
        Update: {
          id?: string
          userId?: string
          role?: string
          createdAt?: string | null
        }
      }
      verification_tokens: {
        Row: {
          identifier: string
          token: string
          expires: string
        }
        Insert: {
          identifier: string
          token: string
          expires: string
        }
        Update: {
          identifier?: string
          token?: string
          expires?: string
        }
      }
    }
  }
}
</QuickEdit>

Agora, vamos atualizar o arquivo de rota
do NextAuth para
usar
a
configuração:

```typescriptreact file="app/api/auth/[...nextauth]/route.ts"
[v0-no-op-code-block-prefix]import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Remover o wrapper personalizado que está causando o erro
// e usar a forma padrão recomendada pelo NextAuth para App Router

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
