import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { HeroGeometric } from "@/components/hero-geometric"

export const metadata: Metadata = {
  title: "Agentes de Conversão | Crie agentes de IA conversacionais",
  description:
    "Plataforma para criar e gerenciar agentes de IA conversacionais personalizados com base de conhecimento.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <HeroGeometric
        badge="Agentes de Conversão"
        title1="Criando agentes de IA seguros"
        title2="que beneficiam a humanidade"
      />

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-2xl font-normal mb-3">Crie agentes personalizados</h3>
            <p className="text-white/70 mb-4">
              Configure agentes de IA conversacionais adaptados às suas necessidades específicas.
            </p>
            <Link href="/features" className="text-sm flex items-center hover:underline">
              Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-2xl font-normal mb-3">Base de conhecimento</h3>
            <p className="text-white/70 mb-4">
              Alimente seus agentes com documentos e dados específicos do seu negócio.
            </p>
            <Link href="/features#knowledge-base" className="text-sm flex items-center hover:underline">
              Como funciona <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-2xl font-normal mb-3">Integração simples</h3>
            <p className="text-white/70 mb-4">
              Adicione seus agentes ao seu site ou aplicativo com poucas linhas de código.
            </p>
            <Link href="/docs/integration" className="text-sm flex items-center hover:underline">
              Ver documentação <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-6">Comece a criar seu agente hoje</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl">
            Configure seu primeiro agente em minutos e transforme a maneira como você interage com seus clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/signup">Criar conta gratuita</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              <Link href="/docs">Ver documentação</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
