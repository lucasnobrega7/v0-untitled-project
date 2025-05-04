import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userRoles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Permission, Role } from "@/lib/auth/permissions"
import { createId } from "@paralleldrive/cuid2"

// Atualizar roles de um usuário
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar autenticação
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Verificar permissão
    if (!session.user.permissions.includes(Permission.EditUser)) {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 })
    }

    const userId = params.id
    const { roles } = await request.json()

    // Validar roles
    if (!Array.isArray(roles) || !roles.every((role) => Object.values(Role).includes(role))) {
      return NextResponse.json({ error: "Roles inválidos" }, { status: 400 })
    }

    // Remover roles existentes
    await db.delete(userRoles).where(eq(userRoles.userId, userId))

    // Adicionar novos roles
    const rolesToInsert = roles.map((role) => ({
      id: createId(),
      userId,
      role,
    }))

    await db.insert(userRoles).values(rolesToInsert)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao atualizar roles:", error)
    return NextResponse.json({ error: "Erro ao atualizar roles" }, { status: 500 })
  }
}

// Obter roles de um usuário
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar autenticação
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Verificar permissão
    if (!session.user.permissions.includes(Permission.ViewUsers)) {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 })
    }

    const userId = params.id

    // Buscar roles do usuário
    const userRolesList = await db.select().from(userRoles).where(eq(userRoles.userId, userId))

    const roles = userRolesList.map((ur) => ur.role)

    return NextResponse.json({ roles })
  } catch (error) {
    console.error("Erro ao buscar roles:", error)
    return NextResponse.json({ error: "Erro ao buscar roles" }, { status: 500 })
  }
}
