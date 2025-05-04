"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database, AlertCircle, RefreshCw } from "lucide-react"

export default function NeonAdminPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/neon/projects")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao buscar projetos do Neon")
      }

      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error: any) {
      console.error("Erro ao buscar projetos do Neon:", error)
      setError(error.message || "Erro ao buscar projetos do Neon")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento do Neon</h1>

      <div className="mb-6">
        <Button onClick={fetchProjects} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar Projetos
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                {project.name}
              </CardTitle>
              <CardDescription>ID: {project.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Região:</span> {project.region_id}
                </div>
                <div>
                  <span className="font-medium">Criado em:</span> {new Date(project.created_at).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span className={project.provisioner.state === "active" ? "text-green-600" : "text-yellow-600"}>
                    {project.provisioner.state}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}

        {projects.length === 0 && !loading && !error && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum projeto encontrado</h3>
            <p className="text-gray-500">Não foram encontrados projetos na sua conta do Neon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
