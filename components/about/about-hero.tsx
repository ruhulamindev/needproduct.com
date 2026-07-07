export default function AboutHero() {
  return (
    <section className="relative h-[350px] md:h-[400px] bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 overflow-hidden">
      {/* চাইলে নিজের ছবি বসাও, নাহলে gradient-ই থাকবে */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About NeedProduct
          </h1>
          <p className="text-lg md:text-xl text-slate-200">
            আপনার প্রয়োজনীয় সব পণ্য এক জায়গায় — বিশ্বাস, মান আর সাশ্রয়ী দামের প্রতিশ্রুতি নিয়ে।
          </p>
        </div>
      </div>
    </section>
  )
}