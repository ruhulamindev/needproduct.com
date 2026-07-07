// "use client"

// import Image from "next/image"
// import { useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { products } from "@/lib/data/products"
// import { useEffect, useState } from "react"
// import { useCart } from "@/contexts/cart-context"  // <-- Import useCart here

// export default function ProductDetails() {
//   const params = useParams()
//   const productId = params?.id as string
//   const [product, setProduct] = useState<any>(null)

//   const { addItem } = useCart()  // <-- Get addItem from cart context

//   useEffect(() => {
//     const foundProduct = products.find((p) => p.id === productId)
//     setProduct(foundProduct)
//   }, [productId])

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-600">
//         <p>Product not found.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="w-full object-cover rounded"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
//           <p className="text-slate-600 mb-4">{product.description}</p>
//           <div className="text-xl font-semibold text-slate-800 mb-2">
//             ৳ {product.price.toFixed(2)}
//           </div>
//           <div className="mb-4">
//             <span
//               className={`text-sm font-medium ${
//                 product.stock > 0 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {product.stock > 0 ? "In Stock" : "Out of Stock"}
//             </span>
//           </div>
//           <Button
//             className="w-full sm:w-auto"
//             onClick={() =>
//               addItem({
//                 id: product.id,
//                 name: product.name,
//                 price: product.price,
//                 image: product.image,
//                 quantity: 1,
//               })
//             }
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
