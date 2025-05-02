"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendMessage, sendFile } from "@/app/actions/whatsapp-actions"
import { Loader2, Send, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessageSender() {
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [fileName, setFileName] = useState("")
  const [caption, setCaption] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !message) return

    setIsLoading(true)
    try {
      const result = await sendMessage(phone, message)
      if (result.success) {
        toast({
          title: "Message sent",
          description: "Your WhatsApp message has been sent successfully.",
        })
        setMessage("")
      } else {
        toast({
          title: "Failed to send message",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendFile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !fileUrl || !fileName) return

    setIsLoading(true)
    try {
      const result = await sendFile(phone, fileUrl, fileName, caption)
      if (result.success) {
        toast({
          title: "File sent",
          description: "Your WhatsApp file has been sent successfully.",
        })
        setFileUrl("")
        setFileName("")
        setCaption("")
      } else {
        toast({
          title: "Failed to send file",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send WhatsApp Message</CardTitle>
        <CardDescription>Send messages or files to WhatsApp contacts</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="message">
          <TabsList className="mb-4">
            <TabsTrigger value="message">Text Message</TabsTrigger>
            <TabsTrigger value="file">File/Media</TabsTrigger>
          </TabsList>

          <TabsContent value="message">
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  placeholder="Phone number with country code (e.g., 5511999999999)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="file">
            <form onSubmit={handleSendFile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="filePhone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="filePhone"
                  placeholder="Phone number with country code (e.g., 5511999999999)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="fileUrl" className="text-sm font-medium">
                  File URL
                </label>
                <Input
                  id="fileUrl"
                  placeholder="https://example.com/file.pdf"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="fileName" className="text-sm font-medium">
                  File Name
                </label>
                <Input
                  id="fileName"
                  placeholder="document.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="caption" className="text-sm font-medium">
                  Caption (Optional)
                </label>
                <Input
                  id="caption"
                  placeholder="Here's the file you requested"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Send File
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
