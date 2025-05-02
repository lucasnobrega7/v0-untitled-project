import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    // <MainLayout>
    //   {/* Substituindo a seção hero pela nova versão animada */}
    //   <HeroGeometric
    //     badge="Agentes de Conversão"
    //     title1="Criando agentes de IA seguros"
    //     title2="que beneficiam a humanidade"
    //   />

    //   <section className="container mx-auto px-4 md:px-6 py-20">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
    //       <div className="border-t border-white/20 pt-6">
    //         <h3 className="text-2xl font-normal mb-3 underline">Criando agentes seguros que beneficiam a humanidade</h3>
    //         <Link href="/about" className="text-sm underline hover:no-underline">
    //           Saiba mais sobre nós
    //         </Link>
    //       </div>
    //       <div className="border-t border-white/20 pt-6">
    //         <h3 className="text-2xl font-normal mb-3 underline">Pesquisa pioneira em IA conversacional</h3>
    //         <Link href="/research" className="text-sm underline hover:no-underline">
    //           Conheça nossa pesquisa
    //         </Link>
    //       </div>
    //       <div className="border-t border-white/20 pt-6">
    //         <h3 className="text-2xl font-normal mb-3 underline">Transformando trabalho e criatividade com IA</h3>
    //         <Link href="/api" className="text-sm underline hover:no-underline">
    //           Explore nossa API
    //         </Link>
    //       </div>
    //       <div className="border-t border-white/20 pt-6">
    //         <h3 className="text-2xl font-normal mb-3 underline">Junte-se a nós para moldar o futuro da tecnologia</h3>
    //         <Link href="/careers" className="text-sm underline hover:no-underline">
    //           Ver carreiras
    //         </Link>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
    //     <div className="flex flex-col md:flex-row">
    //       <div className="md:w-1/3 mb-6 md:mb-0">
    //         <h2 className="text-4xl font-normal mb-6">Agentes de Conversão</h2>
    //       </div>
    //       <div className="md:w-2/3">
    //         <p className="text-2xl font-normal mb-6 leading-tight">
    //           Treinamos modelos de IA que interagem de forma conversacional. O formato de diálogo torna possível que os
    //           Agentes respondam perguntas de acompanhamento, admitam seus erros, desafiem premissas incorretas e
    //           rejeitem solicitações inadequadas.
    //         </p>
    //         <div className="flex flex-wrap gap-4">
    //           <Link href="/agents" className="text-sm underline hover:no-underline flex items-center">
    //             Explorar Agentes
    //             <ArrowRight className="ml-1 h-4 w-4" />
    //           </Link>
    //           <Link href="/agents/features" className="text-sm underline hover:no-underline">
    //             Recursos dos Agentes
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
    //     <div className="flex flex-col md:flex-row">
    //       <div className="md:w-1/3 mb-6 md:mb-0">
    //         <h2 className="text-4xl font-normal mb-6">API</h2>
    //       </div>
    //       <div className="md:w-2/3">
    //         <p className="text-2xl font-normal mb-6 leading-tight">
    //           Nossa API oferece acesso aos nossos modelos mais recentes e guias para as melhores práticas de segurança.
    //           Construa aplicações poderosas com nossa tecnologia de IA de ponta.
    //         </p>
    //         <div className="flex flex-wrap gap-4">
    //           <Link href="/api" className="text-sm underline hover:no-underline flex items-center">
    //             Explorar API
    //             <ArrowRight className="ml-1 h-4 w-4" />
    //           </Link>
    //           <Link href="/api/docs" className="text-sm underline hover:no-underline">
    //             Documentação
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
    //     <h2 className="text-4xl font-normal mb-10">Casos de uso</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    //       <div>
    //         <img
    //           src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Openai.png-Zhh08WG6eZvLq45wtit1HqtkvzqpFH.jpeg"
    //           alt="Caso de uso 1"
    //           className="aspect-square object-cover mb-4"
    //         />
    //         <h4 className="font-bold text-sm mb-1">Atendimento ao cliente</h4>
    //         <p className="text-sm text-white/70">
    //           Agentes que fornecem suporte 24/7 e resolvem problemas comuns dos clientes.
    //         </p>
    //       </div>
    //       <div>
    //         <img
    //           src="/placeholder.svg?height=300&width=300"
    //           alt="Caso de uso 2"
    //           className="aspect-square object-cover mb-4"
    //         />
    //         <h4 className="font-bold text-sm mb-1">Qualificação de leads</h4>
    //         <p className="text-sm text-white/70">
    //           Agentes que qualificam leads e direcionam para as equipes de vendas.
    //         </p>
    //       </div>
    //       <div>
    //         <img
    //           src="/placeholder.svg?height=300&width=300"
    //           alt="Caso de uso 3"
    //           className="aspect-square object-cover mb-4"
    //         />
    //         <h4 className="font-bold text-sm mb-1">Assistentes de pesquisa</h4>
    //         <p className="text-sm text-white/70">
    //           Agentes que ajudam a encontrar e sintetizar informações de grandes bases de conhecimento.
    //         </p>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
    //     <div className="flex flex-col md:flex-row">
    //       <div className="md:w-1/3 mb-6 md:mb-0">
    //         <h2 className="text-4xl font-normal mb-6">Segurança</h2>
    //       </div>
    //       <div className="md:w-2/3">
    //         <p className="text-2xl font-normal mb-6 leading-tight">
    //           Nosso trabalho para criar IA segura e benéfica requer uma compreensão profunda dos riscos e benefícios
    //           potenciais, bem como uma consideração cuidadosa do impacto.
    //         </p>
    //         <Link href="/safety" className="text-sm underline hover:no-underline">
    //           Saiba mais sobre segurança
    //         </Link>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="container mx-auto px-4 md:px-6 py-20 border-t border-white/20">
    //     <div className="flex flex-col items-center text-center">
    //       <h2 className="text-5xl md:text-6xl font-normal mb-10">Junte-se a nós para moldar o futuro da tecnologia.</h2>
    //       <div className="border border-white w-full max-w-3xl py-6 mb-10">
    //         <Link href="/careers" className="text-2xl underline hover:no-underline">
    //           Ver carreiras
    //         </Link>
    //       </div>
    //     </div>
    //   </section>
    // </MainLayout>
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Assistente IA com Base de Conhecimento</h1>
        <p className="text-center mb-8 text-muted-foreground">
          Este assistente utiliza OpenAI, Pinecone e Neon Database para responder perguntas com base em conhecimento
          personalizado.
        </p>

        <ChatInterface />
      </div>
    </main>
  )
}
