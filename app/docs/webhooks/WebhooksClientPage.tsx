"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"
import DocsLayout from "@/components/layout/docs-layout"

export default function WebhooksClientPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
          <p className="text-muted-foreground mt-2">
            Configure webhooks para receber notificações em tempo real sobre eventos dos seus agentes.
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Importante</AlertTitle>
          <AlertDescription>
            Os webhooks permitem que sua aplicação receba notificações automáticas quando eventos específicos ocorrem,
            eliminando a necessidade de consultar a API constantemente.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>O que são Webhooks?</CardTitle>
                <CardDescription>Entenda como os webhooks funcionam na plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Webhooks são URLs de callback HTTP que são acionadas quando determinados eventos ocorrem em nosso
                  sistema. Quando um evento configurado acontece, nossa plataforma envia uma requisição HTTP POST para a
                  URL do webhook com informações sobre o evento.
                </p>

                <h3 className="text-lg font-medium mt-4">Como funcionam</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Você configura um webhook para um agente, especificando uma URL e os eventos de interesse</li>
                  <li>
                    Quando um desses eventos ocorre (ex: nova mensagem), nosso sistema envia uma requisição HTTP POST
                    para sua URL
                  </li>
                  <li>Sua aplicação recebe os dados do evento e pode reagir adequadamente</li>
                  <li>Sua aplicação deve responder com um código de status 2xx para confirmar o recebimento</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Casos de uso comuns</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sincronizar conversas com seu CRM</li>
                  <li>Notificar equipes sobre novas conversas ou mensagens importantes</li>
                  <li>Acionar automações quando determinados eventos ocorrem</li>
                  <li>Coletar métricas e análises em tempo real</li>
                  <li>Integrar com ferramentas de automação como N8N, Zapier ou Make</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurando Webhooks</CardTitle>
                <CardDescription>Como configurar webhooks para seus agentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Requisitos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Um endpoint HTTP acessível publicamente que possa receber requisições POST</li>
                  <li>Capacidade de processar e responder a requisições JSON</li>
                  <li>Permissões adequadas na plataforma Agentes de Conversão</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Passos para configuração</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <p className="font-medium">Prepare seu endpoint</p>
                    <p className="text-sm text-muted-foreground">
                      Crie um endpoint em sua aplicação que possa receber requisições POST e processar o payload JSON.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Acesse as configurações do agente</p>
                    <p className="text-sm text-muted-foreground">
                      No painel da plataforma Agentes de Conversão, vá para o agente desejado e acesse a seção
                      "Webhooks".
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Adicione um novo webhook</p>
                    <p className="text-sm text-muted-foreground">
                      Clique em "Adicionar Webhook" e preencha os detalhes necessários.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Configure a URL e eventos</p>
                    <p className="text-sm text-muted-foreground">
                      Informe a URL do seu endpoint e selecione os eventos que deseja receber.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Configure um segredo (recomendado)</p>
                    <p className="text-sm text-muted-foreground">
                      Defina um segredo para validar a autenticidade das requisições recebidas.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Teste o webhook</p>
                    <p className="text-sm text-muted-foreground">
                      Use o botão "Testar Webhook" para enviar um evento de teste e verificar se sua aplicação está
                      recebendo corretamente.
                    </p>
                  </li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplo de configuração via API</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Requisição para configurar um webhook
