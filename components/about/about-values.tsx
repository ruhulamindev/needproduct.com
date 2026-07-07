import { Award, Heart, Truck, ShieldCheck } from "lucide-react"

export default function AboutValues() {
  const values = [
    {
      icon: Award,
      title: "মানের নিশ্চয়তা",
      description: "প্রতিটি পণ্য যাচাই করে, মান নিশ্চিত করে তবেই আমরা বিক্রি করি।",
    },
    {
      icon: Heart,
      title: "গ্রাহক প্রথম",
      description: "আপনার সন্তুষ্টিই আমাদের অগ্রাধিকার। যেকোনো প্রয়োজনে আমরা পাশে আছি।",
    },
    {
      icon: Truck,
      title: "ক্যাশ অন ডেলিভারি",
      description: "পণ্য হাতে পেয়ে, দেখে, তারপর টাকা দিন — সারা বাংলাদেশে।",
    },
    {
      icon: ShieldCheck,
      title: "নির্ভরযোগ্য সেবা",
      description: "দ্রুত ডেলিভারি আর বিশ্বাসযোগ্য সেবার প্রতিশ্রুতি।",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            আমাদের মূল্যবোধ
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            এই মূল্যবোধগুলোই আমাদের প্রতিটি কাজে পথ দেখায় আর গ্রাহকসেবার ভিত্তি গড়ে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mb-4">
                <value.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{value.title}</h3>
              <p className="text-slate-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}