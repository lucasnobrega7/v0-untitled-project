import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Remover qualquer configuração de Edge Runtime
// export const runtime = 'edge'; // Se esta linha existir, remova-a

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
