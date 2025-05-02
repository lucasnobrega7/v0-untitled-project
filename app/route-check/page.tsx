import DocsLayout from "@/components/layout/docs-layout"
import RouteCheck from "@/components/route-check"

export default function RouteCheckPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verificação de Rotas</h1>
          <p className="text-muted-foreground mt-2">
            Esta página verifica se todas as rotas da documentação estão acessíveis.
          </p>
        </div>
        <RouteCheck />
      </div>
    </DocsLayout>
  )
}
