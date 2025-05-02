"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from 'lucide-react'

export default function N8nIntegrationClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integração com N8N</h1>
        <p className="text-muted-foreground mt-2">
          Aprenda a integrar seus agentes com o N8N para criar fluxos de trabalho automatizados.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>O que é o N8N?</AlertTitle>
        <AlertDescription>
          N8N é uma ferramenta de automação de fluxo de trabalho que permite conectar diferentes sistemas e serviços.
          Com uma interface visual intuitiva, você pode criar fluxos complexos sem precisar escrever código.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks no N8N</TabsTrigger>
          <TabsTrigger value="examples">Exemplos de Fluxos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Por que integrar com N8N?</CardTitle>
              <CardDescription>Benefícios da integração entre Agentes de Conversão e N8N</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>A integração entre a plataforma Agentes de Conversão e o N8N oferece diversas vantagens:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Automação de processos</strong>: Automatize tarefas repetitivas e fluxos de trabalho complexos
                </li>
                <li>
                  <strong>Integração com múltiplos sistemas</strong>: Conecte seus agentes com dezenas de outras
                  ferramentas e serviços
                </li>
                <li>
                  <strong>Processamento de dados</strong>: Transforme, filtre e enriqueça dados recebidos dos agentes
                </li>
                <li>
                  <strong>Notificações personalizadas</strong>: Envie alertas e notificações para diferentes canais
                </li>
                <li>
                  <strong>Lógica condicional</strong>: Crie fluxos com decisões baseadas em dados e condições
                </li>
                <li>
                  <strong>Agendamento</strong>: Execute fluxos em horários específicos ou em intervalos regulares
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-4">Arquitetura da Integração</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="mb-2">
                  A integração entre Agentes de Conversão e N8N funciona principalmente de duas formas:
                </p>

                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Webhooks</strong>: O N8N recebe eventos da plataforma Agentes de Conversão através de
                    webhooks
                  </li>
                  <li>
                    <strong>HTTP Requests</strong>: O N8N faz requisições para a API da plataforma Agentes de Conversão
                  </li>
                </ol>

                <p className="mt-2">
                  Essa abordagem permite tanto fluxos reativos (acionados por eventos) quanto proativos (iniciados pelo
                  N8N).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuração Inicial</CardTitle>
              <CardDescription>Passos para configurar a integração entre Agentes de Conversão e N8N</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Pré-requisitos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uma conta na plataforma Agentes de Conversão</li>
                <li>Acesso ao N8N (self-hosted ou cloud)</li>
                <li>API Key da plataforma Agentes de Conversão</li>
              </ul>

              <h3 className="text-lg font-medium mt-4">Passos para Configuração</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <p className="font-medium">Obtenha sua API Key</p>
                  <p className="text-sm text-muted-foreground">
                    Acesse o painel da plataforma Agentes de Conversão, vá para Configurações {'>'}  API e gere uma nova
                    API Key.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Configure o N8N</p>
                  <p className="text-sm text-muted-foreground">
                    Instale o N8N ou acesse sua instância cloud. Crie um novo workflow.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Adicione credenciais no N8N</p>
                  <p className="text-sm text-muted-foreground">
                    No N8N, vá para Credentials e adicione uma nova credencial do tipo "API Key Auth" com sua API Key.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Configure um webhook no N8N</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione um nó "Webhook" ao seu workflow e copie a URL gerada.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Configure o webhook na plataforma</p>
                  <p className="text-sm text-muted-foreground">
                    Na plataforma Agentes de Conversão, vá para Configurações {'>'}  Webhooks e adicione um novo webhook com
                    a URL do N8N e os eventos desejados.
                  </p>
                </li>
              </ol>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Dica de Segurança</AlertTitle>
                <AlertDescription>
                  Recomendamos configurar um segredo para seus webhooks e validar a assinatura no N8N para garantir a
                  autenticidade das requisições.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurando Webhooks no N8N</CardTitle>
              <CardDescription>Como configurar webhooks para receber eventos da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Criando um Webhook no N8N</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Crie um novo workflow no N8N</li>
                <li>Adicione um nó "Webhook" como trigger</li>
                <li>Configure o webhook para o método HTTP POST</li>
                <li>Salve o workflow para ativar o webhook</li>
                <li>Copie a URL do webhook gerada pelo N8N</li>
              </ol>

              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="font-medium">Exemplo de configuração do nó Webhook no N8N:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Authentication: None (será validado via assinatura)</li>
                  <li>HTTP Method: POST</li>
                  <li>Path: /agentes-conversao (opcional)</li>
                  <li>Response Mode: Last Node</li>
                  <li>Response Code: 200</li>
                  <li>Response Data: JSON</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium mt-4">Validando a Assinatura do Webhook</h3>
              <p>
                Para garantir a segurança, você deve validar a assinatura do webhook. Adicione um nó "Function" após o
                webhook para verificar a assinatura:
              </p>

              <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                {`// Código para o nó Function no N8N
const crypto = require('crypto');

// Dados recebidos do webhook
const headers = $input.first().headers;
const body = $input.first().body;
const signature = headers['x-webhook-signature'];
const secret = 'seu_segredo_aqui'; // O mesmo configurado na plataforma

// Calcular a assinatura esperada
const payload = JSON.stringify(body);
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

// Verificar se a assinatura é válida
if (signature === expectedSignature) {
  // Assinatura válida, continuar o fluxo
  return $input.all();
} else {
  // Assinatura inválida, interromper o fluxo
  throw new Error('Assinatura de webhook inválida');
}`}
              </pre>

              <h3 className="text-lg font-medium mt-4">Configurando o Webhook na Plataforma</h3>
              <p>Após obter a URL do webhook no N8N, você precisa configurá-la na plataforma Agentes de Conversão:</p>

              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Acesse o painel da plataforma Agentes de Conversão</li>
                <li>Vá para Configurações {'>'}  Webhooks</li>
                <li>Clique em "Adicionar Webhook"</li>
                <li>Preencha a URL do webhook gerada pelo N8N</li>
                <li>Selecione os eventos que deseja receber</li>
                <li>Configure um segredo para validação da assinatura</li>
                <li>Salve a configuração</li>
              </ol>

              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Uso Comum no N8N</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>conversation.created</TableCell>
                    <TableCell>Uma nova conversa foi iniciada</TableCell>
                    <TableCell>Registrar no CRM, notificar equipe</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>conversation.closed</TableCell>
                    <TableCell>Uma conversa foi encerrada</TableCell>
                    <TableCell>Atualizar métricas, enviar pesquisa de satisfação</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>message.created</TableCell>
                    <TableCell>Uma nova mensagem foi enviada</TableCell>
                    <TableCell>Análise de sentimento, extração de dados</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>agent.action</TableCell>
                    <TableCell>O agente executou uma ação</TableCell>
                    <TableCell>Processar ações específicas, como qualificação de leads</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processando Eventos no N8N</CardTitle>
              <CardDescription>Como processar diferentes tipos de eventos recebidos via webhook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Estrutura dos Eventos</h3>
              <p>Todos os eventos enviados pela plataforma Agentes de Conversão seguem uma estrutura comum:</p>

              <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                {JSON.stringify(
                  {
                    event: "event.type",
                    timestamp: "2023-05-02T14:30:00Z",
                    data: {
                      // Dados específicos do evento
                    },
                  },
                  null,
                  2,
                )}
              </pre>

              <h3 className="text-lg font-medium mt-4">Roteamento de Eventos</h3>
              <p>Para processar diferentes tipos de eventos, você pode usar um nó "Switch" no N8N:</p>

              <div className="bg-muted p-4 rounded-md mt-2">
                <p className="font-medium">Exemplo de configuração do nó Switch:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Value to switch on: data.event</li>
                  <li>Case 1: conversation.created</li>
                  <li>Case 2: message.created</li>
                  <li>Case 3: conversation.closed</li>
                  <li>Case 4: agent.action</li>
                  <li>Default: (opcional)</li>
                </ul>
              </div>

              <p className="mt-4">
                Após o nó Switch, você pode adicionar diferentes fluxos para cada tipo de evento, permitindo um
                processamento específico para cada caso.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Exemplo 1: Notificação de Lead Qualificado</CardTitle>
              <CardDescription>Fluxo para notificar a equipe de vendas sobre leads qualificados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Descrição do Fluxo</h3>
              <p>
                Este fluxo monitora eventos do tipo <code>agent.action</code> com ação "qualificar_lead" e notifica a
                equipe de vendas quando um lead é classificado como "quente".
              </p>

              <h3 className="text-lg font-medium mt-4">Componentes do Fluxo</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Webhook</strong>: Recebe eventos da plataforma Agentes de Conversão
                </li>
                <li>
                  <strong>Function</strong>: Valida a assinatura do webhook
                </li>
                <li>
                  <strong>IF</strong>: Verifica se é um evento de qualificação de lead e se o lead é "quente"
                </li>
                <li>
                  <strong>HTTP Request</strong>: Busca detalhes adicionais do lead na API
                </li>
                <li>
                  <strong>Slack</strong>: Envia notificação para o canal de vendas
                </li>
                <li>
                  <strong>Email</strong>: Envia email para o vendedor responsável
                </li>
                <li>
                  <strong>Google Sheets</strong>: Registra o lead em uma planilha de acompanhamento
                </li>
              </ol>

              <h3 className="text-lg font-medium mt-4">Configuração do Nó IF</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                {`// Condição para o nó IF
return $input.first().body.event === 'agent.action' && 
       $input.first().body.data.action === 'qualificar_lead' && 
       $input.first().body.data.result.classification === 'quente';`}
              </pre>

              <h3 className="text-lg font-medium mt-4">Configuração do Nó Slack</h3>
              <div className="bg-muted p-4 rounded-md mt-2">
                <p className="font-medium">Mensagem para o Slack:</p>
                <pre className="mt-2">
                  {`🔥 *Novo Lead Quente!* 🔥

*Nome:* {{$node["HTTP Request"].json.name}}
*Empresa:* {{$node["HTTP Request"].json.company}}
*Email:* {{$node["HTTP Request"].json.email}}
*Telefone:* {{$node["HTTP Request"].json.phone}}
*Interesse:* {{$node["HTTP Request"].json.interest}}
*Orçamento:* R$ {{$node["HTTP Request"].json.budget}}

👉 *Detalhes da conversa:* {{$node["HTTP Request"].json.conversation_url}}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exemplo 2: Sincronização com CRM</CardTitle>
              <CardDescription>Fluxo para sincronizar conversas e mensagens com um CRM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Descrição do Fluxo</h3>
              <p>
                Este fluxo sincroniza conversas e mensagens com um sistema de CRM, mantendo um registro completo das
                interações dos agentes com os clientes.
              </p>

              <h3 className="text-lg font-medium mt-4">Componentes do Fluxo</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Webhook</strong>: Recebe eventos da plataforma Agentes de Conversão
                </li>
                <li>
                  <strong>Function</strong>: Valida a assinatura do webhook
                </li>
                <li>
                  <strong>Switch</strong>: Roteia diferentes tipos de eventos
                </li>
                <li>
                  <strong>HTTP Request (Buscar Cliente)</strong>: Busca o cliente no CRM pelo email ou telefone
                </li>
                <li>
                  <strong>IF</strong>: Verifica se o cliente existe no CRM
                </li>
                <li>
                  <strong>HTTP Request (Criar Cliente)</strong>: Cria um novo cliente no CRM se não existir
                </li>
                <li>
                  <strong>HTTP Request (Registrar Interação)</strong>: Registra a conversa ou mensagem no histórico do
                  cliente
                </li>
              </ol>

              <h3 className="text-lg font-medium mt-4">Configuração do Nó Switch</h3>
              <div className="bg-muted p-4 rounded-md mt-2">
                <p className="font-medium">Configuração do Switch:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Value to switch on: $input.first().body.event</li>
                  <li>Case 1: conversation.created → Fluxo para criar registro de conversa</li>
                  <li>Case 2: message.created → Fluxo para registrar mensagem</li>
                  <li>Case 3: conversation.closed → Fluxo para atualizar status da conversa</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium mt-4">Transformação de Dados</h3>
              <p>Use um nó "Function" para transformar os dados do evento no formato esperado pelo CRM:</p>

              <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                {`// Transformação para o formato do CRM
const event = $input.first().body;
const data = event.data;

// Formato para o CRM
return {
  json: {
    type: event.event === 'conversation.created' ? 'conversation' : 'message',
    external_id: event.event === 'conversation.created' ? data.conversation_id : data.message_id,
    customer_email: data.metadata?.email || 'unknown',
    customer_phone: data.metadata?.phone || 'unknown',
    content: data.content || data.title || '',
    timestamp: event.timestamp,
    agent_id: data.agent_id,
    conversation_id: data.conversation_id
  }
};`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exemplo 3: Análise de Sentimento</CardTitle>
              <CardDescription>
                Fluxo para analisar o sentimento das conversas e alertar para casos de insatisfação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Descrição do Fluxo</h3>
              <p>
                Este fluxo analisa o sentimento das mensagens dos usuários e alerta a equipe quando detecta
                insatisfação, permitindo intervenção rápida.
              </p>

              <h3 className="text-lg font-medium mt-4">Componentes do Fluxo</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Webhook</strong>: Recebe eventos do tipo message.created
                </li>
                <li>
                  <strong>Function</strong>: Valida a assinatura do webhook
                </li>
                <li>
                  <strong>IF</strong>: Verifica se a mensagem é do usuário (não do agente)
                </li>
                <li>
                  <strong>HTTP Request (API de Sentimento)</strong>: Envia o texto para uma API de análise de sentimento
                </li>
                <li>
                  <strong>IF</strong>: Verifica se o sentimento é negativo
                </li>
                <li>
                  <strong>HTTP Request (Detalhes da Conversa)</strong>: Busca detalhes completos da conversa
                </li>
                <li>
                  <strong>Slack</strong>: Envia alerta para a equipe de suporte
                </li>
                <li>
                  <strong>HTTP Request (Marcar Conversa)</strong>: Marca a conversa como "precisa de atenção"
                </li>
              </ol>

              <h3 className="text-lg font-medium mt-4">Configuração da API de Sentimento</h3>
              <p>
                Você pode usar serviços como Google Cloud Natural Language API, Azure Text Analytics, ou Amazon
                Comprehend para análise de sentimento:
              </p>

              <div className="bg-muted p-4 rounded-md mt-2">
                <p className="font-medium">Exemplo com Google Cloud Natural Language API:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>URL: https://language.googleapis.com/v1/documents:analyzeSentiment</li>
                  <li>Method: POST</li>
                  <li>Headers: Authorization: Bearer {'{{$node["Google Cloud OAuth"].json.access_token}}'}</li>
                  <li>
                    Body:
                    <pre className="mt-2">
                      {JSON.stringify(
                        {
                          document: {
                            type: "PLAIN_TEXT",
                            content: "{{$input.first().body.data.content}}",
                          },
                          encodingType: "UTF8",
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium mt-4">Configuração do Alerta</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                {`// Condição para o nó IF (sentimento negativo)
return $input.first().json.documentSentiment.score < -0.3;`}
              </pre>

              <div className="bg-muted p-4 rounded-md mt-2">
                <p className="font-medium">Mensagem para o Slack:</p>
                <pre className="mt-2">
                  {`⚠️ *Alerta de Cliente Insatisfeito* ⚠️

*Cliente:* {{$node["HTTP Request"].json.customer_name}}
*Sentimento:* Negativo ({{$node["HTTP Request (API de Sentimento)"].json.documentSentiment.score}})
*Mensagem:* "{{$input.first().body.data.content}}"

*Conversa:* {{$node["HTTP Request"].json.conversation_url}}

👉 Esta conversa foi marcada para revisão urgente.`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
