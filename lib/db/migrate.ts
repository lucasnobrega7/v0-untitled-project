import { migrate } from "drizzle-orm/neon-http/migrator"
import { db } from "./index"

// Função para executar migrações
export async function runMigrations() {
  console.log("Executando migrações...")

  try {
    await migrate(db, { migrationsFolder: "drizzle" })
    console.log("Migrações concluídas com sucesso!")
  } catch (error) {
    console.error("Erro ao executar migrações:", error)
    throw error
  }
}

// Executar migrações se este arquivo for chamado diretamente
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Erro fatal nas migrações:", err)
      process.exit(1)
    })
}
