import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Obter a sessão do NextAuth
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Criar cliente Supabase
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get: (name) => cookies().get(name)?.value,
        set: (name, value, options) => {
          cookies().set(name, value, options)
        },
        remove: (name, options) => {
          cookies().set(name, "", { ...options, maxAge: 0 })
        },
      },
    })

    // Verificar se o usuário existe no Supabase
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single()

    if (userError) {
      // Criar usuário no Supabase se não existir
      await supabase.from("users").insert({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      })
    }

    // Criar uma sessão no Supabase para o usuário
    const { data, error } = await supabase.auth.admin.createSession({
      userId: session.user.id,
      expiresIn: 60 * 60 * 24 * 30, // 30 dias
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao sincronizar sessão:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
