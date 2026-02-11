import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Heart } from "lucide-react"

const About = () => {
  return (
    <div className="w-full py-12 px-4">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">About Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="mb-2 text-xl font-semibold">Meet the Developer</h2>
              <p className="text-muted-foreground">
                Hello! I'm Ansh Bhatt, the developer behind this website that helps you calculate 
                and reduce your carbon footprint. I'm passionate about environmental sustainability 
                and believe that technology can play a vital role in making the world a greener 
                and cleaner place.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold">Our Vision</h2>
              <p className="mb-2 font-medium">Creating a Greener Future</p>
              <p className="text-muted-foreground">
                Our goal is to empower individuals and businesses to take actionable steps towards 
                reducing their carbon footprint. We believe that by raising awareness and providing 
                practical solutions, we can collectively make a significant impact on the environment.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold">The Website</h2>
              <p className="mb-2 font-medium">Carbon Footprint Calculator</p>
              <p className="text-muted-foreground">
                Our website features a user-friendly carbon footprint calculator. It allows you to 
                input various aspects of your daily life, such as energy usage, transportation habits, 
                and more. Based on your inputs, we provide an estimate of your carbon footprint.
              </p>
            </div>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Get Involved
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 font-medium">Join Our Community</p>
                  <p className="text-muted-foreground">
                    We're building a community of like-minded individuals who are committed to 
                    sustainability. Join us on social media, participate in discussions, and share 
                    your eco-friendly achievements and ideas with others.
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-medium">Feedback</p>
                  <p className="text-muted-foreground">
                    We value your feedback and suggestions. If you have ideas for improving our 
                    website or have topics you'd like us to cover, please reach out to us.
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-medium">Spread the Word</p>
                  <p className="text-muted-foreground">
                    Environmental responsibility is a collective effort. Help us spread the word 
                    about our website and the importance of reducing carbon footprints.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>
                Have questions? Reach us at{" "}
                <a href="mailto:anshbhatt140@email.com" className="text-primary hover:underline">
                  anshbhatt140@email.com
                </a>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About

