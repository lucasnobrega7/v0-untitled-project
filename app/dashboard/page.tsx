import { AuthCheck } from "@/components/auth/auth-check"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { getServerSession } from "@/lib/auth"
import { MessageSquare, Database, BarChart2 } from "lucide-react"
import ApiStatus from "@/components/dashboard/api-status"

export default async function DashboardPage() {
  const session = await getServerSession()

  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Bem-vindo, {session?.user?.name?.split(" ")[0] || "Usuário"}</h1>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Agentes Ativos</h2>
              <div className="text-3xl font-bold">3</div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-green-400">↑ 12%</span> desde o último mês
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Conversas</h2>
              <div className="text-3xl font-bold">128</div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-green-400">↑ 24%</span> desde o último mês
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Taxa de Conversão</h2>
              <div className="text-3xl font-bold">18.5%</div>
              <div className="mt-4 text-sm text-gray-400">
                <span className="text-green-400">↑ 3.2%</span> desde o último mês
              </div>
            </div>
          </div>

          {/* Adicione o componente ApiStatus */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ApiStatus />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Atividade Recente</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-sm">U{i}</span>
                    </div>
                    <div>
                      <div className="font-medium">Usuário {i}</div>
                      <div className="text-sm text-gray-400">Iniciou uma nova conversa com o agente de vendas</div>
                      <div className="text-xs text-gray-500 mt-1">Há {i * 10} minutos</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Desempenho dos Agentes</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Agente de Vendas</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Agente de Suporte</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Agente de Onboarding</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/dashboard/agents/new"
                className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium">Criar Novo Agente</h3>
                <p className="text-sm text-gray-400 mt-1">Configure um novo agente conversacional</p>
              </a>
              <a
                href="/dashboard/knowledge/new"
                className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                  <Database className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium">Nova Base de Conhecimento</h3>
                <p className="text-sm text-gray-400 mt-1">Crie uma base de conhecimento para seus agentes</p>
              </a>
              <a
                href="/dashboard/analytics"
                className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <BarChart2 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-medium">Ver Analytics</h3>
                <p className="text-sm text-gray-400 mt-1">Analise o desempenho dos seus agentes</p>
              </a>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthCheck>
  )
}
