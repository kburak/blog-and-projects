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
            <div className="mt-12 relative bg-opacity-75 h-[300px] text-center content-center">
                <Image
                    className="object-cover"
                    src="https://cdn.pixabay.com/photo/2024/06/20/17/03/fishing-8842590_1280.jpg"
                    quality={100}
                    alt="Placeholder image"
                    fill={true}
                    priority={true}
                /* You should add the priority property to the image that will be the Largest Contentful Paint (LCP) element for each page. 
                Doing so allows Next.js to specially prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP. */
                />
                <div className="relative bg-white bg-opacity-75 h-auto">
                    <p className="text-blue-700 text-4xl">Highlight TBD</p>
                    <p className="text-blue-700 text-base">Some story about the man who went fishing.</p>
                </div>

            </div>
            <div className="pl-6 pr-6 md:pl-0 md:pr-0 pt-8">
                <h1 className="font-bold text-xl">Blog Articles</h1>
                <div id="blogList-Wrap" className="flex flex-wrap justify-between">

                    <div id="sticky-tag-wrap" className="w-full bg-white z-10 mb-4 sticky top-12 lg:w-1/4 lg:h-64 pt-2 pb-4">
                        <p className="text-xs mt-2 mb-1">FILTER BY</p>
                        <TagFilter availableTags={blogTags} fullWidth={true} />
                    </div>

                    {/* <TagFilter availableTags={blogTags} fullWidth={false} /> */}
                    <div id="blogList-Posts" className="flex flex-wrap justify-start w-full lg:w-3/4 gap-4">
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
                                    <h2 className="text-xl text-blue-700 font-bold">{b.title}</h2>
                                    <p className="font-normal">{b.summary}</p>
                                </div>
                                {/* <div className="flex mt-2 mb-5">
                                    <div className="flex-grow">
                                        <h2 className="text-xl text-blue-700">{b.title}</h2>
                                        <p>{b.summary}</p>
                                    </div>
                                    <ArrowRightIcon className="w-8 h-8 min-w-8 self-center text-blue-700" />
                                </div> */}
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}