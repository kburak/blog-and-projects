import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Link
                href="/blog"
                className='fixed top-2 left-2 inline text-white w-8 z-10'
            >
                <ArrowLeftIcon />
            </Link>
            {children}
        </div>
    );
}
