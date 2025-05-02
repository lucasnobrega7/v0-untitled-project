"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchContacts } from "@/app/actions/whatsapp-actions"
import { Loader2, RefreshCw, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Contact {
  id: string
  name: string
  phone: string
  isGroup: boolean
}

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      const result = await fetchContacts()
      if (result.success && result.contacts) {
        // Process and format contacts from Z-API
        const formattedContacts = result.contacts.map((contact: any) => ({
          id: contact.id || Math.random().toString(),
          name: contact.name || contact.formattedName || "Unknown",
          phone: contact.phone || contact.id?.split("@")[0] || "Unknown",
          isGroup: contact.isGroup || false,
        }))
        setContacts(formattedContacts)
        setFilteredContacts(formattedContacts)
      }
    } catch (error) {
      console.error("Error loading contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm),
      )
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(contacts)
    }
  }, [searchTerm, contacts])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>Your WhatsApp contacts and groups</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={loadContacts} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading && contacts.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">No contacts found</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {contact.isGroup ? "G" : contact.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">{contact.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  {contact.isGroup && <span className="rounded-full bg-muted px-2 py-1 text-xs">Group</span>}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
