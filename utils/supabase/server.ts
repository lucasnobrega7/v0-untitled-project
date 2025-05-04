import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Implementar corretamente a função createClient para SSR
export async function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )
}

// Manter função legada para compatibilidade
export function createServerSupabaseClient() {
  return createClient()
}

// Função para obter cliente com chave de serviço (para operações administrativas)
export async function getAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não está definida")
  }

  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  })
}
