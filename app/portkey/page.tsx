import type { Metadata } from "next"
import PortkeyStats from "@/components/dashboard/portkey-stats"
import PortkeyExample from "@/components/dashboard/portkey-example"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Portkey AI Gateway",
  description: "Manage your AI providers and monitor usage",
}

export default function PortkeyPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Portkey AI Gateway</h2>
        <p className="text-muted-foreground">Manage your AI providers and monitor usage</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PortkeyStats />

        <Card>
          <CardHeader>
            <CardTitle>About Portkey</CardTitle>
            <CardDescription>Your AI gateway for multiple providers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Portkey acts as a gateway to multiple AI providers, offering features like:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Unified API access to multiple AI providers</li>
              <li>Automatic fallbacks between providers</li>
              <li>Request caching and rate limiting</li>
              <li>Detailed usage analytics</li>
              <li>Cost optimization</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Your Portkey integration is configured and ready to use. All AI requests in this application are now
              routed through Portkey.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <PortkeyExample />
      </div>
    </div>
  )
}
