import type React from "react"
import type { Metadata } from "next"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Permission } from "@/lib/auth/permissions"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export const metadata: Metadata = {
  title: "Dashboard | Agentes de Conversão",
  description: "Painel de controle para gerenciar seus agentes de conversão",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute permission={Permission.ViewDashboard}>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
