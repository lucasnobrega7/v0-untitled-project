import { auth, currentUser } from "@clerk/nextjs/server"

export async function getAuthenticatedUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const user = await currentUser()
  return user
}

export function getUserId() {
  const { userId } = auth()
  return userId
}

export function isAuthenticated() {
  const { userId } = auth()
  return !!userId
}
