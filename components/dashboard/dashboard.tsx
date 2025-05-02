"use client"

import { useState } from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import StatsCard from "./stats-card"
import RecentActivity from "./recent-activity"
import UpgradePlan from "./upgrade-plan"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart } from "./charts"

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid gap-4 md:gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" />
              <StatsCard title="Subscriptions" value="2,431" change="+12.5%" trend="up" />
              <StatsCard title="Active Users" value="1,893" change="+4.3%" trend="up" />
              <StatsCard title="Churn Rate" value="0.8%" change="-0.3%" trend="down" />
            </div>

            <Card className="mt-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>Automated analysis of your dashboard data</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm">
                    Based on your current metrics, your business is showing strong growth with a 20.1% increase in
                    revenue. Your subscription base has grown by 12.5%, indicating good product-market fit. Consider
                    focusing on reducing the churn rate further to maximize customer lifetime value.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-5">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>View your revenue and user growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="revenue">
                    <TabsList className="mb-4">
                      <TabsTrigger value="revenue">Revenue</TabsTrigger>
                      <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>
                    <TabsContent value="revenue" className="h-[300px]">
                      <LineChart />
                    </TabsContent>
                    <TabsContent value="users" className="h-[300px]">
                      <BarChart />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Plan Usage</CardTitle>
                  <CardDescription>Your current plan usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpgradePlan />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions from your users</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <button className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <div className="font-medium">New Project</div>
                      <div className="text-xs text-muted-foreground">Create a new project</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <div className="font-medium">Invite Team</div>
                      <div className="text-xs text-muted-foreground">Add team members</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-settings"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-muted-foreground">Manage your account</div>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
