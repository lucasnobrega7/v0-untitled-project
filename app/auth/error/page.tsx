"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const error = searchParams.get("error")

  useEffect(() => {
    // Mapear códigos de erro para mensagens amigáveis
    const errorMessages: Record<string, string> = {
      Configuration: "Ocorreu um erro na configuração do servidor de autenticação.",
      AccessDenied: "Acesso negado. Você não tem permissão para acessar este recurso.",
      Verification: "O link de verificação expirou ou já foi usado.",
      Default: "Ocorreu um erro durante a autenticação.",
    }

    setErrorMessage(errorMessages[error || ""] || errorMessages.Default)
  }, [error])

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
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>

          <h1 className="text-3xl font-normal mb-4">Erro de Autenticação</h1>

          <p className="text-white/70 mb-8">{errorMessage}</p>

          <div className="flex flex-col space-y-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center bg-white text-black py-2 px-4 hover:bg-white/90 transition-colors"
            >
              Tentar novamente
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center border border-white/20 py-2 px-4 hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
