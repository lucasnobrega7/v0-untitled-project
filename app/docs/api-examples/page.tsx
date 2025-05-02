import type { Metadata } from "next"
import DocsLayout from "@/components/layout/docs-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Exemplos de API | Agentes de Conversão",
  description: "Exemplos práticos de uso da API em diferentes linguagens",
}

export default function ApiExamplesPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exemplos de API</h1>
          <p className="text-muted-foreground mt-2">
            Exemplos práticos de uso da API em diferentes linguagens de programação.
          </p>
        </div>

        <Tabs defaultValue="javascript">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
          </TabsList>

          <TabsContent value="javascript" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Listar Agentes</CardTitle>
                <CardDescription>Exemplo de como listar agentes usando JavaScript/Node.js</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Usando Node.js com fetch
const API_KEY = 'sua_api_key_aqui';

async function listarAgentes() {
  try {
    const response = await fetch('https://api.agentesdeconversao.com/api/agents', {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`Erro na requisição: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Agentes:', data.agents);
    return data.agents;
  } catch (error) {
    console.error('Erro ao listar agentes:', error);
    throw error;
  }
}

// Chamada da função
listarAgentes();`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Criar Agente</CardTitle>
                <CardDescription>Exemplo de como criar um novo agente usando JavaScript/Node.js</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Usando Node.js com fetch
const API_KEY = 'sua_api_key_aqui';

async function criarAgente(dadosAgente) {
  try {
    const response = await fetch('https://api.agentesdeconversao.com/api/agents', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAgente)
    });
    
    if (!response.ok) {
      throw new Error(\`Erro na requisição: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Agente criado:', data);
    return data;
  } catch (error) {
    console.error('Erro ao criar agente:', error);
    throw error;
  }
}

// Dados do agente
const novoAgente = {
  name: 'Assistente de Vendas',
  description: 'Agente especializado em vendas',
  model: 'gpt-4',
  system_prompt: 'Você é um assistente especializado em vendas...',
  knowledge_base_ids: ['kb_123456789']
};

// Chamada da função
criarAgente(novoAgente);`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Webhook</CardTitle>
                <CardDescription>Exemplo de como configurar um webhook usando JavaScript/Node.js</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`// Usando Node.js com fetch
const API_KEY = 'sua_api_key_aqui';
const AGENT_ID = 'ag_123456789';

async function configurarWebhook(dadosWebhook) {
  try {
    const response = await fetch(\`https://api.agentesdeconversao.com/api/agents/\${AGENT_ID}/webhooks\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosWebhook)
    });
    
    if (!response.ok) {
      throw new Error(\`Erro na requisição: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Webhook configurado:', data);
    return data;
  } catch (error) {
    console.error('Erro ao configurar webhook:', error);
    throw error;
  }
}

// Dados do webhook
const novoWebhook = {
  url: 'https://example.com/webhooks/agentes-conversao',
  events: ['conversation.created', 'message.created'],
  secret: 'seu_segredo_aqui'
};

// Chamada da função
configurarWebhook(novoWebhook);`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="python" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Listar Agentes</CardTitle>
                <CardDescription>Exemplo de como listar agentes usando Python</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Usando Python com requests
import requests

API_KEY = 'sua_api_key_aqui'

def listar_agentes():
    try:
        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            'https://api.agentesdeconversao.com/api/agents',
            headers=headers
        )
        
        response.raise_for_status()  # Lança exceção para erros HTTP
        
        data = response.json()
        print('Agentes:', data['agents'])
        return data['agents']
    except requests.exceptions.RequestException as e:
        print(f'Erro ao listar agentes: {e}')
        raise

# Chamada da função
if __name__ == '__main__':
    listar_agentes()`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Criar Agente</CardTitle>
                <CardDescription>Exemplo de como criar um novo agente usando Python</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Usando Python com requests
import requests
import json

API_KEY = 'sua_api_key_aqui'

def criar_agente(dados_agente):
    try:
        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.post(
            'https://api.agentesdeconversao.com/api/agents',
            headers=headers,
            data=json.dumps(dados_agente)
        )
        
        response.raise_for_status()  # Lança exceção para erros HTTP
        
        data = response.json()
        print('Agente criado:', data)
        return data
    except requests.exceptions.RequestException as e:
        print(f'Erro ao criar agente: {e}')
        raise

# Dados do agente
novo_agente = {
    'name': 'Assistente de Vendas',
    'description': 'Agente especializado em vendas',
    'model': 'gpt-4',
    'system_prompt': 'Você é um assistente especializado em vendas...',
    'knowledge_base_ids': ['kb_123456789']
}

# Chamada da função
if __name__ == '__main__':
    criar_agente(novo_agente)`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Webhook</CardTitle>
                <CardDescription>Exemplo de como configurar um webhook usando Python</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Usando Python com requests
import requests
import json

API_KEY = 'sua_api_key_aqui'
AGENT_ID = 'ag_123456789'

def configurar_webhook(dados_webhook):
    try:
        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.post(
            f'https://api.agentesdeconversao.com/api/agents/{AGENT_ID}/webhooks',
            headers=headers,
            data=json.dumps(dados_webhook)
        )
        
        response.raise_for_status()  # Lança exceção para erros HTTP
        
        data = response.json()
        print('Webhook configurado:', data)
        return data
    except requests.exceptions.RequestException as e:
        print(f'Erro ao configurar webhook: {e}')
        raise

# Dados do webhook
novo_webhook = {
    'url': 'https://example.com/webhooks/agentes-conversao',
    'events': ['conversation.created', 'message.created'],
    'secret': 'seu_segredo_aqui'
}

# Chamada da função
if __name__ == '__main__':
    configurar_webhook(novo_webhook)`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curl" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Listar Agentes</CardTitle>
                <CardDescription>Exemplo de como listar agentes usando cURL</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Listar agentes com cURL
curl -X GET \\
  https://api.agentesdeconversao.com/api/agents \\
  -H 'Authorization: Bearer sua_api_key_aqui' \\
  -H 'Content-Type: application/json'`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Criar Agente</CardTitle>
                <CardDescription>Exemplo de como criar um novo agente usando cURL</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Criar agente com cURL
curl -X POST \\
  https://api.agentesdeconversao.com/api/agents \\
  -H 'Authorization: Bearer sua_api_key_aqui' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Assistente de Vendas",
    "description": "Agente especializado em vendas",
    "model": "gpt-4",
    "system_prompt": "Você é um assistente especializado em vendas...",
    "knowledge_base_ids": ["kb_123456789"]
  }'`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Webhook</CardTitle>
                <CardDescription>Exemplo de como configurar um webhook usando cURL</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`# Configurar webhook com cURL
curl -X POST \\
  https://api.agentesdeconversao.com/api/agents/ag_123456789/webhooks \\
  -H 'Authorization: Bearer sua_api_key_aqui' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "url": "https://example.com/webhooks/agentes-conversao",
    "events": ["conversation.created", "message.created"],
    "secret": "seu_segredo_aqui"
  }'`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="php" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Listar Agentes</CardTitle>
                <CardDescription>Exemplo de como listar agentes usando PHP</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`<?php
// Usando PHP com cURL
$api_key = 'sua_api_key_aqui';

function listarAgentes($api_key) {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, 'https://api.agentesdeconversao.com/api/agents');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        echo 'Erro cURL: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }
    
    curl_close($ch);
    
    if ($http_code >= 400) {
        echo 'Erro na requisição: ' . $http_code;
        return false;
    }
    
    $data = json_decode($response, true);
    echo "Agentes:\\n";
    print_r($data['agents']);
    return $data['agents'];
}

// Chamada da função
listarAgentes($api_key);`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Criar Agente</CardTitle>
                <CardDescription>Exemplo de como criar um novo agente usando PHP</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`<?php
// Usando PHP com cURL
$api_key = 'sua_api_key_aqui';

function criarAgente($api_key, $dados_agente) {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, 'https://api.agentesdeconversao.com/api/agents');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dados_agente));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        echo 'Erro cURL: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }
    
    curl_close($ch);
    
    if ($http_code >= 400) {
        echo 'Erro na requisição: ' . $http_code;
        return false;
    }
    
    $data = json_decode($response, true);
    echo "Agente criado:\\n";
    print_r($data);
    return $data;
}

// Dados do agente
$novo_agente = [
    'name' => 'Assistente de Vendas',
    'description' => 'Agente especializado em vendas',
    'model' => 'gpt-4',
    'system_prompt' => 'Você é um assistente especializado em vendas...',
    'knowledge_base_ids' => ['kb_123456789']
];

// Chamada da função
criarAgente($api_key, $novo_agente);`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurar Webhook</CardTitle>
                <CardDescription>Exemplo de como configurar um webhook usando PHP</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  {`<?php
// Usando PHP com cURL
$api_key = 'sua_api_key_aqui';
$agent_id = 'ag_123456789';

function configurarWebhook($api_key, $agent_id, $dados_webhook) {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, "https://api.agentesdeconversao.com/api/agents/{$agent_id}/webhooks");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dados_webhook));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        echo 'Erro cURL: ' . curl_error($ch);
        curl_close($ch);
        return false;
    }
    
    curl_close($ch);
    
    if ($http_code >= 400) {
        echo 'Erro na requisição: ' . $http_code;
        return false;
    }
    
    $data = json_decode($response, true);
    echo "Webhook configurado:\\n";
    print_r($data);
    return $data;
}

// Dados do webhook
$novo_webhook = [
    'url' => 'https://example.com/webhooks/agentes-conversao',
    'events' => ['conversation.created', 'message.created'],
    'secret' => 'seu_segredo_aqui'
];

// Chamada da função
configurarWebhook($api_key, $agent_id, $novo_webhook);`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DocsLayout>
  )
}
