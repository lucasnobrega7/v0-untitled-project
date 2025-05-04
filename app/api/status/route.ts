import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"

export async function GET() {
  try {
    // Verificar conexão com o Supabase
    const { data, error } = await supabase.from("health_check").select().limit(1)

    if (error) {
      console.error("Erro ao verificar status do Supabase:", error)
      return NextResponse.json(
        {
          supabase: {
            status: "offline",
            error: error.message,
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      supabase: {
        status: "online",
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("Erro ao verificar status:", error)
    return NextResponse.json(
      {
        error: error.message || "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
