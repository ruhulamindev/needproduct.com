"use client"

import { useState } from "react"

export default function RequestForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Request Sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Write your request..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        required
      ></textarea>
      <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700">
        Send Request
      </button>
    </form>
  )
}
