import type React from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM14.5 21.5C14.5 22.881 13.381 24 12 24C10.619 24 9.5 22.881 9.5 21.5C9.5 20.119 10.619 19 12 19C13.381 19 14.5 20.119 14.5 21.5ZM14.5 10.5C14.5 11.881 13.381 13 12 13C10.619 13 9.5 11.881 9.5 10.5C9.5 9.119 10.619 8 12 8C13.381 8 14.5 9.119 14.5 10.5ZM20 16C20 17.381 18.881 18.5 17.5 18.5C16.119 18.5 15 17.381 15 16C15 14.619 16.119 13.5 17.5 13.5C18.881 13.5 20 14.619 20 16ZM22.5 21.5C22.5 22.881 21.381 24 20 24C18.619 24 17.5 22.881 17.5 21.5C17.5 20.119 18.619 19 20 19C21.381 19 22.5 20.119 22.5 21.5ZM22.5 10.5C22.5 11.881 21.381 13 20 13C18.619 13 17.5 11.881 17.5 10.5C17.5 9.119 18.619 8 20 8C21.381 8 22.5 9.119 22.5 10.5Z"
                fill="white"
              />
            </svg>
            <span className="font-medium text-lg">Agentes de Conversão</span>
          </div>
          <nav className="hidden md:flex items-center space-x-10">
            <div className="flex flex-col">
              <span className="font-bold text-sm">Research</span>
              <Link href="/research" className="text-sm hover:underline mt-1">
                Overview
              </Link>
              <Link href="/research/index" className="text-sm hover:underline mt-1">
                Index
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Product</span>
              <Link href="/product" className="text-sm hover:underline mt-1">
                Overview
              </Link>
              <Link href="/product/agents" className="text-sm hover:underline mt-1">
                Agentes
              </Link>
              <Link href="/product/knowledge" className="text-sm hover:underline mt-1">
                Conhecimento
              </Link>
              <Link href="/product/stories" className="text-sm hover:underline mt-1">
                Customer stories
              </Link>
              <Link href="/product/pricing" className="text-sm hover:underline mt-1">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Safety</span>
              <Link href="/safety" className="text-sm hover:underline mt-1">
                Overview
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Company</span>
              <Link href="/about" className="text-sm hover:underline mt-1">
                About
              </Link>
              <Link href="/careers" className="text-sm hover:underline mt-1">
                Careers
              </Link>
              <Link href="/blog" className="text-sm hover:underline mt-1">
                Blog
              </Link>
              <Link href="/charter" className="text-sm hover:underline mt-1">
                Charter
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-black pt-20 pb-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20">
            <div className="flex flex-col">
              <span className="openai-footer-heading">Research</span>
              <Link href="/research" className="openai-footer-link">
                Overview
              </Link>
              <Link href="/research/index" className="openai-footer-link mt-1">
                Index
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="openai-footer-heading">Product</span>
              <Link href="/product" className="openai-footer-link">
                Overview
              </Link>
              <Link href="/product/agents" className="openai-footer-link mt-1">
                Agentes
              </Link>
              <Link href="/product/knowledge" className="openai-footer-link mt-1">
                Conhecimento
              </Link>
              <Link href="/product/stories" className="openai-footer-link mt-1">
                Customer stories
              </Link>
              <Link href="/product/pricing" className="openai-footer-link mt-1">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="openai-footer-heading">Safety</span>
              <Link href="/safety" className="openai-footer-link">
                Overview
              </Link>
            </div>
            <div className="flex flex-col">
              <span className="openai-footer-heading">Company</span>
              <Link href="/about" className="openai-footer-link">
                About
              </Link>
              <Link href="/careers" className="openai-footer-link mt-1">
                Careers
              </Link>
              <Link href="/blog" className="openai-footer-link mt-1">
                Blog
              </Link>
              <Link href="/charter" className="openai-footer-link mt-1">
                Charter
              </Link>
            </div>
          </div>

          <div className="border-t border-white/20 pt-10 flex flex-col md:flex-row justify-between">
            <div>
              <div className="font-bold text-sm mb-2">Agentes de Conversão © 2023</div>
              <Link href="/terms" className="openai-footer-link">
                Terms & policies
              </Link>
            </div>
            <div className="flex space-x-6 mt-6 md:mt-0">
              <Link href="https://twitter.com" className="openai-footer-link">
                Twitter
              </Link>
              <Link href="https://youtube.com" className="openai-footer-link">
                YouTube
              </Link>
              <Link href="https://github.com" className="openai-footer-link">
                GitHub
              </Link>
              <Link href="https://soundcloud.com" className="openai-footer-link">
                SoundCloud
              </Link>
              <Link href="https://linkedin.com" className="openai-footer-link">
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link href="#top" className="openai-footer-link flex items-center">
              Back to top <ArrowUp className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="h-64 mt-10 openai-gradient-lines"></div>
        </div>
      </footer>
    </div>
  )
}
