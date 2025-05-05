"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMobileMenu } from "@/hooks/use-mobile-menu"
import { Sidebar } from "./sidebar"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function MobileSidebar() {
  const pathname = usePathname()
  const { open, setOpen } = useMobileMenu()

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
