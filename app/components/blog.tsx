import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost } from "@/app/lib/data";
import imageSizeMap from '../lib/imageSizeMap';
import TextElement from './textElement';


const options: RTCSetParameterOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZone: "Australia/Sydney"
};

export default async function Blog(props: { slug: string }) {

    const { slug } = props;

    // Get post data with content
    const blogData = await getPost(slug);

    if (!blogData) {
        notFound();
    }

    const { title, summary, header, createdAt, updatedAt, content } = blogData;

    return (
        <div className='p-6 md:max-w-2xl lg:max-w-3xl mt-0 mb-0 ml-auto mr-auto'>
            {/* Header section */}
            <h1 className="font-bold text-3xl pb-6 pt-16 pb-10 md:pt-16 md:pb-8">{title}</h1>
            <div id="blog-image-wrap" className="relative w-full h-64 pt-2 pb-2 mt-0 ml-auto mr-auto">
                <Image
                    className="object-cover"
                    src={header}
                    quality={100}
                    alt={title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>

            {/* Content Section */}
            <div className='mt-6'>
                {
                    content?.map((c, idx) => {
                        if (c.contenttype === "image") {
                            const { url, caption, size } = c.custom_attr;
                            return <div key={`${idx}-image`}>
                                <Image
                                    src={url}
                                    width={imageSizeMap[size].width}
                                    height={imageSizeMap[size].height}
                                    className="pt-2 pb-2 mt-0 ml-auto mr-auto mb-0"
                                    alt={caption}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>;
                        } else if (c.contenttype === "text") {
                            const { size, style, word_count, content: textContent } = c.custom_attr;
                            // Split the text content with \n (empty space) and show each in a <p> element
                            return textContent.split("\r").map((tc: string, split_idx: number) => {
                                return <TextElement
                                    htmlStr={tc}
                                    idx={idx}
                                    split_idx={split_idx}
                                    size={size}
                                    style={style}
                                />;
                            });

                        } else if (c.contenttype === "code") {
                            const { language, code } = c.custom_attr;
                            return <div className='text-xs md:text-sm' key={`${idx}-code`}>
                                <SyntaxHighlighter
                                    language={language}
                                    style={docco /* dark atomOneDark github */}
                                    customStyle={{
                                        margin: "0.5rem 0 0.5rem 0"
                                    }}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        } else if (c.contenttype === "iframe") {
                            const { iframetype, url, title } = c.custom_attr;
                            return <div className='text-xs md:text-sm w-full pt-4 pb-4' key={`${idx}-iframe`}>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={url}
                                    title={title}
                                    allow={iframetype === "video" ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" : ""}
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen={true}>
                                </iframe>
                            </div>
                        }
                    })
                }
            </div>
            <p className="text-sm">Created: {new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
            <p className="text-sm">Last Updated: {new Intl.DateTimeFormat('de-DE', options).format(updatedAt)}</p>
        </div>
    );
}