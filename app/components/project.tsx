import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost } from "@/app/lib/data";
import imageSizeMap from '../lib/imageSizeMap';
import { LinkIcon } from '@heroicons/react/24/outline';


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
    const projectData = await getPost(slug);

    if (!projectData) {
        notFound();
    }

    const { title, summary, header, createdAt, updatedAt, content, projecturl } = projectData;

    return (
        <div className='p-6 md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto'>
            {/* Header section */}
            <h1 className="font-bold text-3xl pb-6 pt-16 pb-10 md:pt-16 md:pb-8">{title}</h1>
            {header &&
                <div id="blog-image-wrap" className="relative w-full h-64 pt-2 pb-2 mt-0 ml-auto mr-auto">
                    <Image
                        className="object-cover"
                        src={header}
                        quality={100}
                        alt={title}
                        fill={true}
                    />
                </div>
            }
            {
                projecturl &&
                <a
                    href={projecturl}
                    target="_blank"
                >
                    <div className='flex'>
                        <LinkIcon className='w-5' />
                        <p className='underline ml-2'>{projecturl}</p>
                    </div>
                </a>
            }
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
                                />
                            </div>;
                        } else if (c.contenttype === "text") {
                            const { size, style, word_count, content: textContent } = c.custom_attr;
                            // Split the text content with \n (empty space) and show each in a <p> element
                            return textContent.split("\r").map((tc: string, split_idx: number) => {
                                return <p
                                    key={`${idx}-text-${split_idx}`}
                                    className={
                                        `${size === 'h1' && 'text-xl'} ${size === 'p' && 'text-base'} ${style === 'bold' && 'font-bold'} ${style === 'italic' && 'italic'} ${style === 'normal' && 'font-normal'} pt-2 pb-2`
                                    }
                                >
                                    {tc}
                                </p>;
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
                        }
                    })
                }
            </div>
            <p className="text-sm">Created: {new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
            <p className="text-sm">Last Updated: {new Intl.DateTimeFormat('de-DE', options).format(updatedAt)}</p>
        </div>
    );
}