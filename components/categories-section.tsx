// import Image from "next/image"

// export default function CategoriesSection() {
//   const categories = [
//     {
//       id: 1,
//       title: "ETHNIC",
//       subtitle: "Traditional Collection",
//       image: "/placeholder.svg?height=400&width=300",
//       bgColor: "bg-emerald-600",
//     },
//     {
//       id: 2,
//       title: "TIMELESS",
//       subtitle: "Classic Styles",
//       image: "/placeholder.svg?height=400&width=300",
//       bgColor: "bg-blue-600",
//     },
//     {
//       id: 3,
//       title: "EXCLUSIVE",
//       subtitle: "Premium Range",
//       image: "/placeholder.svg?height=400&width=300",
//       bgColor: "bg-slate-600",
//     },
//   ]

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Section Title */}
//         <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">browse our categories</h2>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className={`relative h-96 rounded-lg overflow-hidden cursor-pointer group ${category.bgColor}`}
//             >
//               {/* Background Image */}
//               <div className="absolute inset-0">
//                 <Image
//                   src={category.image || "/placeholder.svg"}
//                   alt={category.title}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />

//               {/* Content */}
//               <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
//                 <h3 className="text-4xl font-bold mb-2 tracking-wider">{category.title}</h3>
//                 <p className="text-lg font-light opacity-90">{category.subtitle}</p>

//                 {/* Decorative dots */}
//                 <div className="flex space-x-1 mt-4">
//                   {[...Array(7)].map((_, i) => (
//                     <div key={i} className="w-1 h-1 bg-white rounded-full opacity-60" />
//                   ))}
//                 </div>
//               </div>

//               {/* Hover Effect */}
//               <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-4 rounded" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
