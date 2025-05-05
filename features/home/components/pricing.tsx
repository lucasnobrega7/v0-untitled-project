import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started.",
    price: "R$99",
    period: "/month",
    features: ["Basic analytics dashboard", "Up to 10,000 page views", "3 conversion funnels", "Email support"],
    cta: "Get Started",
    href: "/signup?plan=starter",
  },
  {
    name: "Pro",
    description: "Ideal for growing businesses with more traffic.",
    price: "R$249",
    period: "/month",
    features: [
      "Advanced analytics dashboard",
      "Up to 100,000 page views",
      "Unlimited conversion funnels",
      "AI recommendations",
      "Priority email support",
    ],
    cta: "Get Started",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large businesses with high traffic volumes.",
    price: "R$999",
    period: "/month",
    features: [
      "Custom analytics dashboard",
      "Unlimited page views",
      "Unlimited conversion funnels",
      "Advanced AI recommendations",
      "Dedicated account manager",
      "24/7 phone & email support",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Choose the plan that's right for your business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
