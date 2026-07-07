// lib/admin-auth.ts

// 🔴 এখানে তোমার admin email/password default set করো
// ⚠️ এটা শুধু development-এর জন্য। Backend এলে server-side করতে হবে।
export const ADMIN_CREDENTIALS = {
  email: "admin@needproduct.com",
  password: "admin123",
}

const AUTH_KEY = "admin_auth"

// login যাচাই
export function loginAdmin(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
    password === ADMIN_CREDENTIALS.password

  if (ok && typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, "true")
  }
  return ok
}

// login করা আছে কিনা
export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

// logout
export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
  }
}