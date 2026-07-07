import RequestForm from "@/components/request/request-form"
import { PackageSearch } from "lucide-react"

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-4">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            প্রয়োজনীয় পণ্যের অনুরোধ করুন
          </h1>
          <p className="text-slate-200">
            খুঁজে পাচ্ছেন না? চিন্তা নেই! আমাদের জানান কী চাই — আমরা খুঁজে এনে দেব।
          </p>
        </div>
      </section>

      <div className="py-12 px-4">
        <RequestForm />
      </div>
    </div>
  )
}