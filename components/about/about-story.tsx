export default function AboutStory() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded with a vision to preserve and modernize traditional South Asian menswear, GlobalSmart has been at
                the forefront of premium ethnic fashion for over a decade.
              </p>
              <p>
                Our journey began with a simple belief: traditional clothing should not compromise on comfort, quality,
                or contemporary style. We've dedicated ourselves to creating pieces that honor our rich cultural
                heritage while meeting the needs of today's discerning gentleman.
              </p>
              <p>
                Every garment in our collection is carefully crafted using the finest fabrics and traditional
                techniques, ensuring that each piece tells a story of excellence and authenticity.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://previews.123rf.com/images/pressmaster/pressmaster1403/pressmaster140300323/26806523-team-of-engineers-discussing-blueprint-at-meeting.jpg?height=500&width=600"
              alt="GlobalSmart Story"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
