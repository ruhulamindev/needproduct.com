import { Heart, User, ShoppingBag } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-slate-800">
              <span className="text-slate-600">M</span>
              <span className="text-slate-800">M</span> manfare
            </div>
            <div className="text-xs text-slate-500 ml-2">be exclusive . be you</div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-800 hover:text-slate-600 font-medium">
              HOME
            </a>
            <a href="#" className="text-slate-800 hover:text-slate-600 font-medium">
              SHOP
            </a>
            <a href="#" className="text-slate-800 hover:text-slate-600 font-medium">
              ABOUT US
            </a>
            <a href="#" className="text-slate-800 hover:text-slate-600 font-medium">
              CONTACT US
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full border border-slate-300 hover:bg-slate-50">
              <Heart className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-full border border-slate-300 hover:bg-slate-50">
              <User className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-full border border-slate-300 hover:bg-slate-50 relative">
              <ShoppingBag className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
