import Link from 'next/link';

export default function Page() {
    return <div className="mt-20 md:w-1/3 p-2 mr-auto ml-auto">
        <Link
            href="/admin/blog/"
            className="flex h-10 items-center mb-5 rounded-lg bg-red-600 px-4 w-full text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <span className='mr-auto ml-auto'>Manage Blog Posts</span>
        </Link>
        <Link
            href="/admin/projects/"
            className="flex h-10 items-center mb-5 rounded-lg bg-red-600 px-4 w-full text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <span className='mr-auto ml-auto'>Manage Project Posts</span>
        </Link>
    </div>
}