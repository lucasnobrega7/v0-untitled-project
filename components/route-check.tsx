"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type RouteStatus = {
  path: string
  status: "ok" | "error"
  error?: string
}

export default function RouteCheck() {
  const [routes, setRoutes] = useState<RouteStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRoutes = async () => {
      const routesToCheck = [
        "/docs",
        "/docs/api-reference",
        "/docs/http-tools",
        "/docs/webhooks",
        "/docs/api-examples",
        "/docs/use-cases",
        "/docs/n8n-integration",
      ]

      const results = await Promise.all(
        routesToCheck.map(async (path) => {
          try {
            const response = await fetch(path)
            return {
              path,
              status: response.ok ? "ok" : "error",
              error: response.ok ? undefined : `${response.status} ${response.statusText}`,
            } as RouteStatus
          } catch (error) {
            return {
              path,
              status: "error",
              error: (error as Error).message,
            } as RouteStatus
          }
        }),
      )

      setRoutes(results)
      setLoading(false)
    }

    checkRoutes()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verificação de Rotas</CardTitle>
        <CardDescription>Verifica se todas as rotas da documentação estão acessíveis</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Verificando rotas...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rota</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.path}>
                  <TableCell>{route.path}</TableCell>
                  <TableCell>
                    {route.status === "ok" ? (
                      <Badge className="bg-green-500">OK</Badge>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-red-500">Erro</Badge>
                        <span className="text-xs text-muted-foreground">{route.error}</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
