import { Suspense } from "react"
import Header from "@/components/layout/header"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <Navigation />
      </Suspense>

      <main>{children}</main>

      <Footer />
    </>
  )
}