import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ServerAuthCheck({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const hasAuthCookie =
    cookieStore.has("next-auth.session-token") || cookieStore.has("__Secure-next-auth.session-token")

  if (!hasAuthCookie) {
    redirect("/login")
  }

  return <>{children}</>
}
