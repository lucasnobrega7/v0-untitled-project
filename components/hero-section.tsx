import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-openai-teal rounded-full"></div>
            <span className="font-medium text-lg">Agentes de Conversão</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-sm text-gray-600 hover:text-openai-teal">
              Documentação
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-openai-teal">
              Preços
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight">
              Agentes de IA para <span className="openai-gradient-text">conversão</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforme seu conhecimento em agentes conversacionais inteligentes para aumentar suas taxas de conversão
              e engajamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-openai-teal hover:bg-openai-teal2 text-white" asChild>
                <Link href="/auth/signup">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">Ver Demonstração</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-radial from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium mb-4">Recursos Poderosos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nossa plataforma combina as melhores tecnologias de IA para criar agentes conversacionais eficientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bases de Conhecimento",
                  description: "Alimente seus agentes com documentos, FAQs e dados específicos do seu negócio.",
                },
                {
                  title: "Modelos Avançados",
                  description: "Acesso aos modelos de linguagem mais avançados através de uma interface unificada.",
                },
                {
                  title: "Análise de Conversão",
                  description: "Métricas detalhadas para entender e otimizar o desempenho dos seus agentes.",
                },
              ].map((feature, index) => (
                <div key={index} className="openai-card p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-openai-teal to-openai-teal2 rounded-lg mb-4 flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-openai-teal rounded-full"></div>
              <span className="font-medium">Agentes de Conversão</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-gray-600 hover:text-openai-teal">
                Sobre
              </Link>
              <Link href="/blog" className="text-sm text-gray-600 hover:text-openai-teal">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-openai-teal">
                Contato
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-openai-teal">
                Termos
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-openai-teal">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
