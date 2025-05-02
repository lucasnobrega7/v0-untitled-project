"use client"

export function LineChart() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Revenue Chart</p>
        <p className="text-xs text-muted-foreground">(Chart visualization would render here)</p>
      </div>
    </div>
  )
}

export function BarChart() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-md">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Users Chart</p>
        <p className="text-xs text-muted-foreground">(Chart visualization would render here)</p>
      </div>
    </div>
  )
}
