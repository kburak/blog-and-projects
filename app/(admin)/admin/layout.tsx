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
    <div>{children}</div>
  )
}
