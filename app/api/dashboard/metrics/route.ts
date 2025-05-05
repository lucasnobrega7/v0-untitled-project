import { auth } from "@clerk/nextjs/server"

export async function GET() {
  // Check authentication
  const { userId } = auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock data - in a real app, this would come from a database
  const metrics = {
    revenue: 45231.89,
    revenueChange: 20.1,
    subscriptions: 2350,
    subscriptionsChange: 180.1,
    conversionRate: 3.2,
    conversionRateChange: -1.1,
    activeUsers: 12234,
    activeUsersChange: 19,
  }

  return Response.json(metrics)
}
