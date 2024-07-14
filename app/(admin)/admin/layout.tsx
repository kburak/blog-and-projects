export const metadata = {
  title: 'Admin',
  description: 'Admin CMS page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="absolute top-12 pl-2 text-red-500">Admin Interface</p>
      </div>
      {children}
    </div>
  )
}
