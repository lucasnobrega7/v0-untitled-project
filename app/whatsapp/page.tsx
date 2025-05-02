import type { Metadata } from "next"
import ConnectionStatus from "@/components/whatsapp/connection-status"
import MessageSender from "@/components/whatsapp/message-sender"
import RecentMessages from "@/components/whatsapp/recent-messages"
import ContactsList from "@/components/whatsapp/contacts-list"

export const metadata: Metadata = {
  title: "WhatsApp Integration",
  description: "Manage your WhatsApp communications",
}

export default function WhatsAppPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Integration</h2>
        <p className="text-muted-foreground">Manage your WhatsApp communications via Z-API</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <ConnectionStatus />
          <MessageSender />
        </div>
        <div className="space-y-6">
          <RecentMessages />
        </div>
      </div>

      <div className="grid gap-6">
        <ContactsList />
      </div>
    </div>
  )
}
