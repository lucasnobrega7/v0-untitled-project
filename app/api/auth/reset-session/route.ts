import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Limpar todos os cookies relacionados à autenticação
    const cookieStore = cookies()
    const authCookies = [
      "next-auth.session-token",
      "next-auth.callback-url",
      "next-auth.csrf-token",
      "supabase-auth-token",
      "__session",
    ]

    authCookies.forEach((name) => {
      cookieStore.delete(name)
    })

    return NextResponse.json({ success: true, message: "Sessão resetada com sucesso" })
  } catch (error) {
    console.error("Erro ao resetar sessão:", error)
    return NextResponse.json({ error: "Erro ao resetar sessão" }, { status: 500 })
  }
}
