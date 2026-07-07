"use client"

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
} from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  // 🔴 তোমার আসল তথ্য এখানে বসাও
  const phone = "+8801789011141"
  const whatsapp = "8801789011141"
  const email = "mdfoysalaliriyad8682@gmail.com"

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // পরে backend যুক্ত হলে এখানে API call বসবে
    alert("Subscribe feature চালু হবে খুব শীঘ্রই!")
  }

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-red-500">N</span>eedProduct
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              আপনার প্রয়োজনীয় সব পণ্য এক জায়গায় — মানসম্পন্ন পণ্য, সাশ্রয়ী দামে।
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা।
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-slate-300 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/request" className="text-slate-300 hover:text-white transition-colors">Request Product</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a href={`tel:${phone}`} className="flex items-center text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2 shrink-0" />
                <span>{phone}</span>
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2 shrink-0" />
                <span>{email}</span>
              </a>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Rajshahi, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন।
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* COD Badge */}
            <div className="flex items-center gap-2 mt-5 text-slate-300">
              <Truck className="w-5 h-5 text-green-400" />
              <span className="text-sm">Cash on Delivery Available</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center px-4">
          <p className="text-slate-300 text-sm md:text-base">
            © {year} NeedProduct. All rights reserved. |{" "}
            <Link href="/privacy" className="text-red-400 hover:underline">Privacy Policy</Link>{" "}
            |{" "}
            <Link href="/terms" className="text-red-400 hover:underline">Terms of Service</Link>
          </p>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Developed by{" "}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
              LST
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}