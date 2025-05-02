"use client"

import DocsLayout from "@/components/layout/docs-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

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
                  <li>Integrar com ferramentas de terceiros como N8N, Zapier ou Make</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurando um Webhook</CardTitle>
                <CardDescription>Passo a passo para configurar webhooks para seus agentes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Parâmetros de configuração</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parâmetro</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Obrigatório</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>URL</TableCell>
                      <TableCell>Endpoint que receberá as notificações de eventos</TableCell>
                      <TableCell>Sim</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Eventos</TableCell>
                      <TableCell>Lista de eventos que acionarão o webhook</TableCell>
                      <TableCell>Sim</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Secret</TableCell>
                      <TableCell>Chave secreta para verificar a autenticidade das requisições</TableCell>
                      <TableCell>Recomendado</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Descrição opcional para identificar o propósito do webhook</TableCell>
                      <TableCell>Não</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-4">Exemplo de configuração</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(
                    {
                      url: "https://example.com/webhooks/agentes-conversao",
                      events: ["conversation.created", "message.created", "conversation.closed"],
                      secret: "seu_segredo_aqui",
                      description: "Webhook para integração com CRM",
                    },
                    null,
                    2,
                  )}
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
                      <TableHead>Payload</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>conversation.created</TableCell>
                      <TableCell>Uma nova conversa foi iniciada</TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer" onClick={() => {}}>
                          Ver exemplo
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>conversation.closed</TableCell>
                      <TableCell>Uma conversa foi encerrada</TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer" onClick={() => {}}>
                          Ver exemplo
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>message.created</TableCell>
                      <TableCell>Uma nova mensagem foi enviada</TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer" onClick={() => {}}>
                          Ver exemplo
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>agent.action</TableCell>
                      <TableCell>O agente executou uma ação</TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer" onClick={() => {}}>
                          Ver exemplo
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>tool.executed</TableCell>
                      <TableCell>Uma ferramenta foi executada pelo agente</TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer" onClick={() => {}}>
                          Ver exemplo
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Exemplo de payload: conversation.created</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                  {JSON.stringify(
                    {
                      event: "conversation.created",
                      timestamp: "2023-05-02T14:30:00Z",
                      data: {
                        conversation_id: "conv_123456789",
                        agent_id: "ag_123456789",
                        title: "Nova conversa com cliente",
                        created_at: "2023-05-02T14:30:00Z",
                        metadata: {
                          source: "website",
                          user_id: "user_123456789",
                        },
                      },
                    },
                    null,
                    2,
                  )}
                </pre>

                <h3 className="text-lg font-medium mt-6">Exemplo de payload: message.created</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                  {JSON.stringify(
                    {
                      event: "message.created",
                      timestamp: "2023-05-02T14:32:00Z",
                      data: {
                        message_id: "msg_123456789",
                        conversation_id: "conv_123456789",
                        agent_id: "ag_123456789",
                        role: "user",
                        content: "Olá, preciso de ajuda com meu pedido",
                        created_at: "2023-05-02T14:32:00Z",
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tratamento de Eventos</CardTitle>
                <CardDescription>Como processar eventos recebidos via webhook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Processamento de eventos</h3>
                <p>Ao receber um evento via webhook, sua aplicação deve:</p>

                <ol className="list-decimal pl-6 space-y-2">
                  <li>Verificar a assinatura do webhook para garantir autenticidade (se configurado)</li>
                  <li>Responder rapidamente com um código de status 2xx para confirmar o recebimento</li>
                  <li>Processar o evento de forma assíncrona para evitar timeouts</li>
                  <li>Implementar lógica de retry para lidar com falhas temporárias</li>
                </ol>

                <h3 className="text-lg font-medium mt-4">Exemplo de código (Node.js)</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Exemplo de endpoint para receber webhooks
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

app.post('/webhooks/agentes-conversao', (req, res) => {
  // 1. Verificar assinatura (se configurado)
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  const secret = 'seu_segredo_aqui';
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  if (signature !== expectedSignature) {
    return res.status(401).send('Assinatura inválida');
  }
  
  // 2. Responder rapidamente
  res.status(200).send('Evento recebido');
  
  // 3. Processar o evento de forma assíncrona
  setImmediate(() => {
    const { event, data } = req.body;
    
    switch (event) {
      case 'conversation.created':
        handleNewConversation(data);
        break;
      case 'message.created':
        handleNewMessage(data);
        break;
      // Outros eventos...
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor webhook rodando na porta 3000');
});`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Segurança de Webhooks</CardTitle>
                <CardDescription>Práticas recomendadas para garantir a segurança dos seus webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Verificação de assinatura</h3>
                <p>
                  Para garantir que as requisições de webhook são autênticas e vêm da nossa plataforma, recomendamos
                  verificar a assinatura incluída no cabeçalho de cada requisição.
                </p>

                <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                  {`// Exemplo de verificação de assinatura em Node.js
const crypto = require('crypto');

function verificarAssinatura(payload, assinatura, segredo) {
  const assinaturaCalculada = crypto
    .createHmac('sha256', segredo)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(assinatura),
    Buffer.from(assinaturaCalculada)
  );
}`}
                </pre>

                <h3 className="text-lg font-medium mt-4">Melhores práticas de segurança</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sempre use HTTPS para seus endpoints de webhook</li>
                  <li>Verifique a assinatura de cada requisição recebida</li>
                  <li>Mantenha seu segredo de webhook seguro e não o compartilhe</li>
                  <li>Implemente rate limiting para evitar sobrecarga</li>
                  <li>Processe eventos de forma idempotente para evitar duplicações</li>
                  <li>Monitore falhas e implemente alertas para problemas persistentes</li>
                </ul>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Se você suspeitar que seu segredo de webhook foi comprometido, gere um novo imediatamente através do
                    painel de controle ou da API.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tratamento de Falhas</CardTitle>
                <CardDescription>Como lidar com falhas na entrega de webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nossa plataforma implementa um sistema de retry para garantir a entrega confiável de eventos. Se seu
                  endpoint não responder com um código de status 2xx, tentaremos novamente seguindo esta política:
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
                      <TableCell>1ª tentativa</TableCell>
                      <TableCell>Imediato</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2ª tentativa</TableCell>
                      <TableCell>5 segundos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3ª tentativa</TableCell>
                      <TableCell>30 segundos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4ª tentativa</TableCell>
                      <TableCell>2 minutos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5ª tentativa</TableCell>
                      <TableCell>10 minutos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>6ª tentativa</TableCell>
                      <TableCell>30 minutos</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>7ª tentativa</TableCell>
                      <TableCell>1 hora</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <p className="mt-4">
                  Após 7 tentativas sem sucesso, o evento será marcado como falho e não será mais tentado. Você pode
                  visualizar eventos falhos no painel de controle e solicitar o reenvio manual se necessário.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  )
}
