import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Este email já está em uso" }, { status: 409 })
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10)

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Remover a senha do objeto de resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 })
  }
}
