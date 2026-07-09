// lib/admin-auth.ts
import { api } from "./api"

/** backend-এ login করে, role admin কিনা যাচাই করে। token httpOnly cookie-তে বসবে */
export async function loginAdmin(email: string, password: string) {
  const res = await api<{ data: { user: { role: string; name: string; email: string } } }>(
    "/auth/login",
    { method: "POST", body: JSON.stringify({ email, password }) }
  )

  const { user } = res.data

  if (user.role !== "admin") {
    // admin না হলে cookie মুছে দাও, যাতে সাধারণ user login করে থেকে না যায়
    await api("/auth/logout", { method: "POST" }).catch(() => {})
    throw new Error("আপনার admin অনুমতি নেই।")
  }

  localStorage.setItem("admin_user", JSON.stringify(user))
  return user
}

/** backend-এ /auth/me দিয়ে যাচাই — cookie আছে কিনা, role admin কিনা */
export async function verifyAdmin(): Promise<boolean> {
  try {
    const res = await api<{ data: { role: string } }>("/auth/me")
    return res.data.role === "admin"
  } catch {
    return false
  }
}

export async function logoutAdmin() {
  await api("/auth/logout", { method: "POST" }).catch(() => {})
  localStorage.removeItem("admin_user")
}