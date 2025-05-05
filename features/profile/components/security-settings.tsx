"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function SecuritySettings() {
  const { openUserProfile } = useClerk()
  const router = useRouter()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your security settings and connected accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1">
          <h3 className="font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">Change your password or enable two-factor authentication.</p>
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="font-medium">Connected Accounts</h3>
          <p className="text-sm text-muted-foreground">Manage your connected accounts and social logins.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => openUserProfile()}>Manage security settings</Button>
      </CardFooter>
    </Card>
  )
}
