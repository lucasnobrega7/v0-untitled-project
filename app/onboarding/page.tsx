"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [useCase, setUseCase] = useState("")

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    setLoading(true)

    try {
      // Salvar as preferências do usuário
      await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          industry,
          useCase,
        }),
      })

      // Redirecionar para a página de criação do primeiro agente
      router.push("/setup/agent")
    } catch (error) {
      console.error("Erro ao salvar preferências:", error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM14.5 21.5C14.5 22.881 13.381 24 12 24C10.619 24 9.5 22.881 9.5 21.5C9.5 20.119 10.619 19 12 19C13.381 19 14.5 20.119 14.5 21.5ZM14.5 10.5C14.5 11.881 13.381 13 12 13C10.619 13 9.5 11.881 9.5 10.5C9.5 9.119 10.619 8 12 8C13.381 8 14.5 9.119 14.5 10.5ZM20 16C20 17.381 18.881 18.5 17.5 18.5C16.119 18.5 15 17.381 15 16C15 14.619 16.119 13.5 17.5 13.5C18.881 13.5 20 14.619 20 16ZM22.5 21.5C22.5 22.881 21.381 24 20 24C18.619 24 17.5 22.881 17.5 21.5C17.5 20.119 18.619 19 20 19C21.381 19 22.5 20.119 22.5 21.5ZM22.5 10.5C22.5 11.881 21.381 13 20 13C18.619 13 17.5 11.881 17.5 10.5C17.5 9.119 18.619 8 20 8C21.381 8 22.5 9.119 22.5 10.5Z"
                fill="white"
              />
            </svg>
            <span className="font-medium">Agentes de Conversão</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-normal mb-2">Bem-vindo, {session?.user?.name || "novo usuário"}!</h1>
            <p className="text-white/70">Vamos configurar sua conta para começar.</p>

            <div className="mt-6">
              <Progress value={progress} className="h-2 bg-white/10" />
              <div className="flex justify-between mt-2 text-sm text-white/50">
                <span>
                  Passo {step} de {totalSteps}
                </span>
                <span>{Math.round(progress)}% completo</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Sobre sua empresa</h2>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                    Nome da empresa
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-md focus:outline-none focus:border-white"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-2">
                    Setor de atuação
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-md focus:outline-none focus:border-white"
                  >
                    <option value="" disabled>
                      Selecione um setor
                    </option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="finance">Finanças</option>
                    <option value="education">Educação</option>
                    <option value="healthcare">Saúde</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Seu caso de uso</h2>
                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium mb-2">
                    Como você planeja usar nossos agentes?
                  </label>
                  <select
                    id="useCase"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full bg-transparent border border-white/20 px-3 py-2 rounded-md focus:outline-none focus:border-white"
                  >
                    <option value="" disabled>
                      Selecione um caso de uso
                    </option>
                    <option value="customer_support">Atendimento ao cliente</option>
                    <option value="lead_generation">Geração de leads</option>
                    <option value="knowledge_base">Base de conhecimento</option>
                    <option value="internal_tool">Ferramenta interna</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Pronto para começar!</h2>
                <p className="text-white/70">
                  Agora você pode criar seu primeiro agente de IA conversacional. Vamos configurá-lo juntos.
                </p>
                <div className="bg-white/5 p-4 rounded-md">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Conta criada com sucesso</h3>
                      <p className="text-sm text-white/70">Sua conta está pronta para uso.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={loading || (step === 1 && (!companyName || !industry)) || (step === 2 && !useCase)}
                className="bg-white text-black hover:bg-white/90 flex items-center"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : step < totalSteps ? (
                  <>
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Criar meu primeiro agente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
