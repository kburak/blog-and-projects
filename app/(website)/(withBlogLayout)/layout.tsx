import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='bg-blue-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10'>
                <Link
                    href="/blog"
                    className='fixed top-2 left-2 inline text-white w-8 z-10'
                >
                    <ArrowLeftIcon />
                </Link>
            </div>
            {children}
        </div>
    );
}
