"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentUploader } from "@/components/knowledge-base/document-uploader"
import { Loader2, Database, Plus, FileText } from "lucide-react"
import Link from "next/link"

type KnowledgeBase = {
  id: string
  name: string
  description: string | null
  indexName: string
  createdAt: string
}

export default function KnowledgeBasePage() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string | null>(null)

  useEffect(() => {
    async function loadKnowledgeBases() {
      try {
        const response = await fetch("/api/knowledge")
        if (response.ok) {
          const data = await response.json()
          setKnowledgeBases(data)
          if (data.length > 0) {
            setSelectedKnowledgeBase(data[0].id)
          }
        }
      } catch (error) {
        console.error("Erro ao carregar bases de conhecimento:", error)
      } finally {
        setLoading(false)
      }
    }

    loadKnowledgeBases()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-white/20">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <span className="font-medium text-lg">Agentes de Conversão</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm text-white hover:underline">
                Dashboard
              </Link>
              <Link href="/agents" className="text-sm text-white hover:underline">
                Agentes
              </Link>
              <Link href="/knowledge" className="text-sm font-medium underline">
                Conhecimento
              </Link>
              <Link href="/analytics" className="text-sm text-white hover:underline">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif mb-1">Bases de Conhecimento</h1>
            <p className="text-white/70">Gerencie documentos e bases de conhecimento para seus agentes</p>
          </div>
          <Button className="bg-white text-black hover:bg-white/90" asChild>
            <Link href="/knowledge/new">
              <Plus className="mr-2 h-4 w-4" />
              Nova Base
            </Link>
          </Button>
        </div>

        {knowledgeBases.length === 0 ? (
          <div className="border border-dashed border-white/20 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Database className="h-6 w-6 text-white/40" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhuma base de conhecimento encontrada</h3>
            <p className="text-white/70 mb-4">
              Crie sua primeira base de conhecimento para alimentar seus agentes com informações personalizadas
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
              <Link href="/knowledge/new">Criar Base de Conhecimento</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-xl font-serif mb-4">Suas Bases</h3>
                <p className="text-white/70 mb-4">Selecione uma base para gerenciar</p>
                <ul className="space-y-2">
                  {knowledgeBases.map((kb) => (
                    <li key={kb.id}>
                      <Button
                        variant={selectedKnowledgeBase === kb.id ? "default" : "outline"}
                        className={`w-full justify-start ${
                          selectedKnowledgeBase === kb.id
                            ? "bg-white text-black hover:bg-white/90"
                            : "border-white text-white hover:bg-white hover:text-black"
                        }`}
                        onClick={() => setSelectedKnowledgeBase(kb.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {kb.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedKnowledgeBase && (
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10">
                    <TabsTrigger
                      value="upload"
                      className="data-[state=active]:bg-white data-[state=active]:text-black text-white"
                    >
                      Adicionar Documentos
                    </TabsTrigger>
                    <TabsTrigger
                      value="manage"
                      className="data-[state=active]:bg-white data-[state=active]:text-black text-white"
                    >
                      Gerenciar Documentos
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <div className="border-t border-white/20 pt-6">
                      <h3 className="text-xl font-serif mb-2">Adicionar Documento</h3>
                      <p className="text-white/70 mb-4">
                        Carregue um arquivo de texto ou cole o conteúdo diretamente para adicionar à base de
                        conhecimento.
                      </p>
                      <DocumentUploader knowledgeBaseId={selectedKnowledgeBase} />
                    </div>
                  </TabsContent>
                  <TabsContent value="manage" className="mt-4">
                    <div className="border-t border-white/20 pt-6">
                      <h3 className="text-xl font-serif mb-2">Documentos na Base</h3>
                      <p className="text-white/70 mb-4">
                        Visualize e gerencie os documentos nesta base de conhecimento
                      </p>
                      <p className="text-center text-white/50 py-8">
                        Funcionalidade de gerenciamento de documentos em desenvolvimento.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
