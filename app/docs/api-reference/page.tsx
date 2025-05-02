import type { Metadata } from "next"
import DocsLayout from "@/components/layout/docs-layout"
import ApiReferenceClientPage from "./ApiReferenceClientPage"

export const metadata: Metadata = {
  title: "Referência da API | Agentes de Conversão",
  description: "Documentação completa de todos os endpoints disponíveis na API Agentes de Conversão",
}

export default function ApiReferencePage() {
  return (
    <DocsLayout>
      <ApiReferenceClientPage />
    </DocsLayout>
  )
}
