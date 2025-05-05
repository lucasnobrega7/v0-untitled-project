import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/auth/forgot-password", "/auth/reset-password", "/auth/error"]

// Define routes that should be completely skipped by middleware
const skipMiddlewareRoutes = ["/api/auth", "/api/debug-session", "/api/health", "/_next", "/favicon.ico"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for NextAuth routes and static assets
  if (
    skipMiddlewareRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next()
  }

  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, redirect to login if no auth cookie exists
  // This avoids using getToken() which relies on crypto
  const authCookie =
    request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token")

  if (!authCookie) {
    // For API routes, return 401 Unauthorized
    if (pathname.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // For other routes, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure the matcher for the middleware
export const config = {
  matcher: [
    // Apply to all paths except static assets and auth routes
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
