import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Remover o wrapper personalizado que está causando o erro
// e usar a forma padrão recomendada pelo NextAuth para App Router

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
