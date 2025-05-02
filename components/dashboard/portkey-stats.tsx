"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw } from "lucide-react"

interface PortkeyStats {
  totalRequests: number
  totalTokens: number
  totalCost: number
  providers: {
    name: string
    requests: number
    tokens: number
    cost: number
  }[]
}

export default function PortkeyStats() {
  const [stats, setStats] = useState<PortkeyStats | null>(null)
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("7d")
  const [isLoading, setIsLoading] = useState(false)

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/portkey/usage?timeframe=${timeframe}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`)
      }
      const data = await response.json()

      // Process the data into a more usable format
      const processedStats: PortkeyStats = {
        totalRequests: data.totalRequests || 0,
        totalTokens: data.totalTokens || 0,
        totalCost: data.totalCost || 0,
        providers: data.providers || [],
      }

      setStats(processedStats)
    } catch (error) {
      console.error("Error fetching Portkey stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [timeframe])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Usage (Portkey)</CardTitle>
          <CardDescription>Monitor your AI API usage and costs</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="7d" onValueChange={(value) => setTimeframe(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="24h">Last 24h</TabsTrigger>
            <TabsTrigger value="7d">Last 7 days</TabsTrigger>
            <TabsTrigger value="30d">Last 30 days</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !stats ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Total Requests</p>
                  <p className="mt-1 text-2xl font-bold">{stats.totalRequests.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Total Tokens</p>
                  <p className="mt-1 text-2xl font-bold">{stats.totalTokens.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Total Cost</p>
                  <p className="mt-1 text-2xl font-bold">${stats.totalCost.toFixed(2)}</p>
                </div>
              </div>

              {stats.providers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Provider Breakdown</h3>
                  <div className="space-y-2">
                    {stats.providers.map((provider, index) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{provider.name}</p>
                          <p className="text-sm">${provider.cost.toFixed(2)}</p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>Requests: {provider.requests.toLocaleString()}</div>
                          <div>Tokens: {provider.tokens.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
