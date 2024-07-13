import { getAllBlogs } from "@/app/lib/data";
import Link from "next/link";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Search from '@/app/components/search';
import DeleteButton from "@/app/components/deleteButton";

export default async function Page({ searchParams }:
    {
        searchParams?: {
            query?: string
        }
    }) {

    const query = searchParams?.query || '';
    const blogPosts = await getAllBlogs(query);

    return (
        <div id="blogList-Posts" className="flex flex-col justify-center ml-auto mr-auto pl-2 pr-2 md:w-3/5 gap-4">
            <div className="mt-4 mb-2 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search blog..." />
                <Link
                    href="/admin/blog/create"
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Create Blog</span>
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
            {blogPosts?.map((b) => {
                return <div className="flex">
                    <div className="flex-grow">
                        <h2 className="text-xl">{b.title}</h2>
                    </div>
                    <Link href={`/admin/blog/${b.slug}/edit`} className="mb-5 rounded-md border p-2 hover:bg-gray-100 mr-1">
                        <PencilIcon className="w-5" />
                    </Link>
                    {/* `/blog/${b.slug}` */}
                    <DeleteButton postId={b.id} />
                </div>

            })}
        </div>
    );
}