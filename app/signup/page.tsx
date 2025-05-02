"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulação de cadastro
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM14.5 21.5C14.5 22.881 13.381 24 12 24C10.619 24 9.5 22.881 9.5 21.5C9.5 20.119 10.619 19 12 19C13.381 19 14.5 20.119 14.5 21.5ZM14.5 10.5C14.5 11.881 13.381 13 12 13C10.619 13 9.5 11.881 9.5 10.5C9.5 9.119 10.619 8 12 8C13.381 8 14.5 9.119 14.5 10.5ZM20 16C20 17.381 18.881 18.5 17.5 18.5C16.119 18.5 15 17.381 15 16C15 14.619 16.119 13.5 17.5 13.5C18.881 13.5 20 14.619 20 16ZM22.5 21.5C22.5 22.881 21.381 24 20 24C18.619 24 17.5 22.881 17.5 21.5C17.5 20.119 18.619 19 20 19C21.381 19 22.5 20.119 22.5 21.5ZM22.5 10.5C22.5 11.881 21.381 13 20 13C18.619 13 17.5 11.881 17.5 10.5C17.5 9.119 18.619 8 20 8C21.381 8 22.5 9.119 22.5 10.5Z"
                fill="white"
              />
            </svg>
            <span className="font-medium">Agentes de Conversão</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-normal mb-2">Criar sua conta</h1>
            <p className="text-white/70">Junte-se a nós e comece a construir com IA avançada.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border border-white/20 px-3 py-2 focus:outline-none focus:border-white"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 border border-white/20 bg-transparent focus:ring-0"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-white/70">
                  Eu concordo com os{" "}
                  <Link href="/terms" className="underline hover:no-underline">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacy" className="underline hover:no-underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-2 px-4 hover:bg-white/90 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="underline hover:no-underline">
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 text-sm text-white/50">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="border border-white/20 py-2 px-4 hover:bg-white/5 transition-colors">Google</button>
              <button className="border border-white/20 py-2 px-4 hover:bg-white/5 transition-colors">Microsoft</button>
            </div>
          </div>

          <div className="mt-12 border border-white/10 p-6">
            <h3 className="text-lg font-normal mb-4">Por que escolher a Agentes de Conversão?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" />
                <span>Acesso a modelos de IA de última geração</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" />
                <span>Ferramentas para criar agentes conversacionais personalizados</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" />
                <span>Bases de conhecimento para alimentar seus agentes</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" />
                <span>Suporte técnico especializado</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
