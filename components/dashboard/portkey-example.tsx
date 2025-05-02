"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function PortkeyExample() {
  const [prompt, setPrompt] = useState("What is Portkey?")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setResponse("")

    try {
      const result = await fetch("/api/portkey/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`)
      }

      const data = await result.json()
      setResponse(data.text)
    } catch (error) {
      console.error("Error getting completion:", error)
      setResponse("Error: Failed to get a response from Portkey.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portkey Example</CardTitle>
        <CardDescription>Try out the Portkey integration with a simple prompt</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Prompt
            </label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isLoading || !prompt.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Response"
            )}
          </Button>
        </form>

        {response && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Response:</h3>
            <div className="rounded-md border p-3 text-sm whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
