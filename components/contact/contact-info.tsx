import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+880 1312-######", "+880 1312-######"],
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@GlobalSmart.com", "support@GlobalSmart.com"],
      description: "Send us an email anytime",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Fashion Street", "Rajshahi 1000, Bangladesh"],
      description: "Visit our flagship store",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      description: "We're here to help",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h2>

      {contactDetails.map((item, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
            {item.details.map((detail, idx) => (
              <p key={idx} className="text-slate-600">
                {detail}
              </p>
            ))}
            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
