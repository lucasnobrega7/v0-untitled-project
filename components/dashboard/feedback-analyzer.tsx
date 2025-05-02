"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { analyzeCustomerFeedback } from "@/app/actions/ai-actions"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SentimentAnalysis {
  sentiment: "positive" | "neutral" | "negative"
  score: number
  key_points: string[]
}

export default function FeedbackAnalyzer() {
  const [feedback, setFeedback] = useState("")
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!feedback.trim() || isLoading) return

    setIsLoading(true)
    try {
      const result = await analyzeCustomerFeedback(feedback)
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing feedback:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Customer Feedback
          </label>
          <Textarea
            id="feedback"
            placeholder="Paste customer feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isLoading}
            rows={5}
          />
        </div>
        <Button onClick={handleAnalyze} disabled={isLoading || !feedback.trim()} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Feedback"
          )}
        </Button>

        {analysis && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Sentiment Analysis:</h3>
              <Badge className={getSentimentColor(analysis.sentiment)}>
                {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Sentiment Score:</p>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${analysis.score * 100}%` }} />
              </div>
              <p className="text-xs text-right">{Math.round(analysis.score * 100)}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Key Points:</p>
              <ul className="space-y-1">
                {analysis.key_points.map((point, index) => (
                  <li key={index} className="text-sm">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
