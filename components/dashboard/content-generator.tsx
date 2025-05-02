"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getContentIdeas } from "@/app/actions/ai-actions"
import { Loader2 } from "lucide-react"

export default function ContentGenerator() {
  const [topic, setTopic] = useState("")
  const [count, setCount] = useState(5)
  const [ideas, setIdeas] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim() || isLoading) return

    setIsLoading(true)
    try {
      const generatedIdeas = await getContentIdeas(topic, count)
      setIdeas(generatedIdeas)
    } catch (error) {
      console.error("Error generating content ideas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Topic
            </label>
            <Input
              id="topic"
              placeholder="Enter a topic (e.g., 'Customer Retention Strategies')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="count" className="text-sm font-medium">
              Number of Ideas
            </label>
            <Input
              id="count"
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value) || 5)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !topic.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Ideas"
            )}
          </Button>
        </form>

        {ideas.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Generated Ideas:</h3>
            <ul className="space-y-2">
              {ideas.map((idea, index) => (
                <li key={index} className="rounded-md border p-3 text-sm">
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
