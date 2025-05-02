"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
                </div>
              </div>
              <span className="font-medium text-lg text-white">Agentes de Conversão</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/agents" className="text-sm text-white/70 hover:text-white transition-colors">
                Agentes
              </Link>
              <Link href="/knowledge" className="text-sm font-medium text-blue-400">
                Conhecimento
              </Link>
              <Link href="/analytics" className="text-sm text-white/70 hover:text-white transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium mb-1 text-white">Bases de Conhecimento</h1>
            <p className="text-white/70">Gerencie documentos e bases de conhecimento para seus agentes</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
            asChild
          >
            <Link href="/knowledge/new">
              <Plus className="mr-2 h-4 w-4" />
              Nova Base
            </Link>
          </Button>
        </div>

        {knowledgeBases.length === 0 ? (
          <Card className="border border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-white/40" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-white">Nenhuma base de conhecimento encontrada</h3>
            <p className="text-white/70 text-center mb-4">
              Crie sua primeira base de conhecimento para alimentar seus agentes com informações personalizadas
            </p>
            <Button
              variant="outline"
              className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
              asChild
            >
              <Link href="/knowledge/new">Criar Base de Conhecimento</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="flair-card">
                <CardHeader>
                  <CardTitle className="text-white">Suas Bases</CardTitle>
                  <CardDescription className="text-white/70">Selecione uma base para gerenciar</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {knowledgeBases.map((kb) => (
                      <li key={kb.id}>
                        <Button
                          variant={selectedKnowledgeBase === kb.id ? "default" : "outline"}
                          className={`w-full justify-start ${
                            selectedKnowledgeBase === kb.id
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
                              : "border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
                          }`}
                          onClick={() => setSelectedKnowledgeBase(kb.id)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {kb.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedKnowledgeBase && (
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1">
                    <TabsTrigger
                      value="upload"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-white/70"
                    >
                      Adicionar Documentos
                    </TabsTrigger>
                    <TabsTrigger
                      value="manage"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-white/70"
                    >
                      Gerenciar Documentos
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <Card className="flair-card">
                      <CardHeader>
                        <CardTitle className="text-white">Adicionar Documento</CardTitle>
                        <CardDescription className="text-white/70">
                          Carregue um arquivo de texto ou cole o conteúdo diretamente para adicionar à base de
                          conhecimento.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DocumentUploader knowledgeBaseId={selectedKnowledgeBase} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="manage" className="mt-4">
                    <Card className="flair-card">
                      <CardHeader>
                        <CardTitle className="text-white">Documentos na Base</CardTitle>
                        <CardDescription className="text-white/70">
                          Visualize e gerencie os documentos nesta base de conhecimento
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-white/50 py-8">
                          Funcionalidade de gerenciamento de documentos em desenvolvimento.
                        </p>
                      </CardContent>
                    </Card>
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
