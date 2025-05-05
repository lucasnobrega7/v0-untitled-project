import { NextResponse } from "next/server"
import { verifyAuthInEdge } from "@/lib/auth/edge-auth"

export const runtime = "edge"

export async function GET() {
  const user = await verifyAuthInEdge()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    message: "This is an edge API route with authentication!",
    user: {
      id: user.sub,
      email: user.email,
    },
  })
}
