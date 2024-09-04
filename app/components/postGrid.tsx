import Link from "next/link";
import Image from "next/image";

export default function PostGrid({ posts, postType }: { posts: any[], postType: "blog" | "project" }) {

    function generateLogoGrid(num: number) {
        const grid = [];
        for (let i = 0; i < num; i++) {
            grid.push(
                <Image
                    className="text-white mb-1"
                    key={`grid-logo-${i}`}
                    src="/logo-w-xl-transparent.png"
                    alt="Logo"
                    width={25}
                    height={25}
                />
            );
        }
        return grid;
    }

    return (
        <div id={`${postType}-posts`} className="flex flex-wrap justify-start gap-4">
            {posts?.map((p) => {
                return <Link
                    className="w-full md:w-1/2 md:max-w-[calc(50%-0.5rem)] lg:p-0"
                    href={`/${postType}/${p.slug}`}
                    key={`${postType}-${p.slug}`}
                >
                    {p.header ?
                        <div
                            id={`${postType}-image-wrap`}
                            className="block relative w-full h-48 pt-2 pb-2 mt-0 ml-auto mr-auto mb-0"
                        >
                            <Image
                                className="object-cover"
                                src={p.header}
                                quality={75}
                                alt={p.title}
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
                        :
                        <div
                            id="empty-placeholder"
                            className="grid grid-rows-4 grid-flow-col gap-4 bg-gray-100 items-center w-full h-48 p-4"
                        >
                            {generateLogoGrid(32)}
                        </div>
                    }
                    <div className="mt-2 mb-5">
                        <h2 className="text-xl text-blue-700">{p.title}</h2>
                        <p>{p.summary}</p>
                    </div>
                </Link>
            })}
        </div>
    );
}

