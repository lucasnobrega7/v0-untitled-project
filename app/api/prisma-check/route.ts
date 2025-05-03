import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Tenta fazer uma consulta simples para verificar se o Prisma Client está funcionando
    const userCount = await prisma.user.count()

    return NextResponse.json({
      status: "success",
      message: "Prisma Client está funcionando corretamente",
      userCount,
    })
  } catch (error) {
    console.error("Erro ao verificar o Prisma Client:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Erro ao verificar o Prisma Client",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
