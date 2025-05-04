import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Ignorar rotas públicas e estáticas
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api/auth") ||
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/reset-password" ||
    path.startsWith("/public") ||
    path.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next()
  }

  // Verificar token de autenticação
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Se não estiver autenticado, redirecionar para login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Verificar se o usuário completou o onboarding
  const onboardingCompleted = token.onboardingCompleted === true

  // Se o usuário está autenticado mas não completou o onboarding
  // e está tentando acessar o dashboard, redirecionar para onboarding
  if (!onboardingCompleted && path.startsWith("/dashboard") && !path.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  // Se o usuário já completou o onboarding e está tentando acessar o onboarding,
  // redirecionar para o dashboard
  if (onboardingCompleted && path.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configurar o matcher para aplicar o middleware em todas as rotas
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
