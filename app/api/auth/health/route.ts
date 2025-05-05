import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET() {
  try {
    // Check if we can get a session
    const session = await getServerSession(authOptions)

    return NextResponse.json({
      status: "ok",
      authenticated: !!session,
      session: session
        ? {
            user: {
              email: session.user?.email,
              name: session.user?.name,
            },
          }
        : null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Auth health check error:", error)

    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
