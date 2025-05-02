"use client"

import type React from "react"

// Componente simplificado que não depende do NextAuth
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
