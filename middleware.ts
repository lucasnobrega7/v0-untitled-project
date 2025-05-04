import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { Permission, type Role, userHasPermission } from "./lib/auth/permissions"

// Mapeamento de rotas para permissões necessárias
const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/dashboard": Permission.ViewDashboard,
  "/dashboard/agents": Permission.ViewAgents,
  "/dashboard/agents/new": Permission.CreateAgent,
  "/dashboard/agents/edit": Permission.EditAgent,
  "/dashboard/knowledge": Permission.ViewKnowledgeBases,
  "/dashboard/knowledge/new": Permission.CreateKnowledgeBase,
  "/dashboard/knowledge/edit": Permission.EditKnowledgeBase,
  "/dashboard/conversations": Permission.ViewConversations,
  "/dashboard/analytics": Permission.ViewAnalytics,
  "/dashboard/users": Permission.ViewUsers,
  "/dashboard/settings": Permission.ManageSettings,
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Ignorar rotas públicas e estáticas
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api/auth") ||
    path.startsWith("/auth") ||
    path === "/" ||
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
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Verificar permissões para rotas protegidas
  if (path.startsWith("/dashboard")) {
    // Encontrar a permissão necessária para a rota atual ou subpaths
    let requiredPermission: Permission | undefined

    // Verificar rotas exatas primeiro
    if (ROUTE_PERMISSIONS[path]) {
      requiredPermission = ROUTE_PERMISSIONS[path]
    } else {
      // Verificar prefixos de rota
      for (const route of Object.keys(ROUTE_PERMISSIONS)) {
        if (path.startsWith(route + "/")) {
          requiredPermission = ROUTE_PERMISSIONS[route]
          break
        }
      }
    }

    // Se a rota requer uma permissão específica
    if (requiredPermission) {
      const roles = token.roles as Role[]

      // Verificar se o usuário tem a permissão necessária
      if (!userHasPermission(roles, requiredPermission)) {
        // Redirecionar para página de acesso negado
        return NextResponse.redirect(new URL("/auth/access-denied", request.url))
      }
    }
  }

  return NextResponse.next()
}

// Configurar o matcher para aplicar o middleware em todas as rotas
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
