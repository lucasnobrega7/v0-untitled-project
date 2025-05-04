"use client"

import { SessionProvider } from "next-auth/react"
import type React from "react"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Erro de Autenticação</h2>
        <p className="mb-4 text-gray-700">Ocorreu um erro ao carregar a sessão de autenticação.</p>
        <pre className="mb-4 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-sm">{error.message}</pre>
        <button onClick={resetErrorBoundary} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  )
}
