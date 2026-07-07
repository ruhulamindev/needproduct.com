export default function AboutTeam() {
  const team = [
    {
      name: "Md. Riyad Islam",
      role: "Founder & CEO",
      image: "/images/Screenshot 2026-07-07 094255.png",
      description: "NeedProduct-এর স্বপ্নদ্রষ্টা ও প্রতিষ্ঠাতা।",
    },
    {
      name: "Md. Ruhul Amin",
      role: "Operations Manager",
      image: "https://smileyworldz.com/wp-content/uploads/2023/11/IMG-20250322-WA0009-1024x1024.jpg?height=300&width=300",
      description: "অর্ডার ও ডেলিভারি সুষ্ঠুভাবে পরিচালনা করেন।",
    },
    {
      name: "Md. Labib Bin Mahamud",
      role: "Customer Support",
      image: "https://smileyworldz.com/wp-content/uploads/2023/11/IMG-20250322-WA0002-1024x1024.jpg?height=300&width=300",
      description: "গ্রাহকের যেকোনো প্রশ্নে সবসময় পাশে থাকেন।",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            আমাদের টিম
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            NeedProduct-এর পেছনে থাকা পরিশ্রমী মানুষগুলো।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover bg-slate-100"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">{member.name}</h3>
              <p className="text-red-600 font-medium mb-2">{member.role}</p>
              <p className="text-slate-500 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}