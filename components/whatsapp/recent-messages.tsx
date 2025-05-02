"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchRecentMessages } from "@/app/actions/whatsapp-actions"
import { Loader2, RefreshCw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  phone: string
  fromMe: boolean
  text: string
  timestamp: number
}

export default function RecentMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const result = await fetchRecentMessages()
      if (result.success && result.messages) {
        // Process and format messages from Z-API
        const formattedMessages = result.messages.map((msg: any) => ({
          id: msg.id || Math.random().toString(),
          phone: msg.phone || msg.chatName || "Unknown",
          fromMe: msg.fromMe || false,
          text: msg.text || msg.body || "No content",
          timestamp: msg.timestamp || Date.now(),
        }))
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Your latest WhatsApp conversations</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={loadMessages} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && messages.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">No messages found</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.fromMe ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.fromMe ? "Me" : message.phone.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${message.fromMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="mt-1 text-xs opacity-70">{formatTimestamp(message.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
