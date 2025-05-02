"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AgentDashboard } from "@/components/agent-dashboard"
import { Loader2, Database } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [setupError, setSetupError] = useState<string | null>(null)
  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    // Verificar se a configuração já foi feita
    checkSetup()
  }, [])

  async function checkSetup() {
    try {
      const response = await fetch("/api/agents")

      if (response.ok) {
        const data = await response.json()
        setIsSetupComplete(data.length > 0)
      } else {
        setSetupError("Erro ao verificar configuração")
      }
    } catch (error) {
      setSetupError("Erro ao conectar com a API")
    } finally {
      setIsLoading(false)
    }
  }

  async function initializeDatabase() {
    setIsLoading(true)
    setSetupError(null)

    try {
      const response = await fetch("/api/db/init")

      if (response.ok) {
        setDbInitialized(true)
        // Após inicializar o banco, verificar novamente a configuração
        await checkSetup()
      } else {
        const data = await response.json()
        setSetupError(data.error || "Erro na inicialização do banco de dados")
      }
    } catch (error) {
      setSetupError("Erro ao conectar com a API")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSetup() {
    setIsLoading(true)
    setSetupError(null)

    try {
      const response = await fetch("/api/setup")

      if (response.ok) {
        setIsSetupComplete(true)
      } else {
        const data = await response.json()
        setSetupError(data.error || "Erro na configuração inicial")
      }
    } catch (error) {
      setSetupError("Erro ao conectar com a API")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-openai-teal" />
      </div>
    )
  }

  if (!isSetupComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-openai-teal rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-medium mb-2">Configuração Inicial</h1>
          <p className="text-gray-600 mb-6">
            Para começar a usar a plataforma Agentes de Conversão, precisamos configurar seu ambiente.
          </p>

          {setupError && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">{setupError}</div>}

          {!dbInitialized && (
            <Button
              onClick={initializeDatabase}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inicializando banco...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Inicializar Banco de Dados
                </>
              )}
            </Button>
          )}

          <Button
            onClick={handleSetup}
            disabled={isLoading || !dbInitialized}
            className="w-full bg-openai-teal hover:bg-openai-teal2 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Configurando...
              </>
            ) : (
              "Iniciar Configuração"
            )}
          </Button>
        </div>
      </div>
    )
  }

  // Se a configuração estiver completa, mostrar o dashboard
  return <AgentDashboard />
}
