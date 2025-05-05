import { AuthCheck } from "@/components/auth/auth-check"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { HelpCenter } from "@/components/dashboard/help-center"

export default function HelpPage() {
  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Central de Ajuda</h1>
          </div>

          <HelpCenter />
        </div>
      </DashboardLayout>
    </AuthCheck>
  )
}
