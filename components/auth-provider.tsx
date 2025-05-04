"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { SupabaseSessionProvider } from "./auth/supabase-session-provider"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SupabaseSessionProvider>{children}</SupabaseSessionProvider>
    </SessionProvider>
  )
}
