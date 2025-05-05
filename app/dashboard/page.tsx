import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardPageContainer } from "@/features/dashboard/containers/dashboard-page-container"

export default function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <DashboardPageContainer />
}
