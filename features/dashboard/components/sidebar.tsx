"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Users, Settings, HelpCircle, Home, UserCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-muted/40 md:border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Agentes de Conversão</h2>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
