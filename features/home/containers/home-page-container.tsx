import { Hero } from "@/features/home/components/hero"
import { Features } from "@/features/home/components/features"
import { Pricing } from "@/features/home/components/pricing"
import { Testimonials } from "@/features/home/components/testimonials"
import { CTA } from "@/features/home/components/cta"
import { HomeNavbar } from "@/features/home/components/home-navbar"
import { Footer } from "@/features/home/components/footer"

export function HomePageContainer() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
