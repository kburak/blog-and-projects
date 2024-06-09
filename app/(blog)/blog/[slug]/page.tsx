import { getBlog } from "@/app/lib/data";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata(
    { params, searchParams }: { params: { slug: string }, searchParams: any },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const blogData = await getBlog(params.slug);

    return {
        title: blogData?.title,
        description: blogData?.summary
    }

}

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


export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Get post data with content
    const blogData = await getBlog(slug);
    const { title, summary, createdAt, updatedAt, content, postType } = blogData ?? {};

    return (
        <>
            {/* Header section */}
            <div className="bg-blue-700 text-center text-white pt-5 pb-5">
                <h1 className="font-bold text-4xl pb-5">{title}</h1>
                <p className="pb-5">{summary}</p>
                <p className="text-sm">{new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
            </div>



            <hr />

            {
                content?.map(c => {
                    if (c.contenttype === "image") {
                        const { url, caption, size } = c.custom_attr;
                        /* return <Image
                             className={
                                `
                            ${size === 'small' && 'w-1/4 h-auto'}
                            ${size === 'normal' && 'w-1/2 h-auto'}
                            ${size === 'large' && 'w-screen h-auto"'}
                            `
                            } 
                            src={url}
                            alt={caption}
                            width={imageSizeMap[size].width}
                            height={imageSizeMap[size].height}
                            fill={true}
                        /> */
                        return <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                            {/* Add Hero Images Here */}
                            <Image
                                src={url}
                                width={imageSizeMap[size].width}
                                height={imageSizeMap[size].height}
                                className="hidden md:block"
                                alt="Screenshots of the dashboard project showing desktop version"
                            />
                        </div>
                    } else if (c.contenttype === "text") {
                        const { size, style, word_count, content: textContent } = c.custom_attr;
                        // Split the text content with \n (empty space) and show each in a <p> element
                        return textContent.split("\r").map((tc: string) => {
                            return <p className={
                                `${size === 'h1' && 'text-xl'} ${size === 'p' && 'text-base'} ${style === 'bold' && 'font-bold'} ${style === 'italic' && 'italic'} ${style === 'normal' && 'font-normal'}`
                            }>
                                {tc}
                            </p>;
                        });

                    } else if (c.contenttype === "code") {
                        const { language, code } = c.custom_attr;
                        return <SyntaxHighlighter language={language} style={docco /* dark atomOneDark github */}>
                            {code}
                        </SyntaxHighlighter>
                    }
                })
            }
        </>

    )
}