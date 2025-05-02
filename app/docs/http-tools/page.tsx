import type { Metadata } from "next"
import DocsLayout from "@/components/layout/docs-layout"
import HttpToolsClientPage from "./HttpToolsClientPage"

export const metadata: Metadata = {
  title: "HTTP Tools | Agentes de Conversão",
  description: "Integre seus agentes com ferramentas externas via HTTP para expandir suas capacidades",
}

export default function HttpToolsPage() {
  return (
    <DocsLayout>
      <HttpToolsClientPage />
    </DocsLayout>
  )
}
