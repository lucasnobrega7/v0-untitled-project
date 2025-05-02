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
                  Um agente de atendimento ao cliente pode responder perguntas frequentes, resolver problemas comuns e
                  escalar casos complexos para atendentes humanos.
                </p>

                <h3 className="text-lg font-medium mt-4">Configuração do Agente</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      name: "Assistente de Suporte",
                      description: "Agente especializado em atendimento ao cliente",
                      model: "gpt-4",
                      system_prompt:
                        "Você é um assistente de suporte ao cliente da empresa XYZ. Seu objetivo é ajudar os clientes a resolver seus problemas de forma eficiente e cordial. Se não souber a resposta, ou se o problema for muito complexo, sugira escalar para um atendente humano.",
                      knowledge_base_ids: ["kb_suporte_tecnico", "kb_faq", "kb_politicas"],
                    },
                    null,
                    2,
                  )}
                </pre>

                <h3 className="text-lg font-medium mt-4">Ferramentas HTTP Recomendadas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Consulta de Pedidos</strong>: Permite que o agente verifique o status de pedidos do cliente
                  </li>
                  <li>
                    <strong>Consulta de FAQ</strong>: Busca respostas para perguntas frequentes em uma base de
                    conhecimento
                  </li>
                  <li>
                    <strong>Escalar para Humano</strong>: Cria um ticket no sistema de suporte e notifica um atendente
                    humano
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
                  Implemente um sistema de priorização para garantir que os casos mais urgentes sejam tratados primeiro,
                  melhorando a eficiência do atendimento.
                </p>

                <h3 className="text-lg font-medium mt-4">Implementação</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Configure uma ferramenta HTTP para classificar a prioridade da conversa com base em palavras-chave e
                    contexto
                  </li>
                  <li>Utilize webhooks para notificar sistemas externos sobre conversas de alta prioridade</li>
                  <li>Implemente lógica para encaminhar automaticamente casos urgentes para atendentes humanos</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplo de Ferramenta HTTP</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      name: "Classificar Prioridade",
                      description: "Classifica a prioridade de uma conversa com base no conteúdo",
                      url: "https://api.example.com/classify-priority",
                      method: "POST",
                      headers: {
                        Authorization: "Bearer {{API_KEY}}",
                        "Content-Type": "application/json",
                      },
                      parameters: [
                        {
                          name: "conversation_id",
                          description: "ID da conversa",
                          required: true,
                          type: "string",
                        },
                        {
                          name: "message",
                          description: "Mensagem do usuário",
                          required: true,
                          type: "string",
                        },
                      ],
                    },
                    null,
                    2,
                  )}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Qualificação de Leads</CardTitle>
                <CardDescription>Como configurar um agente para qualificar leads de vendas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Um agente de vendas pode qualificar leads, responder perguntas sobre produtos e serviços, e encaminhar
                  leads qualificados para a equipe de vendas.
                </p>

                <h3 className="text-lg font-medium mt-4">Configuração do Agente</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      name: "Assistente de Vendas",
                      description: "Agente especializado em qualificação de leads",
                      model: "gpt-4",
                      system_prompt:
                        "Você é um assistente de vendas da empresa XYZ. Seu objetivo é qualificar leads, entender suas necessidades e apresentar nossas soluções. Colete informações relevantes como nome, empresa, cargo, orçamento, prazo e necessidades específicas. Ao final da conversa, classifique o lead como quente, morno ou frio com base no interesse demonstrado.",
                      knowledge_base_ids: ["kb_produtos", "kb_precos", "kb_casos_sucesso"],
                    },
                    null,
                    2,
                  )}
                </pre>

                <h3 className="text-lg font-medium mt-4">Ferramentas HTTP Recomendadas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Consulta de Produtos</strong>: Permite que o agente busque informações detalhadas sobre
                    produtos
                  </li>
                  <li>
                    <strong>Registro de Lead</strong>: Registra o lead qualificado no CRM
                  </li>
                  <li>
                    <strong>Agendamento de Demonstração</strong>: Permite agendar uma demonstração com um vendedor
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Fluxo de Qualificação</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>O agente inicia a conversa e identifica as necessidades do lead</li>
                  <li>O agente apresenta produtos/serviços relevantes usando a ferramenta de consulta</li>
                  <li>O agente coleta informações de contato e qualifica o lead</li>
                  <li>O agente registra o lead no CRM usando a ferramenta HTTP</li>
                  <li>Para leads quentes, o agente oferece agendar uma demonstração</li>
                </ol>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    Configure webhooks para notificar a equipe de vendas imediatamente quando um lead quente for
                    identificado, permitindo um follow-up rápido e aumentando as chances de conversão.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendação de Produtos</CardTitle>
                <CardDescription>Como configurar um agente para recomendar produtos personalizados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Um agente pode analisar as necessidades do cliente e recomendar produtos ou serviços personalizados,
                  aumentando as chances de conversão.
                </p>

                <h3 className="text-lg font-medium mt-4">Implementação</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Configure uma ferramenta HTTP para buscar produtos com base em critérios específicos</li>
                  <li>Treine o agente para extrair preferências e necessidades da conversa</li>
                  <li>Implemente lógica para apresentar os produtos mais relevantes com detalhes e imagens</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplo de Ferramenta HTTP</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      name: "Recomendar Produtos",
                      description: "Busca produtos recomendados com base em critérios",
                      url: "https://api.example.com/products/recommend",
                      method: "POST",
                      headers: {
                        Authorization: "Bearer {{API_KEY}}",
                        "Content-Type": "application/json",
                      },
                      parameters: [
                        {
                          name: "budget",
                          description: "Orçamento disponível",
                          required: false,
                          type: "number",
                        },
                        {
                          name: "categories",
                          description: "Categorias de interesse",
                          required: false,
                          type: "array",
                        },
                        {
                          name: "features",
                          description: "Características desejadas",
                          required: false,
                          type: "array",
                        },
                      ],
                    },
                    null,
                    2,
                  )}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integracao" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Integração com CRM</CardTitle>
                <CardDescription>Como integrar agentes com sistemas de CRM</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Integre seus agentes com sistemas de CRM para registrar leads, atualizar informações de clientes e
                  manter um histórico completo de interações.
                </p>

                <h3 className="text-lg font-medium mt-4">Ferramentas HTTP Necessárias</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Buscar Cliente</strong>: Busca informações de um cliente no CRM
                  </li>
                  <li>
                    <strong>Criar/Atualizar Cliente</strong>: Cria ou atualiza um registro de cliente
                  </li>
                  <li>
                    <strong>Registrar Interação</strong>: Registra uma interação no histórico do cliente
                  </li>
                  <li>
                    <strong>Criar Oportunidade</strong>: Cria uma nova oportunidade de venda
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Webhooks Recomendados</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>conversation.created</strong>: Para criar um novo registro de interação
                  </li>
                  <li>
                    <strong>conversation.closed</strong>: Para atualizar o status da interação
                  </li>
                  <li>
                    <strong>message.created</strong>: Para registrar mensagens importantes no histórico
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Exemplo de Integração com Salesforce</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      name: "Buscar Cliente Salesforce",
                      description: "Busca informações de um cliente no Salesforce",
                      url: "https://api.example.com/salesforce/customer",
                      method: "GET",
                      headers: {
                        Authorization: "Bearer {{SALESFORCE_API_KEY}}",
                        "Content-Type": "application/json",
                      },
                      parameters: [
                        {
                          name: "email",
                          description: "Email do cliente",
                          required: true,
                          type: "string",
                        },
                      ],
                    },
                    null,
                    2,
                  )}
                </pre>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Certifique-se de configurar as permissões adequadas na API do CRM e armazenar as credenciais de
                    forma segura usando o gerenciador de segredos da plataforma.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integração com N8N</CardTitle>
                <CardDescription>Como integrar agentes com o N8N para automação de fluxos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  O N8N é uma poderosa ferramenta de automação que pode ser integrada com seus agentes para criar fluxos
                  de trabalho complexos e automatizados.
                </p>

                <h3 className="text-lg font-medium mt-4">Configuração no N8N</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Crie um novo workflow no N8N</li>
                  <li>Adicione um nó "Webhook" como trigger</li>
                  <li>Configure o webhook para receber eventos da plataforma Agentes de Conversão</li>
                  <li>Adicione nós de processamento para manipular os dados recebidos</li>
                  <li>Configure ações a serem executadas com base nos eventos</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplos de Automações</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Notificação de Lead Qualificado</strong>: Envie notificações para a equipe de vendas quando
                    um lead for qualificado
                  </li>
                  <li>
                    <strong>Sincronização com CRM</strong>: Atualize automaticamente registros no CRM com base em
                    interações do agente
                  </li>
                  <li>
                    <strong>Análise de Sentimento</strong>: Analise o sentimento das conversas e alerte para casos de
                    insatisfação
                  </li>
                  <li>
                    <strong>Geração de Relatórios</strong>: Gere relatórios periódicos sobre o desempenho dos agentes
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Exemplo de Fluxo no N8N</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium">Fluxo: Notificação de Lead Qualificado</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>
                      Webhook recebe evento <code>agent.action</code> com ação "qualificar_lead"
                    </li>
                    <li>IF Node verifica se o lead foi classificado como "quente"</li>
                    <li>HTTP Request Node busca detalhes adicionais do lead na API</li>
                    <li>Slack Node envia notificação para o canal de vendas</li>
                    <li>Email Node envia email para o vendedor responsável</li>
                    <li>Google Sheets Node registra o lead em uma planilha de acompanhamento</li>
                  </ol>
                </div>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    O N8N permite criar fluxos complexos com condicionais, loops e transformações de dados. Explore
                    essas funcionalidades para criar automações personalizadas para seu negócio.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  )
}
