export default function AboutTeam() {
  const team = [
    {
      name: "Md. Golam Kibria",
      role: "Founder & CEO",
      image: "https://th.bing.com/th?q=Sir+Train+Logo&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.5&pid=InlineBlock&rm=3&mkt=en-WW&cc=BD&setlang=en&adlt=moderate&t=1&mw=247?height=300&width=300",
      description: "Visionary leader with 15+ years in fashion industry.",
    },
    {
      name: "Md. Ruhul Amin",
      role: "Head Designer",
      image: "https://smileyworldz.com/wp-content/uploads/2023/11/IMG-20250322-WA0002-1024x1024.jpg?height=300&width=300",
      description: "Creative genius behind our signature designs.",
    },
    {
      name: "Md. Robiul Islam",
      role: "Quality Manager",
      image: "https://smileyworldz.com/wp-content/uploads/2023/11/IMG-20250322-WA0009-1024x1024.jpg?height=300&width=300",
      description: "Ensures every piece meets our high standards.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">The passionate individuals behind Manfare's success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">{member.name}</h3>
              <p className="text-slate-600 font-medium mb-2">{member.role}</p>
              <p className="text-slate-500 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
