import Link from 'next/link';

export default function Page() {
    return <div className="flex justify-center items-center gap-4 mt-20">
        <Link
            href="/admin/blog/"
            className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <span>Manage Blog Posts</span>
        </Link>
        <Link
            href="/admin/projects/"
            className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <span>Manage Project Posts</span>
        </Link>
    </div>
}