export default function ContactHero() {
  return (
    <section className="relative h-[280px] md:h-[300px] bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">যোগাযোগ করুন</h1>
          <p className="text-lg md:text-xl text-slate-200">
            যেকোনো প্রশ্ন বা প্রয়োজনে আমরা পাশে আছি। আপনার বার্তার অপেক্ষায় রইলাম।
          </p>
        </div>
      </div>
    </section>
  )
}