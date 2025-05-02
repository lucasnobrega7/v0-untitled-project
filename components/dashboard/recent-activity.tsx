import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    action: "created a new project",
    project: "Website Redesign",
    time: "2 hours ago",
  },
  {
    user: {
      name: "Sarah Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SS",
    },
    action: "commented on",
    project: "Mobile App",
    time: "3 hours ago",
  },
  {
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    action: "completed task in",
    project: "Dashboard Development",
    time: "5 hours ago",
  },
  {
    user: {
      name: "Emily Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EB",
    },
    action: "uploaded files to",
    project: "Marketing Campaign",
    time: "6 hours ago",
  },
  {
    user: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
    action: "invited you to",
    project: "Product Launch",
    time: "8 hours ago",
  },
]

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.project}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
