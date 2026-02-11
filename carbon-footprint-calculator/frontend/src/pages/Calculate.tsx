import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Zap, Fuel, Droplets, Flame } from "lucide-react"
import { api, getToken } from "@/lib/api"

// Approximate emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  electricity: 0.5, // kWh
  petrol: 2.3,      // liter
  diesel: 2.7,      // liter
  lpg: 3,           // kg
}

export interface CarbonBreakdown {
  electricity: number
  petrol: number
  diesel: number
  lpg: number
  total: number
}

const Calculate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    electricity: "",
    petrol: "",
    diesel: "",
    lpg: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const elec = parseFloat(formData.electricity) || 0
    const pet = parseFloat(formData.petrol) || 0
    const die = parseFloat(formData.diesel) || 0
    const lpgVal = parseFloat(formData.lpg) || 0

    const carbon: CarbonBreakdown = {
      electricity: elec * EMISSION_FACTORS.electricity,
      petrol: pet * EMISSION_FACTORS.petrol,
      diesel: die * EMISSION_FACTORS.diesel,
      lpg: lpgVal * EMISSION_FACTORS.lpg,
      total: 0,
    }
    carbon.total = carbon.electricity + carbon.petrol + carbon.diesel + carbon.lpg

    try {
      const token = getToken()
      if (token) {
        const today = new Date().toISOString().slice(0, 10)
        await api.dailyData.create({
          date: today,
          electricity: Math.round(elec),
          petrol: Math.round(pet),
          diesel: Math.round(die),
          lpg: Math.round(lpgVal),
        })
      }
      navigate("/result", { state: { carbon, formData: { electricity: elec, petrol: pet, diesel: die, lpg: lpgVal } } })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Calculate Your Carbon Footprint</CardTitle>
          <CardDescription>
            Enter your daily consumption to calculate your carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="electricity" className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Electricity (kWh)
              </Label>
              <Input
                id="electricity"
                name="electricity"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter daily electricity consumption"
                value={formData.electricity}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="petrol" className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-primary" />
                Petrol (Liters)
              </Label>
              <Input
                id="petrol"
                name="petrol"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter daily petrol consumption"
                value={formData.petrol}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diesel" className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Diesel (Liters)
              </Label>
              <Input
                id="diesel"
                name="diesel"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter daily diesel consumption"
                value={formData.diesel}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lpg" className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                LPG (kg)
              </Label>
              <Input
                id="lpg"
                name="lpg"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter daily LPG consumption"
                value={formData.lpg}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Calculating…" : "Calculate Carbon Footprint"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Calculate
