import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Maximize Your Conversion Rates
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our AI-powered platform helps you optimize your website for maximum conversions. Get insights,
                recommendations, and automated improvements.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?key=y87ww"
                width={800}
                height={600}
                alt="Dashboard preview"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
