import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware é executado em todas as rotas
export function middleware(request: NextRequest) {
  // Você pode adicionar lógica de autenticação aqui se necessário
  return NextResponse.next()
}

// Configuração para garantir que o middleware não seja executado em rotas de API
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
