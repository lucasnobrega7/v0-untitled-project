import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "This platform has completely transformed our approach to conversion optimization. We've seen a 40% increase in conversions since implementing their recommendations.",
    author: {
      name: "Carlos Mendes",
      role: "Marketing Director, TechBrasil",
      avatar: "/diverse-group-avatars.png",
    },
  },
  {
    quote:
      "The AI-powered insights have been invaluable for our e-commerce business. We're now able to make data-driven decisions that actually impact our bottom line.",
    author: {
      name: "Fernanda Lima",
      role: "CEO, ModaExpress",
      avatar: "/diverse-group-avatars.png",
    },
  },
  {
    quote:
      "I was skeptical at first, but the results speak for themselves. Our conversion rates have doubled in just three months of using this platform.",
    author: {
      name: "Ricardo Oliveira",
      role: "Growth Lead, StartupBR",
      avatar: "/diverse-group-avatars.png",
    },
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Don't just take our word for it. Here's what our customers have to say about our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <p className="mb-4 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.author.avatar || "/placeholder.svg"} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
