import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlog } from "@/app/lib/data";


const imageSizeMap: { [key: string]: { [key: string]: number } } = {
    'small': {
        height: 150,
        width: 250
    },
    "medium": {
        height: 620,
        width: 560
    },
    "large": {
        height: 760,
        width: 1500
    }
};

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

    const { title, summary, createdAt, updatedAt, content, postType } = blogData ?? {};

    if (!blogData) {
        notFound();
    }

    return (
        <div>
            {/* Header section */}
            <div className="bg-blue-700 text-center text-white pt-24 pb-10 md:pt-12 md:pb-5" >
                <h1 className="font-bold text-4xl pb-6">{title}</h1>
                <p className="pb-5">{summary}</p>
                <p className="text-sm">{new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
            </div >

            <hr />

            {/* Content Section */}
            <div className="p-6">
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
                                    alt="Screenshots of the dashboard project showing desktop version"
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