POST /api/agents/{agent_id}/webhooks
{
  "url": "https://example.com/webhooks/agentes-conversao",
  "events": ["conversation.created", "message.created"],
  "secret": "seu_segredo_aqui"
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Disponíveis</CardTitle>
                <CardDescription>Lista de eventos que podem acionar webhooks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evento</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Dados Incluídos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>conversation.created</TableCell>
                      <TableCell>Uma nova conversa foi iniciada</TableCell>
                      <TableCell>ID da conversa, ID do agente, timestamp, metadados</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>conversation.closed</TableCell>
                      <TableCell>Uma conversa foi encerrada</TableCell>
                      <TableCell>ID da conversa, ID do agente, timestamp, motivo do encerramento</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>message.created</TableCell>
                      <TableCell>Uma nova mensagem foi enviada</TableCell>
                      <TableCell>ID da mensagem, ID da conversa, conteúdo, remetente, timestamp</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>agent.action</TableCell>
                      <TableCell>O agente executou uma ação específica</TableCell>
                      <TableCell>ID da ação, ID do agente, tipo de ação, resultado, timestamp</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>knowledge.query</TableCell>
                      <TableCell>O agente consultou a base de conhecimento</TableCell>
                      <TableCell>ID da consulta, ID da base de conhecimento, query, resultados</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>tool.executed</TableCell>
                      <TableCell>Uma ferramenta HTTP foi executada</TableCell>
                      <TableCell>ID da ferramenta, parâmetros, resultado, timestamp</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formato dos Payloads</CardTitle>
                <CardDescription>Estrutura dos dados enviados para cada tipo de evento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Estrutura comum</h3>
                <p>
                  Todos os eventos seguem uma estrutura comum, com um campo <code>event</code> indicando o tipo de
                  evento e um campo <code>data</code> contendo os detalhes específicos:
                </p>

                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
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

                <h3 className="text-lg font-medium mt-4">Exemplo: conversation.created</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "conversation.created",
                      timestamp: "2023-05-02T14:30:00Z",
                      data: {
                        conversation_id: "conv_123456789",
                        agent_id: "ag_123456789",
                        title: "Nova conversa com cliente",
                        metadata: {
                          source: "website",
                          user_id: "user_123",
                          email: "cliente@example.com",
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>

                <h3 className="text-lg font-medium mt-4">Exemplo: message.created</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "message.created",
                      timestamp: "2023-05-02T14:35:00Z",
                      data: {
                        message_id: "msg_123456789",
                        conversation_id: "conv_123456789",
                        agent_id: "ag_123456789",
                        content: "Olá, como posso ajudar?",
                        sender_type: "agent",
                        sender_id: "ag_123456789",
                        created_at: "2023-05-02T14:35:00Z",
                      },
                    },
                    null,
                    2,
                  )}
                </pre>

                <h3 className="text-lg font-medium mt-4">Exemplo: agent.action</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      event: "agent.action",
                      timestamp: "2023-05-02T14:40:00Z",
                      data: {
                        action_id: "act_123456789",
                        agent_id: "ag_123456789",
                        conversation_id: "conv_123456789",
                        action_type: "qualificar_lead",
                        result: {
                          classification: "quente",
                          score: 0.85,
                          reason: "Cliente demonstrou interesse imediato e tem orçamento aprovado",
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Segurança dos Webhooks</CardTitle>
                <CardDescription>Práticas recomendadas para garantir a segurança dos seus webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Validação de assinatura</h3>
                <p>
                  Para garantir que as requisições recebidas são autênticas e vêm da plataforma Agentes de Conversão,
                  você deve validar a assinatura incluída no cabeçalho <code>X-Webhook-Signature</code>.
                </p>

                <h3 className="text-lg font-medium mt-4">Como funciona</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Você configura um segredo ao criar o webhook</li>
                  <li>
                    Quando enviamos uma requisição, incluímos um cabeçalho <code>X-Webhook-Signature</code>
                  </li>
                  <li>Esta assinatura é um hash HMAC-SHA256 do corpo da requisição, usando seu segredo como chave</li>
                  <li>Sua aplicação deve calcular o mesmo hash e comparar com o valor recebido</li>
                  <li>Se os valores coincidirem, a requisição é autêntica</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplo de validação em JavaScript</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Exemplo de validação de assinatura em Node.js
const crypto = require('crypto');

function validateWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Uso em um servidor Express
app.post('/webhooks/agentes-conversao', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  const secret = 'seu_segredo_aqui';
  
  if (!validateWebhookSignature(payload, signature, secret)) {
    return res.status(401).send('Assinatura inválida');
  }
  
  // Processar o webhook...
  console.log('Evento recebido:', req.body.event);
  
  res.status(200).send('OK');
});`}
                </pre>

                <h3 className="text-lg font-medium mt-4">Outras práticas de segurança</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>HTTPS</strong>: Use sempre HTTPS para seu endpoint de webhook para garantir que os dados
                    sejam transmitidos de forma segura
                  </li>
                  <li>
                    <strong>Timeout</strong>: Implemente um timeout para evitar ataques de replay, verificando se o
                    timestamp do evento não é muito antigo
                  </li>
                  <li>
                    <strong>Idempotência</strong>: Trate os eventos de forma idempotente, pois podem ser enviados mais
                    de uma vez em caso de falhas
                  </li>
                  <li>
                    <strong>Validação de dados</strong>: Sempre valide os dados recebidos antes de processá-los
                  </li>
                  <li>
                    <strong>Logs</strong>: Mantenha logs detalhados das requisições de webhook para facilitar a
                    depuração
                  </li>
                </ul>

                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Nunca compartilhe seu segredo de webhook. Se suspeitar que ele foi comprometido, gere um novo
                    segredo imediatamente nas configurações do webhook.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tratamento de Falhas</CardTitle>
                <CardDescription>Como lidar com falhas e retentativas de webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Política de retentativas</h3>
                <p>
                  Se seu endpoint não responder com um código de status 2xx, nossa plataforma tentará reenviar o webhook
                  seguindo esta política:
                </p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tentativa</TableHead>
                      <TableHead>Atraso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1ª retentativa</TableCell>
                      <TableCell>30 segundos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2ª retentativa</TableCell>
                      <TableCell>5 minutos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3ª retentativa</TableCell>
                      <TableCell>30 minutos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4ª retentativa</TableCell>
                      <TableCell>2 horas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5ª retentativa</TableCell>
                      <TableCell>6 horas</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <p className="mt-4">
                  Após 5 retentativas sem sucesso, o webhook será marcado como falho e não será mais reenviado.
                </p>

                <h3 className="text-lg font-medium mt-4">Monitoramento de webhooks</h3>
                <p>
                  Você pode monitorar o status dos seus webhooks no painel da plataforma Agentes de Conversão, na seção
                  "Webhooks" das configurações do agente. Lá você encontrará:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Histórico de entregas</li>
                  <li>Status de cada tentativa</li>
                  <li>Códigos de resposta</li>
                  <li>Timestamps de envio</li>
                  <li>Opção para reenviar manualmente webhooks falhos</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Recomendações para alta disponibilidade</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implemente um sistema de filas para processar webhooks de forma assíncrona</li>
                  <li>Responda rapidamente às requisições, mesmo que o processamento completo seja feito depois</li>
                  <li>Implemente um sistema de fallback para casos de indisponibilidade</li>
                  <li>
                    Considere usar serviços como AWS SQS, RabbitMQ ou Kafka para garantir o processamento confiável
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  )
}
