import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: 1,
    user: {
      name: "João Silva",
      email: "joao@example.com",
      avatar: "/diverse-group-avatars.png",
    },
    action: "signed up for a trial",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Maria Oliveira",
      email: "maria@example.com",
      avatar: "/diverse-group-avatars.png",
    },
    action: "upgraded to Pro plan",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    user: {
      name: "Carlos Santos",
      email: "carlos@example.com",
      avatar: "/diverse-group-avatars.png",
    },
    action: "submitted a support ticket",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Ana Pereira",
      email: "ana@example.com",
      avatar: "/diverse-group-avatars.png",
    },
    action: "created a new campaign",
    timestamp: "5 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user activities across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{activity.timestamp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
