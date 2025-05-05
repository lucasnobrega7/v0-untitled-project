import { cookies } from "next/headers"
import { jwtVerify } from "jose"

// This function can be used in Edge runtime to verify authentication
export async function verifyAuthInEdge() {
  const cookieStore = cookies()
  const token =
    cookieStore.get("next-auth.session-token")?.value || cookieStore.get("__Secure-next-auth.session-token")?.value

  if (!token) {
    return null
  }

  try {
    // Use jose library instead of jsonwebtoken (which uses crypto)
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "")
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error("Failed to verify JWT", error)
    return null
  }
}
