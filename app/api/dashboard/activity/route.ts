import { auth } from "@clerk/nextjs/server"

export async function GET() {
  // Check authentication
  const { userId } = auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock data - in a real app, this would come from a database
  const activities = [
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

  return Response.json(activities)
}
