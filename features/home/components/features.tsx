import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bot, LineChart, Zap } from "lucide-react"

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Advanced Analytics",
    description: "Get detailed insights into your website's performance with our advanced analytics tools.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI Recommendations",
    description: "Our AI analyzes your data and provides personalized recommendations to improve conversions.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Automated Optimization",
    description: "Automatically optimize your website based on real-time data and user behavior.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Conversion Tracking",
    description: "Track conversions across your entire funnel and identify opportunities for improvement.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our platform offers everything you need to optimize your conversion rates.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 pt-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn more about our {feature.title.toLowerCase()} features and how they can help your business.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
