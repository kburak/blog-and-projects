import AdminNav from "@/app/components/AdminNav";

export const metadata = {
  title: 'Admin',
  description: 'Admin CMS page',
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className='bg-red-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10'>
        <AdminNav />
      </div>
      {children}
    </div>
  );
}
