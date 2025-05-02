"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Bot, MessageSquare, Settings, ArrowRight, Database } from "lucide-react"
import Link from "next/link"
import { getCurrentUserName } from "@/lib/user-context"

type Agent = {
  id: string
  name: string
  description: string
  conversations?: any[]
  createdAt: string
  knowledgeBase?: {
    name: string
  } | null
}

export function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const userName = getCurrentUserName()

  useEffect(() => {
    async function loadAgents() {
      try {
        const response = await fetch("/api/agents")
        if (response.ok) {
          const data = await response.json()
          setAgents(data)
        } else {
          console.error("Erro ao carregar agentes")
        }
      } catch (error) {
        console.error("Erro ao carregar agentes:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

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
              <Link href="/dashboard" className="text-sm font-medium text-blue-400">
                Dashboard
              </Link>
              <Link href="/agents" className="text-sm text-white/70 hover:text-white transition-colors">
                Agentes
              </Link>
              <Link href="/knowledge" className="text-sm text-white/70 hover:text-white transition-colors">
                Conhecimento
              </Link>
              <Link href="/analytics" className="text-sm text-white/70 hover:text-white transition-colors">
                Analytics
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70">{userName}</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium mb-1 text-white">Seus Agentes</h1>
            <p className="text-white/70">Gerencie e monitore seus agentes conversacionais</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
              asChild
            >
              <Link href="/knowledge">
                <Database className="mr-2 h-4 w-4" />
                Bases de Conhecimento
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
              asChild
            >
              <Link href="/agents/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Agente
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="flair-card flair-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-white">
                    <Bot className="mr-2 h-5 w-5 text-blue-400" />
                    {agent.name}
                  </CardTitle>
                  <CardDescription className="text-white/70">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between text-sm text-white/50">
                    <div className="flex items-center">
                      {agent.knowledgeBase && (
                        <span className="bg-white/5 text-white/80 px-2 py-1 rounded text-xs">
                          KB: {agent.knowledgeBase.name}
                        </span>
                      )}
                    </div>
                    <div>Criado em: {new Date(agent.createdAt).toLocaleDateString()}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
                    asChild
                  >
                    <Link href={`/agents/${agent.id}/edit`}>
                      <Settings className="mr-1 h-3 w-3" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
                    asChild
                  >
                    <Link href={`/agents/${agent.id}/chat`}>
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Conversar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {agents.length === 0 && (
              <Card className="border border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 flex flex-col items-center justify-center p-6 col-span-full backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Nenhum agente encontrado</h3>
                <p className="text-white/70 text-center mb-4">Crie seu primeiro agente conversacional para começar</p>
                <Button
                  variant="outline"
                  className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/agents/new">
                    Criar Agente
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
