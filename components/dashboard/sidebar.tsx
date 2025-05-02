"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  Users,
  Sparkles,
  MessageSquare,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "relative h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && <span className="text-xl font-bold">SaaSify</span>}
          {collapsed && <span className="text-xl font-bold">S</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", collapsed && "absolute -right-4 top-6 z-50 bg-background border rounded-full")}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        <NavItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Dashboard"
          href="#"
          active
          collapsed={collapsed}
        />
        <NavItem icon={<Sparkles className="h-4 w-4" />} label="AI Tools" href="/ai-tools" collapsed={collapsed} />
        <NavItem icon={<MessageSquare className="h-4 w-4" />} label="WhatsApp" href="/whatsapp" collapsed={collapsed} />
        <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Analytics" href="#" collapsed={collapsed} />
        <NavItem icon={<Users className="h-4 w-4" />} label="Customers" href="#" collapsed={collapsed} />
        <NavItem icon={<Package className="h-4 w-4" />} label="Products" href="#" collapsed={collapsed} />
        <NavItem icon={<CreditCard className="h-4 w-4" />} label="Billing" href="#" collapsed={collapsed} />
        <NavItem icon={<FileText className="h-4 w-4" />} label="Documents" href="#" collapsed={collapsed} />
        <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" href="#" collapsed={collapsed} />
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-2">
        <div className={cn("rounded-lg border bg-muted/50 p-4", collapsed ? "mx-2" : "mx-2")}>
          {!collapsed && (
            <>
              <p className="mb-2 text-xs font-medium">Pro Plan</p>
              <div className="mb-2 h-1.5 w-full rounded-full bg-muted">
                <div className="h-1.5 w-4/5 rounded-full bg-primary"></div>
              </div>
              <p className="text-xs text-muted-foreground">20 days remaining</p>
              <Button className="mt-3 w-full" size="sm">
                Upgrade
              </Button>
            </>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <Button size="icon" variant="outline" className="h-8 w-8">
                <CreditCard className="h-4 w-4" />
                <span className="sr-only">Upgrade Plan</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  collapsed: boolean
}

function NavItem({ icon, label, href, active, collapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
        active && "bg-muted",
        collapsed && "justify-center px-2",
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
