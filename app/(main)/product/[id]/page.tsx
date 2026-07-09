"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { ShoppingCart, Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { fetchProductById } from "@/lib/products-api"

export default function ProductDetails() {
  const { id } = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { user } = useAuth()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const found = await fetchProductById(String(id))
        setProduct(found)

        // const res = await fetch("/data/products.json")
        // const products: Product[] = await res.json()

        // const foundProduct = products.find(
        //   (p) => p.id.toString() === id?.toString()
        // )

        // if (!foundProduct) {
        //   router.push("/404")
        //   return
        // }

        // setProduct(foundProduct)
      // } catch (error) {
      //   console.error("Failed to load product:", error)
      // } finally {
      //   setLoading(false)
      // }

      } catch (error) {
        console.error("Failed to load product:", error)
        router.push("/404")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, router])

  // ===== Loading Skeleton =====
  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="w-full h-80 bg-slate-200 rounded animate-pulse mb-4" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-slate-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-1/2 bg-slate-200 rounded animate-pulse" />
            <div className="h-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-12 w-40 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  if (!product) return null

  // ===== Discount হিসাব (card-এর মতো একই নিয়ম) =====
  const discount = product.discount ?? 0
  const hasDiscount = discount > 0
  const finalPrice = hasDiscount
    ? Math.round(product.price - (product.price * discount) / 100)
    : product.price

  // ===== Stock =====
  const inStock = (product.stock ?? 0) > 0 && product.inStock !== false

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]

  const mainImage = selectedImage || product.image

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login first to add products to cart",
        variant: "destructive",
      })
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: finalPrice, // ছাড়ের পরের দাম
      quantity: 1,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <div className="relative w-full h-80 mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover rounded shadow"
            />
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded border cursor-pointer overflow-hidden ${
                  mainImage === img ? "border-blue-600" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name}-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-slate-600 mb-2">
            Category:{" "}
            <strong className="capitalize">{product.category}</strong>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-slate-700">
              {product.rating ?? 4}{" "}
              <span className="text-slate-400">
                ({product.reviews ?? 10} reviews)
              </span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-green-600">
              ৳{finalPrice}
            </span>

            {hasDiscount && (
              <>
                <span className="text-gray-400 text-lg line-through">
                  ৳{product.price}
                </span>
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-sm font-medium mb-5 ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </p>

          <p className="text-gray-700 leading-7 mb-6">
            {product.description}
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition ${
              inStock
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  )
}