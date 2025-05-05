import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/api/webhook", "/pricing", "/contact"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/api/public"],
})

export const config = {
  // Matcher ignoring _next/static and _next/image
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
