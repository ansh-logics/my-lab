/**
 * API client for Carbon Footprint Calculator backend.
 * Uses Vite proxy in dev: /api -> http://localhost:8000/api
 */
const API_BASE = import.meta.env.VITE_API_URL || "/api"

const TOKEN_KEY = "cfc_token"

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface DailyDataPayload {
  date: string // YYYY-MM-DD
  lpg: number
  petrol: number
  diesel: number
  electricity: number
}

export interface DailyData {
  id: number
  user: number
  date: string
  lpg: number
  petrol: number
  diesel: number
  electricity: number
  total: number
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  const token = getToken()
  if (token) headers["Authorization"] = `Token ${token}`

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  })

  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error(res.ok ? text || "Unknown error" : text || `HTTP ${res.status}`)
  }

  if (!res.ok) {
    const err = data as { detail?: string; [key: string]: unknown }
    throw new Error(err?.detail || (typeof err === "object" ? JSON.stringify(err) : String(err)))
  }
  return data as T
}

export const api = {
  auth: {
    register: (username: string, email: string, password: string) =>
      request<AuthResponse>("/auth/register/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      }),
    login: (username: string, password: string) =>
      request<AuthResponse>("/auth/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
    me: () => request<User>("/auth/me/"),
  },
  dailyData: {
    list: () => request<DailyData[]>("/daily-data/"),
    create: (payload: DailyDataPayload) =>
      request<DailyData>("/daily-data/", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    last7Days: () => request<Record<string, number>>("/daily-data/last_7_days/"),
  },
}
