import type { Metadata } from "next"
import DocsLayout from "@/components/layout/docs-layout"
import N8nIntegrationClientPage from "./N8nIntegrationClientPage"

export const metadata: Metadata = {
  title: "Integração com N8N | Agentes de Conversão",
  description: "Como integrar seus agentes com o N8N para automação de fluxos de trabalho",
}

export default function N8nIntegrationPage() {
  return (
    <DocsLayout>
      <N8nIntegrationClientPage />
    </DocsLayout>
  )
}
