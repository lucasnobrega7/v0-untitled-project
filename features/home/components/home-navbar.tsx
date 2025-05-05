"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"

export function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-xl">
            Agentes de Conversão
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden md:flex gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isSignedIn ? (
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">Sign Up</Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
