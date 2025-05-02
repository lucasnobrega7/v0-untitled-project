import { AuthCheck } from "@/components/auth/auth-check"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { Plus, MessageSquare, MoreVertical, Edit, Trash2, Copy } from "lucide-react"

export default function AgentsPage() {
  // Dados de exemplo
  const agents = [
    {
      id: "1",
      name: "Agente de Vendas",
      description: "Especializado em converter leads em clientes",
      conversations: 78,
      conversionRate: "24%",
      lastActive: "Há 2 horas",
      status: "active",
    },
    {
      id: "2",
      name: "Agente de Suporte",
      description: "Responde dúvidas e resolve problemas dos clientes",
      conversations: 156,
      conversionRate: "N/A",
      lastActive: "Há 30 minutos",
      status: "active",
    },
    {
      id: "3",
      name: "Agente de Onboarding",
      description: "Ajuda novos usuários a começar a usar a plataforma",
      conversations: 42,
      conversionRate: "18%",
      lastActive: "Há 1 dia",
      status: "active",
    },
  ]

  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Agentes</h1>
            <Link
              href="/dashboard/agents/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Novo Agente
            </Link>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Conversas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Taxa de Conversão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Última Atividade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{agent.name}</div>
                            <div className="text-sm text-gray-400">{agent.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.conversations}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.conversionRate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{agent.lastActive}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                            <div className="py-1">
                              <Link
                                href={`/dashboard/agents/${agent.id}/edit`}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </Link>
                              <Link
                                href={`/dashboard/agents/${agent.id}/chat`}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Conversar
                              </Link>
                              <Link
                                href={`/dashboard/agents/${agent.id}/duplicate`}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                              </Link>
                              <button className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthCheck>
  )
}
