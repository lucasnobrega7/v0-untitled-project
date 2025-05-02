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
        <Loader2 className="h-8 w-8 animate-spin text-openai-teal" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-openai-teal rounded-full"></div>
              <span className="font-medium text-lg">Agentes de Conversão</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-openai-teal">
                Dashboard
              </Link>
              <Link href="/agents" className="text-sm text-gray-600 hover:text-openai-teal">
                Agentes
              </Link>
              <Link href="/knowledge" className="text-sm font-medium text-openai-teal">
                Conhecimento
              </Link>
              <Link href="/analytics" className="text-sm text-gray-600 hover:text-openai-teal">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium mb-1">Bases de Conhecimento</h1>
            <p className="text-gray-600">Gerencie documentos e bases de conhecimento para seus agentes</p>
          </div>
          <Button className="bg-openai-teal hover:bg-openai-teal2 text-white" asChild>
            <Link href="/knowledge/new">
              <Plus className="mr-2 h-4 w-4" />
              Nova Base
            </Link>
          </Button>
        </div>

        {knowledgeBases.length === 0 ? (
          <Card className="border border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhuma base de conhecimento encontrada</h3>
            <p className="text-gray-500 text-center mb-4">
              Crie sua primeira base de conhecimento para alimentar seus agentes com informações personalizadas
            </p>
            <Button
              variant="outline"
              className="text-openai-teal border-openai-teal hover:bg-openai-teal hover:text-white"
              asChild
            >
              <Link href="/knowledge/new">Criar Base de Conhecimento</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Suas Bases</CardTitle>
                  <CardDescription>Selecione uma base para gerenciar</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {knowledgeBases.map((kb) => (
                      <li key={kb.id}>
                        <Button
                          variant={selectedKnowledgeBase === kb.id ? "default" : "outline"}
                          className={`w-full justify-start ${
                            selectedKnowledgeBase === kb.id
                              ? "bg-openai-teal hover:bg-openai-teal2 text-white"
                              : "text-gray-700"
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
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Adicionar Documentos</TabsTrigger>
                    <TabsTrigger value="manage">Gerenciar Documentos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <DocumentUploader knowledgeBaseId={selectedKnowledgeBase} />
                  </TabsContent>
                  <TabsContent value="manage" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documentos na Base</CardTitle>
                        <CardDescription>Visualize e gerencie os documentos nesta base de conhecimento</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-center text-gray-500 py-8">
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
