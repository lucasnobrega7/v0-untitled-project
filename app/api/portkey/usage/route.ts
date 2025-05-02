import { type NextRequest, NextResponse } from "next/server"
import { getUsageMetrics } from "@/lib/portkey"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const timeframe = searchParams.get("timeframe") || "7d"

  try {
    const usageData = await getUsageMetrics(timeframe as string)

    // Process the data for the frontend - this would need to be adapted
    // based on the actual structure returned by the Portkey SDK
    const processedData = {
      totalRequests: usageData.totalRequests || 0,
      totalTokens: usageData.totalTokens || 0,
      totalCost: usageData.totalCost || 0,
      providers: usageData.providers || [],
    }

    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error fetching Portkey usage:", error)
    return NextResponse.json({ error: "Failed to fetch Portkey usage data" }, { status: 500 })
  }
}
