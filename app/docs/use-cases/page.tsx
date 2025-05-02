import type { Metadata } from "next"
import DocsLayout from "@/components/layout/docs-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Casos de Uso | Agentes de Conversão",
  description: "Cenários comuns e como implementá-los com nossa API",
}

export default function UseCasesPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos de Uso</h1>
          <p className="text-muted-foreground mt-2">
            Cenários comuns e como implementá-los com nossa API e ferramentas.
          </p>
        </div>

        <Tabs defaultValue="atendimento">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="atendimento">Atendimento ao Cliente</TabsTrigger>
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            <TabsTrigger value="integracao">Integrações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="atendimento" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Atendimento Automatizado</CardTitle>
                <CardDescription>Como configurar um agente para atendimento ao cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Um agente de atendimento ao cliente pode responder perguntas frequentes, 
                  resolver problemas comuns e escalar casos complexos para atendentes humanos.
                </p>
                
                <h3 className="text-lg font-medium mt-4">Configuração do Agente</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify({
                    "name": "Assistente de Suporte",
                    "description": "Agente especializado em atendimento ao cliente",
                    "model": "gpt-4",
                    "system_prompt": "Você é um assistente de suporte ao cliente da empresa XYZ. Seu objetivo é ajudar os clientes a resolver seus problemas de forma eficiente e cordial. Se não souber a resposta, ou se o problema for muito complexo, sugira escalar para um atendente humano.",
                    "knowledge_base_ids": ["kb_suporte_tecnico", "kb_faq", "kb_politicas"]
                  }, null, 2)}
                </pre>
                
                <h3 className="text-lg font-medium mt-4">Ferramentas HTTP Recomendadas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Consulta de Pedidos</strong>: Permite que o agente verifique o status de pedidos do cliente
                  </li>
                  <li>
                    <strong>Consulta de FAQ</strong>: Busca respostas para perguntas frequentes em uma base de conhecimento
                  </li>
                  <li>
                    <strong>Escalar para Humano</strong>: Cria um ticket no sistema de suporte e notifica um atendente humano
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium mt-4">Webhooks Recomendados</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>conversation.created</strong>: Para registrar novas conversas no CRM
                  </li>
                  <li>
                    <strong>conversation.closed</strong>: Para atualizar métricas de atendimento
                  </li>
                  <li>
                    <strong>agent.action</strong>: Para monitorar ações específicas do agente, como escalações
                  </li>
                </ul>
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    Configure o agente para coletar feedback ao final das conversas. Isso ajudará a melhorar 
                    continuamente o atendimento e identificar áreas que precisam de mais treinamento.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Prioridades</CardTitle>
                <CardDescription>Como configurar priorização de atendimentos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Implemente um sistema de priorização para garantir que os casos mais urgentes 
                  sejam tratados primeiro, melhorando a eficiência do atendimento.
                </p>
                
                <h3 className="text-lg font-medium mt-4">Implementação</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Configure uma ferramenta HTTP para classificar a prioridade da\
