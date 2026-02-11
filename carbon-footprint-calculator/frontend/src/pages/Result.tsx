import { useLocation, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, ArrowLeft } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { CarbonBreakdown } from "./Calculate"

const Result = () => {
  const location = useLocation()
  const state = location.state as { carbon?: CarbonBreakdown } | null
  const carbon = state?.carbon

  const chartData = carbon
    ? [
        { name: "LPG", value: Math.round(carbon.lpg * 10) / 10 },
        { name: "Petrol", value: Math.round(carbon.petrol * 10) / 10 },
        { name: "Electricity", value: Math.round(carbon.electricity * 10) / 10 },
        { name: "Diesel", value: Math.round(carbon.diesel * 10) / 10 },
      ]
    : [
        { name: "LPG", value: 0 },
        { name: "Petrol", value: 0 },
        { name: "Electricity", value: 0 },
        { name: "Diesel", value: 0 },
      ]

  const total = carbon ? Math.round(carbon.total * 10) / 10 : 0

  return (
    <div className="w-full py-12 px-4">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Link to="/calculate">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-primary" />
              Your Carbon Footprint Calculation
            </CardTitle>
            <CardDescription>Breakdown of your daily carbon emissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Total Carbon Footprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-4 text-5xl font-bold text-primary">
                {total} <span className="text-2xl text-muted-foreground">kg CO₂</span>
              </div>
              <p className="text-muted-foreground">
                This is your total daily carbon footprint based on your consumption
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Ways to reduce your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use energy-efficient appliances</li>
              <li>• Consider alternative transportation options</li>
              <li>• Support renewable energy sources</li>
              <li>• Reduce waste and recycle more</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Result
