import { getAllBlogs } from "@/app/lib/data";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function BlogList() {
    const blogPosts = await getAllBlogs();

    return (
        <div className="p-6 md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto">
            <h1 className="font-bold text-4xl pb-6">Blog Posts</h1>
            {blogPosts?.map((b) => {
                return <Link href={`/blog/${b.slug}`} className="mb-5 flex flex-row">
                    <div className="flex-grow">
                        <h2 className="text-xl text-blue-700">{b.title}</h2>
                        <p>{b.summary}</p>
                    </div>
                    <ArrowRightIcon className="w-8 h-8 self-center text-blue-700" />
                </Link>
            })}
        </div>
    );
}