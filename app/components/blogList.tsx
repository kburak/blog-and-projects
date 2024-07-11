import { getAllBlogs } from "@/app/lib/data";
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from "next/image";

export default async function BlogList() {
    const blogPosts = await getAllBlogs();

    return (
        <div className="md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto md:mt-20">
            <div className="mt-12 relative bg-gray-300 h-[300px] text-center content-center">
                <Image
                    className="object-cover"
                    src="https://cdn.pixabay.com/photo/2024/06/20/17/03/fishing-8842590_1280.jpg"
                    quality={100}
                    alt="Placeholder image"
                    fill={true}
                />
                <p className="relative bg-white z-auto text-gray-700 text-4xl">Highlight TBD</p>
                <p className="relative bg-white z-auto text-gray-700 text-base">Some story about the man who went fishing.</p>
            </div>
            <div className="pl-3 pr-3 md:pl-0 md:pr-0 pt-12">
                <h1 className="font-bold text-4xl pb-12">Blog Posts</h1>
                <div id="blogList-Wrap" className="flex flex-wrap justify-between">
                    <div id="blogList-Navigation" className="w-full h-auto lg:w-1/4 lg:h-64 bg-gray-300">
                        <p>Categories</p>
                        <span className="lg:block mr-1 bg-red-100">Apple</span>
                        <span className="lg:block mr-1 bg-red-100">Peach</span>
                    </div>
                    <div id="blogList-Posts" className="flex flex-wrap justify-center -ml-2 -mr-2 lg:w-3/4 gap-4">
                        {blogPosts?.map((b) => {
                            return <div className="w-full p-2 md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-1rem)] lg:p-0">
                                <div id="blogList-image-wrap" className="relative w-full h-48 pt-2 pb-2 mt-0 ml-auto mr-auto mb-0">
                                    <Image
                                        className="object-cover"
                                        src={b.header}
                                        quality={100}
                                        alt={b.title}
                                        fill={true}
                                    />
                                </div>
                                <div className="flex flex-row mb-5">
                                    <div className="flex-grow">
                                        <h2 className="text-xl text-blue-700">{b.title}</h2>
                                        <p>{b.summary}</p>
                                    </div>
                                    <Link href={`/blog/${b.slug}`} className="mb-5">
                                        <ArrowRightIcon className="w-8 h-8 min-w-8 self-center text-blue-700" />
                                    </Link>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}