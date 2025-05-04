import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        {/* Seu layout de dashboard aqui */}
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
