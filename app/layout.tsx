import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

// Add these imports at the top
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agentes de Conversão",
  description: "A platform for conversion optimization",
    generator: 'v0.dev'
}

// Update the RootLayout function to wrap children with ClerkProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
