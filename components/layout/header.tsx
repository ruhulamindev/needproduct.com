export default function Header() {
  return (
    <div className="bg-slate-800 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-1 sm:space-y-0">
        <div className="text-center sm:text-left">
          For Order Call or WhatsApp: <span className="font-semibold">+880 1782-######</span>
        </div>
        <div className="text-center sm:text-right">
          20% off with coupon code : <span className="font-semibold">AB72CD</span>
        </div>
      </div>
    </div>
  )
}
