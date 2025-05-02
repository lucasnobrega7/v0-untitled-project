import type { Metadata } from "next"
import WebhooksClientPage from "./WebhooksClientPage"

export const metadata: Metadata = {
  title: "Webhooks | Agentes de Conversão",
  description: "Configure webhooks para receber notificações de eventos dos seus agentes",
}

export default function WebhooksPage() {
  return <WebhooksClientPage />
}
