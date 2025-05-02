import { AuthCheck } from "@/components/auth/auth-check"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { Plus, Database, MoreVertical, Edit, Trash2, Upload, FileText } from "lucide-react"

export default function KnowledgeBasesPage() {
  // Dados de exemplo
  const knowledgeBases = [
    {
      id: "1",
      name: "Documentação do Produto",
      description: "Manuais, guias e tutoriais sobre nossos produtos",
      documents: 24,
      lastUpdated: "Há 3 dias",
      size: "4.2 MB",
    },
    {
      id: "2",
      name: "FAQ",
      description: "Perguntas frequentes e suas respostas",
      documents: 56,
      lastUpdated: "Há 1 semana",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Políticas e Termos",
      description: "Documentos legais e políticas da empresa",
      documents: 12,
      lastUpdated: "Há 2 meses",
      size: "0.9 MB",
    },
  ]

  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Bases de Conhecimento</h1>
            <Link
              href="/dashboard/knowledge/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Base
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knowledgeBases.map((kb) => (
              <div key={kb.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Database className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{kb.name}</h3>
                        <p className="text-sm text-gray-400">{kb.description}</p>
                      </div>
                    </div>
                    <div className="relative inline-block text-left group">
                      <button className="text-gray-400 hover:text-white">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                        <div className="py-1">
                          <Link
                            href={`/dashboard/knowledge/${kb.id}/edit`}
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                          <Link
                            href={`/dashboard/knowledge/${kb.id}/upload`}
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Adicionar Documentos
                          </Link>
                          <Link
                            href={`/dashboard/knowledge/${kb.id}/documents`}
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Documentos
                          </Link>
                          <button className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{kb.documents}</div>
                      <div className="text-xs text-gray-400">Documentos</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{kb.lastUpdated}</div>
                      <div className="text-xs text-gray-400">Atualização</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{kb.size}</div>
                      <div className="text-xs text-gray-400">Tamanho</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/dashboard/knowledge/${kb.id}`}
                      className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </AuthCheck>
  )
}
