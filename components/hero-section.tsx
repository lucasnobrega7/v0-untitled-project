import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </div>
            <span className="font-medium text-lg text-white">Agentes de Conversão</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-sm text-white/70 hover:text-white transition-colors">
              Documentação
            </Link>
            <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">
              Preços
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
              asChild
            >
              <Link href="/auth/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white">
              Agentes de IA para <span className="flair-gradient-text">conversão</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Transforme seu conhecimento em agentes conversacionais inteligentes para aumentar suas taxas de conversão
              e engajamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0"
                asChild
              >
                <Link href="/auth/signup">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-white/80 hover:text-white hover:border-white/20 backdrop-blur-sm"
                asChild
              >
                <Link href="/demo">Ver Demonstração</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium mb-4 text-white">Recursos Poderosos</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
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
                <div key={index} className="flair-card p-6 flair-glow">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mb-4 flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
              <span className="font-medium text-white">Agentes de Conversão</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                Sobre
              </Link>
              <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                Contato
              </Link>
              <Link href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
