// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

/**
 * Token এখন httpOnly cookie-তে — JS ছুঁতে পারে না।
 * তাই আলাদা করে token পাঠাতে হয় না, browser নিজেই cookie পাঠায়।
 */
export async function api<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // 👈 cookie পাঠাতে/নিতে — এটাই মূল কথা
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong")
  }

  return json
}

/** logout — backend cookie মুছে দেবে */
export async function logout() {
  await api("/auth/logout", { method: "POST" })
}