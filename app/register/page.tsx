"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const success = await register(form.name, form.email, form.password);
    setLoading(false);

    if (success) {
      // Registration successful, redirect to dashboard
      router.push("/user-admin");
    } else {
      setError("❌ Registration failed. Maybe this email is already registered.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 mb-10 sm:mt-16 sm:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Register</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2 text-sm sm:text-base">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label>Remember Me</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded text-base sm:text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm sm:text-base">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
