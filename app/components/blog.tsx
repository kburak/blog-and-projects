import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlog } from "@/app/lib/data";
import imageSizeMap from '../lib/imageSizeMap';


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
    const blogData = await getBlog(slug);

    if (!blogData) {
        notFound();
    }

    const { title, summary, createdAt, updatedAt, content } = blogData;

    return (
        <div>
            {/* Header section */}
            <div className="bg-blue-700 text-center text-white pt-24 pb-10 md:pt-16 md:pb-8">
                <div className='md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto'>
                    <h1 className="font-bold text-4xl pb-6">{title}</h1>
                    <p className="pb-5">{summary}</p>
                    <p className="text-sm">Created: {new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
                    <p className="text-sm">Last Updated: {new Intl.DateTimeFormat('de-DE', options).format(updatedAt)}</p>
                </div>
            </div >

            <hr />

            {/* Content Section */}
            <div className="p-6 md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto">
                {
                    content?.map(c => {
                        if (c.contenttype === "image") {
                            const { url, caption, size } = c.custom_attr;
                            return <div>
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
                            return textContent.split("\r").map((tc: string) => {
                                return <p className={
                                    `${size === 'h1' && 'text-xl'} ${size === 'p' && 'text-base'} ${style === 'bold' && 'font-bold'} ${style === 'italic' && 'italic'} ${style === 'normal' && 'font-normal'} pt-2 pb-2`
                                }>
                                    {tc}
                                </p>;
                            });

                        } else if (c.contenttype === "code") {
                            const { language, code } = c.custom_attr;
                            return <div>
                                <SyntaxHighlighter
                                    language={language}
                                    style={docco /* dark atomOneDark github */}
                                    customStyle={{ margin: "0.5rem 0 0.5rem 0" }}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    );
}