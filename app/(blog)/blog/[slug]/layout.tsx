import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='bg-blue-700 flex justify-between items-center fixed w-full h-12 top-0 left-0'>
                <div className='flex p-2'>
                    <Link
                        href="/blog"
                        className='inline text-white w-8'
                    >
                        <ArrowLeftIcon />
                    </Link>
                </div>
                <div className='flex space-x-4 p-3'>
                    <Link
                        href="/projects"
                        className='inline text-white'
                    >
                        Projects
                    </Link>
                    <Link
                        href="/projects"
                        className='inline text-white'
                    >
                        Home
                    </Link>
                </div>
            </div>
            <div className='mt-12'>
                {children}
            </div>
        </div>
    );
}
