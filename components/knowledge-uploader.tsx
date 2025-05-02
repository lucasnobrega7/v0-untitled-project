"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, FileText, LinkIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function KnowledgeUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)
    return interval
  }

  const handleTextUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() === "") return

    setIsUploading(true)
    setResult(null)
    const interval = simulateProgress()

    try {
      const response = await fetch("/api/knowledge/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "text",
          content: text,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao fazer upload")
      }

      const data = await response.json()
      setResult({
        success: true,
        message: `Texto processado com sucesso! ${data.chunks || 0} chunks criados.`,
      })
      setText("")
    } catch (error) {
      console.error("Erro:", error)
      setResult({
        success: false,
        message: "Erro ao processar o texto. Por favor, tente novamente.",
      })
    } finally {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setIsUploading(false)
      }, 500)
    }
  }

  const handleUrlUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim() === "") return

    setIsUploading(true)
    setResult(null)
    const interval = simulateProgress()

    try {
      const response = await fetch("/api/knowledge/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "url",
          content: url,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao fazer upload")
      }

      const data = await response.json()
      setResult({
        success: true,
        message: `URL processada com sucesso! ${data.chunks || 0} chunks criados.`,
      })
      setUrl("")
    } catch (error) {
      console.error("Erro:", error)
      setResult({
        success: false,
        message: "Erro ao processar a URL. Por favor, tente novamente.",
      })
    } finally {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setIsUploading(false)
      }, 500)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Adicione conhecimento personalizado para que o assistente possa responder com base nessas informações.
      </p>

      {isUploading && (
        <div className="space-y-2 my-4">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">Processando... {progress}%</p>
        </div>
      )}

      {result && (
        <div
          className={`p-4 rounded-md ${
            result.success ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          } mb-4`}
        >
          {result.message}
        </div>
      )}

      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Texto</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-4">
          <form onSubmit={handleTextUpload}>
            <Textarea
              placeholder="Cole seu texto aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isUploading}
              className="min-h-[200px]"
            />
            <Button type="submit" className="w-full mt-4" disabled={isUploading || text.trim() === ""}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" /> Processar Texto
                </>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="url" className="space-y-4 mt-4">
          <form onSubmit={handleUrlUpload}>
            <Input
              type="url"
              placeholder="https://exemplo.com/pagina"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isUploading}
            />
            <Button type="submit" className="w-full mt-4" disabled={isUploading || url.trim() === ""}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" /> Processar URL
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-sm font-medium mb-2">Exemplos de conhecimento que você pode adicionar:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Documentação de produtos</li>
          <li>FAQs e artigos de suporte</li>
          <li>Políticas e procedimentos internos</li>
          <li>Descrições de produtos ou serviços</li>
          <li>Artigos técnicos ou científicos</li>
        </ul>
      </div>
    </div>
  )
}
