"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ApiReferenceClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Referência da API</h1>
        <p className="text-muted-foreground mt-2">
          Documentação completa de todos os endpoints disponíveis na API Agentes de Conversão.
        </p>
      </div>

      <Tabs defaultValue="agents">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="agents">Agentes</TabsTrigger>
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="knowledge">Conhecimento</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listar Agentes</CardTitle>
              <CardDescription>Retorna uma lista de todos os agentes disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-500">GET</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/agents</code>
              </div>

              <h4 className="text-sm font-medium mb-2">Parâmetros de Query</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parâmetro</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>limit</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>Número máximo de agentes a retornar (padrão: 10)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>offset</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>Número de agentes a pular (padrão: 0)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    agents: [
                      {
                        id: "ag_123456789",
                        name: "Assistente de Vendas",
                        description: "Agente especializado em vendas",
                        created_at: "2023-01-01T00:00:00Z",
                      },
                    ],
                    total: 1,
                    limit: 10,
                    offset: 0,
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Criar Agente</CardTitle>
              <CardDescription>Cria um novo agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-500">POST</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/agents</code>
              </div>

              <h4 className="text-sm font-medium mb-2">Corpo da Requisição</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    name: "Assistente de Vendas",
                    description: "Agente especializado em vendas",
                    model: "gpt-4",
                    system_prompt: "Você é um assistente especializado em vendas...",
                    knowledge_base_ids: ["kb_123456789"],
                  },
                  null,
                  2,
                )}
              </pre>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: "ag_123456789",
                    name: "Assistente de Vendas",
                    description: "Agente especializado em vendas",
                    model: "gpt-4",
                    system_prompt: "Você é um assistente especializado em vendas...",
                    knowledge_base_ids: ["kb_123456789"],
                    created_at: "2023-01-01T00:00:00Z",
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listar Conversas</CardTitle>
              <CardDescription>Retorna uma lista de todas as conversas de um agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-500">GET</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/agents/{"{agent_id}"}/conversations
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Parâmetros de Path</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parâmetro</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>agent_id</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>ID do agente</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    conversations: [
                      {
                        id: "conv_123456789",
                        agent_id: "ag_123456789",
                        title: "Conversa com cliente",
                        created_at: "2023-01-01T00:00:00Z",
                        updated_at: "2023-01-01T00:10:00Z",
                      },
                    ],
                    total: 1,
                    limit: 10,
                    offset: 0,
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listar Ferramentas HTTP</CardTitle>
              <CardDescription>Retorna uma lista de todas as ferramentas HTTP de um agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-500">GET</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/http-tools/{"{agent_uuid}"}/list
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Parâmetros de Path</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parâmetro</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>agent_uuid</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>UUID do agente</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    tools: [
                      {
                        id: "tool_123456789",
                        agent_id: "ag_123456789",
                        name: "Buscar Produto",
                        description: "Busca informações de um produto",
                        url: "https://api.example.com/products",
                        method: "GET",
                        created_at: "2023-01-01T00:00:00Z",
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Criar Ferramenta HTTP</CardTitle>
              <CardDescription>Cria uma nova ferramenta HTTP para um agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-500">POST</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/agents/{"{id}"}/tools/http
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Corpo da Requisição</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    name: "Buscar Produto",
                    description: "Busca informações de um produto",
                    url: "https://api.example.com/products",
                    method: "GET",
                    headers: {
                      Authorization: "Bearer {{API_KEY}}",
                    },
                    parameters: [
                      {
                        name: "product_id",
                        description: "ID do produto",
                        required: true,
                        type: "string",
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: "tool_123456789",
                    agent_id: "ag_123456789",
                    name: "Buscar Produto",
                    description: "Busca informações de um produto",
                    url: "https://api.example.com/products",
                    method: "GET",
                    headers: {
                      Authorization: "Bearer {{API_KEY}}",
                    },
                    parameters: [
                      {
                        name: "product_id",
                        description: "ID do produto",
                        required: true,
                        type: "string",
                      },
                    ],
                    created_at: "2023-01-01T00:00:00Z",
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listar Webhooks</CardTitle>
              <CardDescription>Retorna uma lista de todos os webhooks de um agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-500">GET</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/agents/{"{id}"}/webhooks
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Parâmetros de Path</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parâmetro</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>ID do agente</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    webhooks: [
                      {
                        id: "wh_123456789",
                        agent_id: "ag_123456789",
                        url: "https://example.com/webhook",
                        events: ["conversation.created", "message.created"],
                        created_at: "2023-01-01T00:00:00Z",
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Criar Webhook</CardTitle>
              <CardDescription>Cria um novo webhook para um agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-500">POST</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/agents/{"{id}"}/webhooks
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Corpo da Requisição</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    url: "https://example.com/webhook",
                    events: ["conversation.created", "message.created"],
                    secret: "webhook_secret",
                  },
                  null,
                  2,
                )}
              </pre>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: "wh_123456789",
                    agent_id: "ag_123456789",
                    url: "https://example.com/webhook",
                    events: ["conversation.created", "message.created"],
                    created_at: "2023-01-01T00:00:00Z",
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Listar Bases de Conhecimento</CardTitle>
              <CardDescription>Retorna uma lista de todas as bases de conhecimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-500">GET</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/knowledge
                </code>
              </div>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    knowledge_bases: [
                      {
                        id: "kb_123456789",
                        name: "Documentação de Produtos",
                        description: "Base de conhecimento com documentação de produtos",
                        created_at: "2023-01-01T00:00:00Z",
                      },
                    ],
                    total: 1,
                    limit: 10,
                    offset: 0,
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fazer Upload de Documento</CardTitle>
              <CardDescription>Faz upload de um documento para uma base de conhecimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-500">POST</Badge>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/knowledge/upload
                </code>
              </div>

              <h4 className="text-sm font-medium mb-2">Corpo da Requisição</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Envie um formulário multipart/form-data com os seguintes campos:
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>file</TableCell>
                    <TableCell>file</TableCell>
                    <TableCell>Arquivo a ser enviado (PDF, DOCX, TXT)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>knowledge_base_id</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>ID da base de conhecimento</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h4 className="text-sm font-medium mt-4 mb-2">Resposta</h4>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: "doc_123456789",
                    knowledge_base_id: "kb_123456789",
                    filename: "manual.pdf",
                    status: "processing",
                    created_at: "2023-01-01T00:00:00Z",
                  },
                  null,
                  2,
                )}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
