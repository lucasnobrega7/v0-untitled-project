import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.NEON_API_KEY) {
      return NextResponse.json({ error: "NEON_API_KEY não está configurada" }, { status: 500 })
    }

    const response = await fetch("https://console.neon.tech/api/v2/projects", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEON_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: "Erro ao acessar a API do Neon", details: errorData },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Erro ao acessar a API do Neon:", error)
    return NextResponse.json({ error: "Erro ao acessar a API do Neon", message: error.message }, { status: 500 })
  }
}
