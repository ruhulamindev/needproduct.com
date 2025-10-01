import { Award, Heart, Leaf, Users } from "lucide-react"

export default function AboutValues() {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We never compromise on quality. Every piece is crafted with meticulous attention to detail.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our priority.",
    },
    {
      icon: Leaf,
      title: "Sustainable Fashion",
      description: "We're committed to sustainable practices and ethical manufacturing processes.",
    },
    {
      icon: Users,
      title: "Cultural Heritage",
      description: "Preserving and celebrating our rich cultural traditions through modern fashion.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Values</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape the way we serve our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
                <value.icon className="w-6 h-6 text-slate-600" />
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
