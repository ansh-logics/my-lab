import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, LogOut, User } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [chartData, setChartData] = useState<{ day: string; emissions: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { isLoggedIn, logout } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    const load = async () => {
      try {
        const [userRes, last7] = await Promise.all([api.auth.me(), api.dailyData.last7Days()])
        setUser(userRes)

        const sorted = Object.entries(last7)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, emissions]) => ({
            day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
            emissions,
          }))
        setChartData(sorted)
      } catch {
        setError("Failed to load profile. You may need to log in again.")
        logout()
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate, isLoggedIn, logout])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="w-full py-12 px-4 flex justify-center">
        <p className="text-muted-foreground">Loading profile…</p>
      </div>
    )
  }

  return (
    <div className="w-full py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user?.username || "Profile"}</CardTitle>
                  <CardDescription>
                    {user?.email || "Track your carbon emissions over time"}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Last 7 Days Carbon Emissions</h3>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emissions" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile
