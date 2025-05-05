import { DashboardMetrics } from "@/features/dashboard/components/dashboard-metrics"
import { RecentActivity } from "@/features/dashboard/components/recent-activity"
import { MobileSidebar } from "@/features/dashboard/components/mobile-sidebar"

export function DashboardPageContainer() {
  return (
    <>
      <MobileSidebar />
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DashboardMetrics />
        <RecentActivity />
      </div>
    </>
  )
}
