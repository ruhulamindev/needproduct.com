const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

/**
 * Token is now in an httpOnly cookie — JS cannot read it.
 * So we don't need to send it separately, the browser sends the cookie automatically.
 */
async function request<T = any>(
  endpoint: string,
  options: RequestInit = {},
  isAdmin = false
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // send/receive cookies — this is the key part
    headers: {
      "Content-Type": "application/json",
      // if admin request, backend will read the admin_token cookie
      ...(isAdmin ? { "x-client-type": "admin" } : {}),
      ...options.headers,
    },
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong")
  }

  return json
}

/** All customer-side fetches use this — same as before */
export async function api<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return request<T>(endpoint, options, false)
}

/** All admin panel fetches use this — automatically adds "x-client-type: admin" header */
export async function adminApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return request<T>(endpoint, options, true)
}

/** logout — backend clears the cookie (customer session) */
export async function logout() {
  await api("/auth/logout", { method: "POST" })
}