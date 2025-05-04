import { supabase, supabaseAdmin, checkDatabaseConnection } from "../lib/db"

async function testDatabaseConnection() {
  console.log("Testando conexão com o banco de dados...")

  try {
    // Teste usando o cliente Supabase padrão
    console.log("Testando cliente Supabase padrão...")
    const { data: healthCheck, error: healthCheckError } = await supabase.from("health_check").select("*").limit(1)

    if (healthCheckError) {
      console.error("Erro ao conectar usando cliente Supabase padrão:", healthCheckError)
    } else {
      console.log("✅ Conexão com cliente Supabase padrão bem-sucedida!")
      console.log("Dados retornados:", healthCheck)
    }

    // Teste usando o cliente Supabase Admin
    console.log("\nTestando cliente Supabase Admin...")
    const { data: adminHealthCheck, error: adminHealthCheckError } = await supabaseAdmin
      .from("health_check")
      .select("*")
      .limit(1)

    if (adminHealthCheckError) {
      console.error("Erro ao conectar usando cliente Supabase Admin:", adminHealthCheckError)
    } else {
      console.log("✅ Conexão com cliente Supabase Admin bem-sucedida!")
      console.log("Dados retornados:", adminHealthCheck)
    }

    // Teste usando a função checkDatabaseConnection
    console.log("\nTestando função checkDatabaseConnection...")
    const checkResult = await checkDatabaseConnection()

    if (checkResult.success) {
      console.log("✅ Função checkDatabaseConnection bem-sucedida!")
      console.log("Resultado:", checkResult)
    } else {
      console.error("Erro na função checkDatabaseConnection:", checkResult)
    }
  } catch (error) {
    console.error("Erro inesperado durante os testes de conexão:", error)
  }
}

// Executar o teste
testDatabaseConnection()
  .then(() => {
    console.log("\nTestes de conexão concluídos.")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\nErro fatal durante os testes de conexão:", error)
    process.exit(1)
  })
