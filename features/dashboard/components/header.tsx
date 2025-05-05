"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell } from "lucide-react"
import { useCallback } from "react"
import { useMobileMenu } from "@/hooks/use-mobile-menu"
import { UserButton } from "@/features/auth/components/user-button"

export function Header() {
  const { setOpen } = useMobileMenu()

  const openMobileMenu = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={openMobileMenu}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
