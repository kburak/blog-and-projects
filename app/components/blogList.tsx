import { getAllBlogs } from "@/app/lib/data";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function BlogList() {
    const blogPosts = await getAllBlogs();

    return (
        <div className="p-6 pt-24 md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto">
            <h1 className="font-bold text-4xl pb-12 text-center">Blog Posts</h1>
            {blogPosts?.map((b) => {
                return <div className="flex flex-row mb-5">
                    <div className="flex-grow">
                        <h2 className="text-xl text-blue-700">{b.title}</h2>
                        <p>{b.summary}</p>
                    </div>
                    <Link href={`/blog/${b.slug}`} className="mb-5">
                        <ArrowRightIcon className="w-8 h-8 min-w-8 self-center text-blue-700" />
                    </Link>
                </div>
            })}
        </div>
    );
}