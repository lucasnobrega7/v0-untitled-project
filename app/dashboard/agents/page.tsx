import { AuthCheck } from "@/components/auth/auth-check"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AgentsList } from "@/components/dashboard/agents-list"

export default function AgentsPage() {
  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Meus Agentes</h1>
            <a
              href="/dashboard/agents/new"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Criar Novo Agente
            </a>
          </div>

          <AgentsList />
        </div>
      </DashboardLayout>
    </AuthCheck>
  )
}
