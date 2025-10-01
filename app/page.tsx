import HeroSection from "@/components/layout/hero";
import CategoriesSection from "@/components/home/categories-section";
import ProductCard from "@/components/product/product-card";
import { products } from "@/data/products";

export default function HomePage() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <HeroSection />
      <CategoriesSection />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category
          );

          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <a
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  className="inline-block bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  View All
                </a>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
