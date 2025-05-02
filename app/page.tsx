import { MainLayout } from "@/components/layout/main-layout"
import Link from "next/link"
import { Play } from "lucide-react"

export default function Home() {
  return (
    <MainLayout>
      <section className="container py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl mb-10">
            Agentes de IA é o sistema mais avançado, produzindo respostas mais seguras e úteis
          </h1>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/try" className="openai-button flex items-center">
              Experimentar Agentes Plus
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M6.5 3.5L11 8L6.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/waitlist" className="openai-link">
              Entrar na lista de espera da API
            </Link>
          </div>
        </div>

        <div className="relative mt-10 mb-20">
          <div className="aspect-video max-w-5xl mx-auto overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Openai-ELnivdwUza6w0TgIVfHEaFCKxvdQNO.png"
              alt="Pessoas conversando com assistente de IA"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-4 left-4 bg-black border border-white/20 flex items-center px-4 py-3 text-sm">
            <Play className="h-4 w-4 mr-2" />
            Play video
          </button>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-normal mb-3 underline">Criando agentes seguros que beneficiam a humanidade</h3>
            <Link href="/about" className="text-sm underline hover:no-underline">
              Saiba mais sobre nós
            </Link>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-3 underline">Pesquisa pioneira em IA conversacional</h3>
            <Link href="/research" className="text-sm underline hover:no-underline">
              Conheça nossa pesquisa
            </Link>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-3 underline">Transformando trabalho e criatividade com IA</h3>
            <Link href="/products" className="text-sm underline hover:no-underline">
              Explore nossos produtos
            </Link>
          </div>
          <div>
            <h3 className="text-2xl font-normal mb-3 underline">Junte-se a nós para moldar o futuro da tecnologia</h3>
            <Link href="/careers" className="text-sm underline hover:no-underline">
              Ver carreiras
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-normal mb-6">Agentes</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl font-normal mb-6 leading-tight">
              Treinamos um modelo chamado Agentes de Conversão que interage de forma conversacional. O formato de
              diálogo torna possível que os Agentes respondam perguntas de acompanhamento, admitam seus erros, desafiem
              premissas incorretas e rejeitem solicitações inadequadas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/try-agents" className="text-sm underline hover:no-underline flex items-center">
                Experimentar Agentes
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M6.5 3.5L11 8L6.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/about-agents" className="text-sm underline hover:no-underline">
                Saiba mais sobre Agentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <h2 className="text-4xl font-normal mb-10">Últimas atualizações</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Plugins de Agentes</h4>
            <p className="text-sm text-white/70">Mar 23, 2023</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Apresentando Agentes e APIs de Conhecimento</h4>
            <p className="text-sm text-white/70">Mar 1, 2023</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Planejando para IA avançada e além</h4>
            <p className="text-sm text-white/70">Fev 24, 2023</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Como os sistemas de IA devem se comportar?</h4>
            <p className="text-sm text-white/70">Fev 16, 2023</p>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-normal mb-6">Segurança e responsabilidade</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl font-normal mb-6 leading-tight">
              Nosso trabalho para criar IA segura e benéfica requer uma compreensão profunda dos riscos e benefícios
              potenciais, bem como uma consideração cuidadosa do impacto.
            </p>
            <Link href="/safety" className="text-sm underline hover:no-underline">
              Saiba mais sobre segurança
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="aspect-video w-full bg-gray-900"></div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-normal mb-6">Pesquisa</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl font-normal mb-6 leading-tight">
              Pesquisamos modelos generativos e como alinhá-los com valores humanos.
            </p>
            <Link href="/research" className="text-sm underline hover:no-underline">
              Saiba mais sobre nossa pesquisa
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Openai.png-Zhh08WG6eZvLq45wtit1HqtkvzqpFH.jpeg"
              alt="Exemplos de uso de agentes"
              className="aspect-square object-cover mb-4"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <img src="/placeholder.svg?height=100&width=100" alt="Exemplo 1" className="aspect-square object-cover" />
              <img src="/placeholder.svg?height=100&width=100" alt="Exemplo 2" className="aspect-square object-cover" />
              <img src="/placeholder.svg?height=100&width=100" alt="Exemplo 3" className="aspect-square object-cover" />
            </div>
            <h4 className="font-bold text-sm mb-1 underline">Agentes de Conversão</h4>
            <p className="text-sm text-white/70">Mar 14, 2023</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">
              Prevendo possíveis usos indevidos de modelos de linguagem para campanhas de desinformação
            </h4>
            <p className="text-sm text-white/70">Jan 11, 2023</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">
              Sistema para gerar nuvens de pontos 3D a partir de prompts complexos
            </h4>
            <p className="text-sm text-white/70">Dez 16, 2022</p>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-normal mb-6">Produtos</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl font-normal mb-6 leading-tight">
              Nossa plataforma de API oferece nossos modelos mais recentes e guias para as melhores práticas de
              segurança.
            </p>
            <Link href="/products" className="text-sm underline hover:no-underline">
              Explore nossos produtos
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Novo modelo de embedding aprimorado</h4>
            <p className="text-sm text-white/70">Dez 15, 2022</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">
              Base de Conhecimento agora disponível sem lista de espera
            </h4>
            <p className="text-sm text-white/70">Set 28, 2022</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">
              Novas e aprimoradas ferramentas de moderação de conteúdo
            </h4>
            <p className="text-sm text-white/70">Ago 10, 2022</p>
          </div>
          <div>
            <div className="aspect-square bg-gray-900 mb-4"></div>
            <h4 className="font-bold text-sm mb-1 underline">Novos recursos: Editar e inserir</h4>
            <p className="text-sm text-white/70">Mar 15, 2022</p>
          </div>
        </div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-normal mb-6">Carreiras na Agentes de Conversão</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-2xl font-normal mb-6 leading-tight">
              Desenvolver IA segura e benéfica requer pessoas de uma ampla gama de disciplinas e origens.
            </p>
            <Link href="/careers" className="text-sm underline hover:no-underline">
              Ver carreiras
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="aspect-video w-full bg-gray-900"></div>
      </section>

      <section className="container py-20 border-t border-white/20">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-normal mb-10">Junte-se a nós para moldar o futuro da tecnologia.</h2>
          <div className="border border-white w-full max-w-3xl py-6 mb-10">
            <Link href="/careers" className="text-2xl underline hover:no-underline">
              Ver carreiras
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
