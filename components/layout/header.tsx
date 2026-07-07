import { Phone, MessageCircle, Tag } from "lucide-react";

export default function Header() {
  // 🔴 এখানে তোমার আসল নম্বর বসাও
  const phone = "+8801789011141"; // call এর জন্য (+ সহ)
  const whatsapp = "8801789011141"; // WhatsApp এর জন্য (country code সহ, + ছাড়া)

  return (
    <div className="bg-slate-800 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-1.5 sm:gap-0">
        {/* Left: Contact */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="hidden sm:inline text-slate-300">For Order:</span>

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-semibold">{phone}</span>
          </a>

          <span className="text-slate-500">|</span>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-green-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">WhatsApp</span>
          </a>
        </div>

        {/* Right: Coupon */}
        <div className="flex items-center gap-1.5 justify-center">
          <Tag className="w-3.5 h-3.5 text-yellow-300" />
          <span>20% off with coupon</span>
          <span className="font-bold text-yellow-300 tracking-wide">
            AB72CD
          </span>
        </div>
      </div>
    </div>
  );
}
