"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

type EnvStatus = {
  name: string
  status: "success" | "error" | "loading"
  message?: string
}

export default function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<EnvStatus[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const checkEnvironmentVariables = async () => {
    setIsChecking(true)
    setEnvStatus([])

    try {
      const response = await fetch("/api/check-env")
      const data = await response.json()

      setEnvStatus(data.variables)
    } catch (error) {
      console.error("Erro ao verificar variáveis de ambiente:", error)
      setEnvStatus([
        {
          name: "API",
          status: "error",
          message: "Erro ao verificar variáveis de ambiente",
        },
      ])
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Verificação de Variáveis de Ambiente</CardTitle>
        <CardDescription>
          Verifique se todas as variáveis de ambiente necessárias estão configuradas corretamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        {envStatus.length > 0 ? (
          <>
            <div className="space-y-4">
              {envStatus.map((env) => (
                <Alert key={env.name} variant={env.status === "success" ? "default" : "destructive"}>
                  {env.status === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{env.name}</AlertTitle>
                  <AlertDescription>{env.message}</AlertDescription>
                </Alert>
              ))}
            </div>

            <Button variant="outline" className="mt-4 w-full" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Ocultar detalhes
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Mostrar detalhes
                </>
              )}
            </Button>

            {showDetails && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Variáveis necessárias:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>OPENAI_API_KEY - Para geração de texto e embeddings</li>
                  <li>COHERE_API_KEY - Para embeddings alternativos</li>
                  <li>PINECONE_API_KEY - Para armazenamento vetorial</li>
                  <li>PINECONE_ENVIRONMENT - Para configuração do Pinecone</li>
                  <li>NEON_DATABASE_URL - Para conexão com o banco de dados</li>
                  <li>NEON_API_KEY - Para gerenciamento do banco de dados via API</li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Clique no botão abaixo para verificar se todas as variáveis de ambiente necessárias estão configuradas.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkEnvironmentVariables} disabled={isChecking} className="w-full">
          {isChecking ? "Verificando..." : "Verificar Variáveis de Ambiente"}
        </Button>
      </CardFooter>
    </Card>
  )
}
