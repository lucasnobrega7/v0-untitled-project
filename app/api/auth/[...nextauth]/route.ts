import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Remover qualquer configuração de Edge Runtime
// export const runtime = 'edge'; // Se esta linha existir, remova-a

// Adicionar tratamento de erros
const handler = async (req: Request, context: { params: { nextauth: string[] } }) => {
  try {
    return await NextAuth(authOptions)(req, {
      params: {
        nextauth: context.params.nextauth,
      },
    })
  } catch (error) {
    console.error("NextAuth error:", error)
    return new Response(
      JSON.stringify({
        error: "Internal authentication error",
        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export { handler as GET, handler as POST }
