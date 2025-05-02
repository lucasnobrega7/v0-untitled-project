"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { checkWhatsAppStatus, getQRCode, disconnect, restart } from "@/app/actions/whatsapp-actions"
import { Loader2, RefreshCw, Power, PowerOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ConnectionStatus() {
  const [status, setStatus] = useState<"connected" | "disconnected" | "loading">("loading")
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchStatus = async () => {
    setIsLoading(true)
    try {
      const result = await checkWhatsAppStatus()
      if (result.success) {
        setStatus(result.status.connected ? "connected" : "disconnected")
        if (!result.status.connected) {
          fetchQRCode()
        }
      } else {
        setStatus("disconnected")
      }
    } catch (error) {
      console.error("Error fetching status:", error)
      setStatus("disconnected")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchQRCode = async () => {
    try {
      const result = await getQRCode()
      if (result.success && result.qrCode) {
        setQrCodeUrl(result.qrCode.value)
      }
    } catch (error) {
      console.error("Error fetching QR code:", error)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      await disconnect()
      setStatus("disconnected")
      fetchQRCode()
    } catch (error) {
      console.error("Error disconnecting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestart = async () => {
    setIsLoading(true)
    try {
      await restart()
      setTimeout(fetchStatus, 5000) // Check status after 5 seconds
    } catch (error) {
      console.error("Error restarting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Connection</CardTitle>
        <CardDescription>Manage your WhatsApp connection status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Badge variant={status === "connected" ? "default" : "destructive"}>
                {status === "connected" ? "Connected" : "Disconnected"}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={fetchStatus} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            {status === "connected" ? (
              <Button size="sm" variant="destructive" onClick={handleDisconnect} disabled={isLoading}>
                <PowerOff className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            ) : (
              <Button size="sm" variant="default" onClick={handleRestart} disabled={isLoading}>
                <Power className="mr-2 h-4 w-4" />
                Restart
              </Button>
            )}
          </div>
        </div>

        {status === "disconnected" && qrCodeUrl && (
          <div className="mt-4 space-y-2">
            <p className="text-sm">Scan this QR code with your WhatsApp to connect:</p>
            <div className="flex justify-center">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="WhatsApp QR Code" className="h-64 w-64" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
