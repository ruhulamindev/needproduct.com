import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">N</span>eedProduct
            </div>
            <p className="text-slate-300 mb-4">
              "Canon image RUNNER 2025 – Premium printing for the modern office.
              Consistent speed, clarity, and performance you can trust."
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-slate-300 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-slate-300 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-slate-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-slate-300 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-slate-300">+880 1312-######</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-slate-300">info@needproduct.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-slate-300">Rajshahi, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter to get latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center px-4">
          <p className="text-slate-300 text-sm md:text-base">
            © 2025 NeedProduct. All rights reserved. |{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </p>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Developed by{" "}
            <a
              href="#"
              // href="https://www.largesofttech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LST
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
