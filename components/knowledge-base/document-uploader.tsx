"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react"

export function DocumentUploader({ knowledgeBaseId }: { knowledgeBaseId?: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Read text file content
      if (selectedFile.type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (e) => {
          setText((e.target?.result as string) || "")
        }
        reader.readAsText(selectedFile)
      } else {
        setText("")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      setResult({
        success: false,
        message: "Por favor, forneça algum texto para processar.",
      })
      return
    }

    setIsUploading(true)
    setResult(null)

    try {
      const response = await fetch("/api/knowledge/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          knowledgeBaseId,
          filename: file?.name || "documento-manual.txt",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar documento")
      }

      setResult({
        success: true,
        message: `Documento processado com sucesso! ${data.chunks} fragmentos criados.`,
      })

      // Clear form on success
      setFile(null)
      setText("")
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || "Ocorreu um erro ao processar o documento.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Adicionar Documento</CardTitle>
        <CardDescription>
          Carregue um arquivo de texto ou cole o conteúdo diretamente para adicionar à base de conhecimento.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Arquivo (opcional)
            </label>
            <Input id="file" type="file" accept=".txt" onChange={handleFileChange} disabled={isUploading} />
            <p className="text-xs text-gray-500">
              Atualmente suportamos apenas arquivos .txt. Suporte para PDF e DOCX em breve.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">
              Texto
            </label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole ou digite o texto aqui..."
              rows={10}
              disabled={isUploading}
              className="resize-none"
            />
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Sucesso" : "Erro"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={isUploading || !text.trim()}
            className="w-full bg-openai-teal hover:bg-openai-teal2 text-white"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Processar Documento
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
