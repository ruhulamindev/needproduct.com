"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Settings {
  siteName: string
  logoUrl: string
  contactEmail: string
  phoneNumber: string
  address: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  couponCode: string
  paymentGateways: string[]  // ডায়নামিক পেমেন্ট গেটওয়ে গুলো এখানে
}

const defaultSettings: Settings = {
  siteName: "",
  logoUrl: "",
  contactEmail: "",
  phoneNumber: "",
  address: "",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  couponCode: "",
  paymentGateways: [],
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      // উদাহরণ ডাটা, এটা তোমার API থেকে আসবে
      const fetchedSettings: Settings = {
        siteName: "My Awesome Site",
        logoUrl: "https://example.com/logo.png",
        contactEmail: "contact@example.com",
        phoneNumber: "+880123456789",
        address: "123, Some Street, City, Country",
        facebookUrl: "https://facebook.com/myfb",
        twitterUrl: "https://twitter.com/mytwitter",
        instagramUrl: "https://instagram.com/myinsta",
        couponCode: "SAVE20",
        paymentGateways: ["Stripe", "PayPal", "Square"],
      }
      setSettings(fetchedSettings)
      setLoading(false)
    }, 300)
  }, [])

  // সাধারণ ইনপুট পরিবর্তনের হ্যান্ডলার
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  // পেমেন্ট গেটওয়ে পরিবর্তনের হ্যান্ডলার
  const handlePaymentGatewayChange = (index: number, value: string) => {
    const newGateways = [...settings.paymentGateways]
    newGateways[index] = value
    setSettings((prev) => ({ ...prev, paymentGateways: newGateways }))
  }

  // নতুন গেটওয়ে যোগ করার ফাংশন
  const addPaymentGateway = () => {
    setSettings((prev) => ({ ...prev, paymentGateways: [...prev.paymentGateways, ""] }))
  }

  // গেটওয়ে মুছে ফেলার ফাংশন
  const removePaymentGateway = (index: number) => {
    const newGateways = settings.paymentGateways.filter((_, i) => i !== index)
    setSettings((prev) => ({ ...prev, paymentGateways: newGateways }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      // API কল এখানে করবে তোমার, অথবা ডাটাবেজ আপডেট
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Settings updated successfully.")
    } catch (err) {
      setError("Failed to update settings.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading settings...</p>

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Name */}
        <div>
          <label htmlFor="siteName" className="block font-medium mb-1">
            Site Name
          </label>
          <input
            id="siteName"
            name="siteName"
            type="text"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logoUrl" className="block font-medium mb-1">
            Logo URL
          </label>
          <input
            id="logoUrl"
            name="logoUrl"
            type="text"
            value={settings.logoUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block font-medium mb-1">
            Contact Email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={settings.contactEmail}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={settings.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        {/* Facebook URL */}
        <div>
          <label htmlFor="facebookUrl" className="block font-medium mb-1">
            Facebook URL
          </label>
          <input
            id="facebookUrl"
            name="facebookUrl"
            type="url"
            value={settings.facebookUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Twitter URL */}
        <div>
          <label htmlFor="twitterUrl" className="block font-medium mb-1">
            Twitter URL
          </label>
          <input
            id="twitterUrl"
            name="twitterUrl"
            type="url"
            value={settings.twitterUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Instagram URL */}
        <div>
          <label htmlFor="instagramUrl" className="block font-medium mb-1">
            Instagram URL
          </label>
          <input
            id="instagramUrl"
            name="instagramUrl"
            type="url"
            value={settings.instagramUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Coupon Code */}
        <div>
          <label htmlFor="couponCode" className="block font-medium mb-1">
            Coupon Code
          </label>
          <input
            id="couponCode"
            name="couponCode"
            type="text"
            value={settings.couponCode}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Payment Gateways */}
        <div>
          <label className="block font-medium mb-2">Payment Gateways</label>
          {settings.paymentGateways.map((gateway, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={gateway}
                onChange={(e) => handlePaymentGatewayChange(index, e.target.value)}
                className="flex-grow border rounded px-3 py-2"
                placeholder="Payment Gateway Name"
                required
              />
              <button
                type="button"
                onClick={() => removePaymentGateway(index)}
                className="text-red-600 hover:text-red-800 font-bold px-2"
                aria-label={`Remove payment gateway ${gateway}`}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPaymentGateway}
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Payment Gateway
          </button>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  )
}
