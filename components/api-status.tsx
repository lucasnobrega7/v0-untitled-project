"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

type ApiStatus = {
  name: string
  status: "online" | "offline" | "unknown"
  message?: string
}

export function ApiStatus() {
  const [statuses, setStatuses] = useState<ApiStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastChecked, setLastChecked] = useState<string | null>(null)

  const checkApiStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/status")
      const data = await response.json()

      setStatuses(data.services)
      setLastChecked(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Erro ao verificar status das APIs:", error)
      setStatuses([
        {
          name: "Erro",
          status: "offline",
          message: "Não foi possível verificar o status das APIs",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkApiStatus()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Último check: {lastChecked || "Nunca"}</p>
        <Button variant="outline" size="sm" onClick={checkApiStatus} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <div className="space-y-2">
          {statuses.map((api) => (
            <Card key={api.name} className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{api.name}</h3>
                  {api.message && <p className="text-xs text-muted-foreground">{api.message}</p>}
                </div>
                <Badge variant={api.status === "online" ? "default" : "destructive"}>
                  {api.status === "online" ? "Online" : "Offline"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
