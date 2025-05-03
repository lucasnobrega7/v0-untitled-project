import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar se o email já está em uso
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "Este email já está em uso" }, { status: 409 })
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10)

    // Criar o usuário
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning()

    // Remover a senha do objeto de resposta
    const { password: _, ...userWithoutPassword } = newUser

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
