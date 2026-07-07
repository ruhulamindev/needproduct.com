import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "ফোন",
      details: ["+8801789011141"],
      description: "সরাসরি কথা বলতে কল করুন",
    },
    {
      icon: Mail,
      title: "ইমেইল",
      details: ["mdfoysalaliriyad8682@gmail.com"],
      description: "যেকোনো সময় ইমেইল করুন",
    },
    {
      icon: MapPin,
      title: "ঠিকানা",
      details: ["রাজশাহী", "বাংলাদেশ"],
      description: "আমাদের অবস্থান",
    },
    {
      icon: Clock,
      title: "সময়সূচি",
      details: ["শনি - বৃহঃ: সকাল ৯টা - রাত ৯টা", "শুক্রবার: বিকেল ৩টা - রাত ৯টা"],
      description: "আমরা সেবা দিতে প্রস্তুত",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">যোগাযোগের তথ্য</h2>

      {contactDetails.map((item, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
            {item.details.map((detail, idx) => (
              <p key={idx} className="text-slate-600">{detail}</p>
            ))}
            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}