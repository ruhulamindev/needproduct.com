export default function AboutHero() {
  return (
    <section className="relative h-[400px] bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('https://admin.uskunalar.uz/media/maykali_paket.png?height=400&width=1200')",
          // backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About GlobalSmart</h1>
          <p className="text-lg md:text-xl text-slate-200">
            Crafting premium traditional Machine for the modern since our inception.
          </p>
        </div>
      </div>
    </section>
  )
}
