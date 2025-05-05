"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function ClientAuthCheck({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status !== "loading") {
      setIsLoading(false)
    }
  }, [status, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
