import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GridPattern } from "@/components/ui/grid-pattern"

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-20">
        <GridPattern
          className="absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"
          yOffset={-96}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [4, 4],
          ]}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Carbon Footprint
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Calculate your carbon footprint with us and take actionable steps towards a sustainable future
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/calculate">
              <Button size="lg" className="group">
                Calculate Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

