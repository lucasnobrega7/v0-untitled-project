import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function UpgradePlan() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Storage</p>
          <p className="text-sm text-muted-foreground">75% (15GB/20GB)</p>
        </div>
        <Progress value={75} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Users</p>
          <p className="text-sm text-muted-foreground">8/10</p>
        </div>
        <Progress value={80} className="h-2" />
      </div>

      <div className="rounded-lg border bg-muted/50 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Pro Plan</p>
            <p className="text-xs text-muted-foreground">$29/month per user</p>
          </div>
          <p className="text-xs font-medium">Current</p>
        </div>
      </div>

      <div className="rounded-lg border p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enterprise Plan</p>
            <p className="text-xs text-muted-foreground">$49/month per user</p>
          </div>
          <Button size="sm" className="h-7">
            Upgrade
          </Button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" />
            <span>Unlimited storage</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" />
            <span>Unlimited users</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" />
            <span>Advanced security</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-primary" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  )
}
