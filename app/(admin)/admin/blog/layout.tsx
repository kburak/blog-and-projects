import Link from 'next/link';

export default function AdminBlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='bg-red-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10'>
                <div className='flex space-x-4 p-3'>
                    <p
                        className='inline text-white text-opacity-10'
                    >
                        Blog
                    </p>
                    <Link
                        href="/admin/projects"
                        className='inline text-white'
                    >
                        Projects
                    </Link>
                    <Link
                        href="/"
                        className='inline text-white'
                    >
                        Home
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
