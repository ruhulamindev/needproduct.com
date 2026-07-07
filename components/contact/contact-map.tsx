export default function ContactMap() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">আমাদের অবস্থান</h2>
      <div className="rounded-lg overflow-hidden shadow-sm h-64 md:h-96">
        <iframe
          title="NeedProduct Location"
          src="https://www.google.com/maps?q=Rajshahi,Bangladesh&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}