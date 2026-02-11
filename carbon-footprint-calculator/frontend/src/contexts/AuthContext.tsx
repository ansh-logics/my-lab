import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { getToken, setToken as persistToken } from "@/lib/api"

const AuthContext = createContext<{
  isLoggedIn: boolean
  refreshAuth: () => void
  logout: () => void
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setTick] = useState(0)
  const refreshAuth = useCallback(() => setTick((t) => t + 1), [])
  const logout = useCallback(() => {
    persistToken(null)
    refreshAuth()
  }, [refreshAuth])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!getToken(), refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
