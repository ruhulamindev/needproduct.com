// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { products } from "@/lib/data/products"

// interface RelatedProductsProps {
//   currentProductId: string
// }

// export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
//   const related = products.filter((p) => p.id !== currentProductId).slice(0, 3)

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold text-slate-800 mb-6">You May Also Like</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {related.map((product) => (
//           <Link
//             key={product.id}
//             href={`/product/${product.id}`}
//             className="border rounded-lg p-4 hover:shadow transition"
//           >
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={300}
//               height={300}
//               className="w-full h-48 object-cover rounded"
//             />
//             <h3 className="text-lg font-semibold mt-2 text-slate-800">{product.name}</h3>
//             <p className="text-sm text-slate-600">{product.description}</p>
//             <div className="text-slate-800 font-bold mt-1">৳ {product.price.toFixed(2)}</div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
