"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function HttpToolsClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HTTP Tools</h1>
        <p className="text-muted-foreground mt-2">
          Integre seus agentes com ferramentas externas via HTTP para expandir suas capacidades e funcionalidades.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          As ferramentas HTTP permitem que seus agentes interajam com APIs externas, sistemas e serviços web para obter
          informações ou executar ações.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="configuration">Configuração</TabsTrigger>
          <TabsTrigger value="examples">Exemplos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>O que são HTTP Tools?</CardTitle>
              <CardDescription>Entenda como as ferramentas HTTP funcionam com seus agentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                As HTTP Tools são integrações que permitem que seus agentes de IA façam requisições HTTP para APIs
                externas, obtendo dados ou executando ações em sistemas externos. Isso expande significativamente as
                capacidades dos seus agentes, permitindo que eles:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Busquem informações em tempo real de APIs externas</li>
                <li>Executem ações em sistemas externos (CRMs, ERPs, etc.)</li>
                <li>Integrem-se com serviços de terceiros</li>
                <li>Acessem dados específicos da sua empresa</li>
                <li>Automatizem fluxos de trabalho complexos</li>
              </ul>

              <h3 className="text-lg font-medium mt-4">Como funciona</h3>
              <p>
                Quando configurada, uma ferramenta HTTP fica disponível para o agente durante as conversas. O agente
                pode decidir quando usar a ferramenta com base no contexto da conversa e nas necessidades do usuário. O
                processo funciona da seguinte forma:
              </p>

              <ol className="list-decimal pl-6 space-y-2">
                <li>O usuário faz uma pergunta ou solicitação ao agente</li>
                <li>O agente identifica que precisa de informações externas</li>
                <li>O agente executa a ferramenta HTTP configurada</li>
                <li>A plataforma faz a requisição HTTP para o endpoint configurado</li>
                <li>A resposta é processada e retornada ao agente</li>
                <li>O agente utiliza as informações para responder ao usuário</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefícios</CardTitle>
              <CardDescription>Vantagens de utilizar HTTP Tools com seus agentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Acesso a dados em tempo real</h3>
                  <p className="text-sm text-muted-foreground">
                    Seus agentes podem acessar informações atualizadas de sistemas externos, garantindo respostas
                    precisas e contextualizadas.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Automação de processos</h3>
                  <p className="text-sm text-muted-foreground">
                    Permita que seus agentes executem ações em sistemas externos, automatizando tarefas e processos de
                    negócio.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Personalização avançada</h3>
                  <p className="text-sm text-muted-foreground">
                    Adapte seus agentes às necessidades específicas do seu negócio, integrando-os com seus sistemas e
                    fluxos de trabalho existentes.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Experiência do usuário aprimorada</h3>
                  <p className="text-sm text-muted-foreground">
                    Ofereça uma experiência mais completa e útil aos seus usuários, com agentes capazes de fornecer
                    informações específicas e executar ações.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurando uma HTTP Tool</CardTitle>
              <CardDescription>Passo a passo para configurar uma ferramenta HTTP para seu agente</CardDescription>
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
                    <TableCell>Nome</TableCell>
                    <TableCell>Nome descritivo da ferramenta</TableCell>
                    <TableCell>Sim</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Descrição detalhada da funcionalidade da ferramenta</TableCell>
                    <TableCell>Sim</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>URL</TableCell>
                    <TableCell>Endpoint da API que será chamado</TableCell>
                    <TableCell>Sim</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Método</TableCell>
                    <TableCell>Método HTTP (GET, POST, PUT, DELETE, etc.)</TableCell>
                    <TableCell>Sim</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Headers</TableCell>
                    <TableCell>Cabeçalhos HTTP a serem enviados com a requisição</TableCell>
                    <TableCell>Não</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Parâmetros</TableCell>
                    <TableCell>Parâmetros que o agente pode fornecer ao chamar a ferramenta</TableCell>
                    <TableCell>Não</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h3 className="text-lg font-medium mt-4">Configuração de parâmetros</h3>
              <p>
                Os parâmetros permitem que o agente forneça dados dinâmicos para a requisição HTTP. Para cada parâmetro,
                você deve configurar:
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Atributo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Nome do parâmetro (usado na URL ou corpo da requisição)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Descrição clara do que o parâmetro representa</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Tipo de dado (string, number, boolean, etc.)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Obrigatório</TableCell>
                    <TableCell>Se o parâmetro é obrigatório ou opcional</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Localização</TableCell>
                    <TableCell>Onde o parâmetro deve ser incluído (query, path, body)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>Configurando autenticação para suas ferramentas HTTP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Para APIs que requerem autenticação, você pode configurar os cabeçalhos de autenticação ou incluir
                tokens de acesso na URL ou no corpo da requisição.
              </p>

              <h3 className="text-lg font-medium">Métodos comuns de autenticação</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium">API Key</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {`// Como cabeçalho
{
  "headers": {
    "X-API-Key": "sua_api_key_aqui"
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-md font-medium">Bearer Token</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {`// Como cabeçalho
{
  "headers": {
    "Authorization": "Bearer seu_token_aqui"
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-md font-medium">Basic Auth</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    {`// Como cabeçalho
{
  "headers": {
    "Authorization": "Basic base64(username:password)"
  }
}`}
                  </pre>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Segurança</AlertTitle>
                <AlertDescription>
                  Nunca compartilhe suas credenciais de API diretamente. Use variáveis de ambiente ou o gerenciador de
                  segredos da plataforma para armazenar informações sensíveis.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Exemplo: Busca de Produtos</CardTitle>
              <CardDescription>Configuração de uma ferramenta HTTP para buscar produtos em uma API</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    name: "Buscar Produto",
                    description: "Busca informações detalhadas de um produto pelo ID",
                    url: "https://api.example.com/products/{product_id}",
                    method: "GET",
                    headers: {
                      Authorization: "Bearer {{API_KEY}}",
                      "Content-Type": "application/json",
                    },
                    parameters: [
                      {
                        name: "product_id",
                        description: "ID único do produto",
                        type: "string",
                        required: true,
                        location: "path",
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>

              <h3 className="text-lg font-medium mt-4">Como o agente usaria</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">Usuário:</p>
                <p className="mb-4">Quais são as especificações do produto ABC123?</p>

                <p className="font-medium">Agente (pensamento interno):</p>
                <p className="mb-4 text-muted-foreground italic">
                  Preciso buscar informações sobre o produto ABC123. Vou usar a ferramenta "Buscar Produto" com o
                  parâmetro product_id = "ABC123".
                </p>

                <p className="font-medium">Agente (executa a ferramenta):</p>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto mb-4 border">
                  {JSON.stringify(
                    {
                      id: "ABC123",
                      name: "Smartphone XYZ",
                      price: 999.99,
                      specifications: {
                        screen: "6.5 inches",
                        processor: "Octa-core",
                        memory: "8GB RAM",
                        storage: "128GB",
                      },
                    },
                    null,
                    2,
                  )}
                </pre>

                <p className="font-medium">Agente (resposta ao usuário):</p>
                <p>
                  O produto ABC123 é o Smartphone XYZ, com preço de R$ 999,99. Suas especificações incluem tela de 6.5
                  polegadas, processador Octa-core, 8GB de RAM e 128GB de armazenamento.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exemplo: Criação de Ticket</CardTitle>
              <CardDescription>
                Configuração de uma ferramenta HTTP para criar tickets em um sistema de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    name: "Criar Ticket",
                    description: "Cria um novo ticket no sistema de suporte",
                    url: "https://api.example.com/tickets",
                    method: "POST",
                    headers: {
                      Authorization: "Bearer {{SUPPORT_API_KEY}}",
                      "Content-Type": "application/json",
                    },
                    parameters: [
                      {
                        name: "title",
                        description: "Título do ticket",
                        type: "string",
                        required: true,
                        location: "body",
                      },
                      {
                        name: "description",
                        description: "Descrição detalhada do problema",
                        type: "string",
                        required: true,
                        location: "body",
                      },
                      {
                        name: "priority",
                        description: "Prioridade do ticket (low, medium, high)",
                        type: "string",
                        required: false,
                        location: "body",
                      },
                    ],
                  },
                  null,
                  2,
                )}
              </pre>

              <h3 className="text-lg font-medium mt-4">Como o agente usaria</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">Usuário:</p>
                <p className="mb-4">Preciso abrir um ticket porque meu sistema está fora do ar desde ontem.</p>

                <p className="font-medium">Agente (pensamento interno):</p>
                <p className="mb-4 text-muted-foreground italic">
                  O usuário precisa abrir um ticket de suporte. Vou usar a ferramenta "Criar Ticket" com os parâmetros
                  apropriados. Como é um sistema fora do ar, vou definir prioridade alta.
                </p>

                <p className="font-medium">Agente (executa a ferramenta):</p>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto mb-4 border">
                  {JSON.stringify(
                    {
                      ticket_id: "T12345",
                      status: "created",
                      created_at: "2023-05-02T14:30:00Z",
                    },
                    null,
                    2,
                  )}
                </pre>

                <p className="font-medium">Agente (resposta ao usuário):</p>
                <p>
                  Criei um ticket para você com o número T12345. Sua solicitação foi registrada com prioridade alta e
                  nossa equipe de suporte entrará em contato o mais breve possível para resolver o problema do sistema
                  fora do ar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
