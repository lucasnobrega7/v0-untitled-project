/**
 * Authentication utilities using Clerk
 */

import { auth } from "@clerk/nextjs/server"
import { currentUser } from "@clerk/nextjs/server"

/**
 * Check if the user is authenticated
 */
export function isAuthenticated(): boolean {
  const { userId } = auth()
  return !!userId
}

/**
 * Get the current user from Clerk
 */
export async function getCurrentUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const user = await currentUser()
  return user
}

/**
 * Middleware to protect routes
 */
export async function authMiddleware(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return Response.redirect(new URL("/sign-in", request.url))
  }
}
