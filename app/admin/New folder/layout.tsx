export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">
        Admin Sidebar
      </aside>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}