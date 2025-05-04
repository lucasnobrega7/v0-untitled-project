"use client"

import type React from "react"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import type { Database } from "@/types/supabase"

export function SupabaseSessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const syncSupabaseSession = async () => {
      if (session?.user) {
        // Verificar se o usuário está autenticado no Supabase
        const {
          data: { session: supabaseSession },
        } = await supabase.auth.getSession()

        // Se não estiver autenticado no Supabase mas estiver no NextAuth,
        // podemos usar um endpoint personalizado para sincronizar as sessões
        if (!supabaseSession && session) {
          try {
            await fetch("/api/auth/sync-session", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ session }),
            })
          } catch (error) {
            console.error("Erro ao sincronizar sessão:", error)
          }
        }
      }
    }

    syncSupabaseSession()
  }, [session, supabase])

  return <>{children}</>
}
