import { getAllPosts, getAllTags } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";
import TagFilter from "./tagFilter";

export default async function BlogList({ searchQuery, searchTags }: { searchQuery: string, searchTags: string[] }) {
    const [blogPosts, blogTags] = await Promise.all([
        getAllPosts(searchQuery, searchTags, 'Blog'),
        getAllTags('Blog')
    ]);

    return (
        <div className="md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto md:mt-20">

            {/* Highligh section */}
            {blogPosts && blogPosts[0] &&
                <Link
                    className="block mt-12 relative bg-opacity-75 h-[300px] text-center content-center"
                    href={`/blog/${blogPosts[0].slug}`}
                >
                    <Image
                        className="object-cover"
                        src={blogPosts[0].header}
                        quality={100}
                        alt={blogPosts[0].title}
                        fill={true}
                        priority={true}
                    /* You should add the priority property to the image that will be the Largest Contentful Paint (LCP) element for each page. 
                    Doing so allows Next.js to specially prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP. */
                    />
                    <div id="blog-full-gradient" className="bg-gradient-to-t from-black to-70% to-transparent absolute bottom-0 left-0 w-full h-full">
                        <div id="gradient-content" className="absolute bottom-0 text-left px-6 py-4">
                            <p className="font-bold text-white">Latest Post</p>
                            <p className="text-white underline decoration-customBlue text-2xl lg:text-4xl font-extrabold">{blogPosts[0].title}</p>
                            <p className="text-black text-base text-white">{blogPosts[0].summary}</p>
                        </div>
                    </div>
                </Link>
            }

            {/* Blog Articles */}
            <div className="pt-8">
                <h1 className="font-bold text-xl pl-6 pr-6 md:pl-0 md:pr-0">Blog Articles</h1>
                <div id="blogList-Wrap" className="flex flex-wrap justify-between">

                    <div id="sticky-tag-wrap" className="w-full bg-white z-10 mb-4 sticky top-12 lg:w-1/4 lg:h-64 pt-2 pb-4 pl-6 pr-6 md:pl-0 md:pr-0">
                        <p className="text-xs mt-2 mb-1">FILTER BY</p>
                        <TagFilter availableTags={blogTags} fullWidth={true} />
                    </div>

                    {/* <TagFilter availableTags={blogTags} fullWidth={false} /> */}
                    <div id="blogList-Posts" className="flex flex-wrap justify-start w-full lg:w-3/4 gap-4 pl-6 pr-6 md:pl-0 md:pr-0">
                        {blogPosts?.map((b) => {
                            return <Link
                                className="w-full md:pl-0 md:pr-0 md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0"
                                href={`/blog/${b.slug}`}
                                key={`blogPost-${b.slug}`}
                            >
                                <div
                                    id="blogList-image-wrap"
                                    className="block relative w-full h-48 pt-2 pb-2 mt-0 ml-auto mr-auto mb-0"
                                >
                                    <Image
                                        className="object-cover"
                                        src={b.header}
                                        quality={75}
                                        alt={b.title}
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        /* 
                                            (max-width: 768px) 100vw: If the viewport width is 768 pixels or less, the image should take up 100% of the viewport width (100vw).
                                            (max-width: 1200px) 50vw: If the viewport width is between 769 pixels and 1200 pixels, the image should take up 50% of the viewport width (50vw).
                                            33vw: If the viewport width is greater than 1200 pixels, the image should take up 33% of the viewport width (33vw). 
                                        */
                                        priority={false}
                                    />
                                </div>
                                <div className="mt-2 mb-5">
                                    <h2 className="text-xl lg:text-2xl text-customBlue font-bold">{b.title}</h2>
                                    <p className="font-normal">{b.summary}</p>
                                </div>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}