'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
    const path = usePathname();
    return (
        <div className='flex space-x-4 p-3'>
            <Link
                href="/admin/blog"
                className='inline text-white'
            >
                Blog
            </Link>
            <Link
                href="/admin/projects"
                className='inline text-white'
            >
                Projects
            </Link>
            <Link
                href="/admin"
                className='inline text-white'
            >
                Admin Home
            </Link>
            <Link
                href="/"
                className='inline text-white'
            >
                Leave Admin
            </Link>
        </div>
    );
}