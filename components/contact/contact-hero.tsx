export default function ContactHero() {
  return (
    <section className="relative h-[300px] bg-gradient-to-r from-slate-800 to-slate-700 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          // backgroundImage: "url('/placeholder.svg?height=300&width=1200')",
          backgroundImage: "url('https://www.transunion.com/blog/the-re-invention-of-phone-calls-building-an-environment-of-trust/_jcr_content/root/tupagesectionwithbac/image.coreimg.jpeg/1704911894163/jon-peterson-blog-2-header-desktop-980x398.jpeg')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-slate-200">Get in touch with us. We'd love to hear from you.</p>
        </div>
      </div>
    </section>
  )
}
