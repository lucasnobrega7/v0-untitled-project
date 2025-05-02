import type { Metadata } from "next"
import AIChat from "@/components/dashboard/ai-chat"
import ContentGenerator from "@/components/dashboard/content-generator"
import FeedbackAnalyzer from "@/components/dashboard/feedback-analyzer"

export const metadata: Metadata = {
  title: "AI Tools",
  description: "AI-powered tools for your SaaS platform",
}

export default function AIToolsPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Tools</h2>
        <p className="text-muted-foreground">Leverage the power of AI to enhance your SaaS platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <AIChat />
        </div>
        <div className="space-y-6 md:col-span-1">
          <ContentGenerator />
          <FeedbackAnalyzer />
        </div>
      </div>
    </div>
  )
}
