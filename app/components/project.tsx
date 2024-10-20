import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost } from "@/app/lib/data";
import imageSizeMap from '../lib/imageSizeMap';
import { LinkIcon } from '@heroicons/react/24/outline';
import TextElement from './textElement';
import Breadcrumbs from "@/app/components/breadcrumbs";

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

export default async function Project(props: { slug: string }) {

    const { slug } = props;

    // Get post data with content
    const projectData = await getPost(slug);

    if (!projectData) {
        notFound();
    }

    const { title, summary, header, createdAt, updatedAt, content, projecturl } = projectData;

    return (
        <div className='p-6 md:max-w-2xl lg:max-w-3xl mt-0 mb-0 ml-auto mr-auto'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Project', href: '/project/' },
                    {
                        label: title,
                        href: `/project/${slug}/`,
                        active: true,
                    },
                ]}
            />
            {/* Header section */}
            <h1 className="font-bold text-3xl pb-4 pb-10 pt-8">{title}</h1>
            {header &&
                <div id="blog-image-wrap" className="relative w-full h-96 max-h-96 pb-2 mt-0 ml-auto mr-auto">
                    <Image
                        className="object-cover"
                        src={header}
                        quality={100}
                        alt={title}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            }
            {
                projecturl &&
                <a
                    href={projecturl}
                    target="_blank"
                    className='block mt-4 flex'
                >
                    <LinkIcon className='w-5' />
                    <p className='underline ml-2 break-words break-all'>{projecturl}</p>
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
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>;
                        } else if (c.contenttype === "text") {
                            const { size, style, word_count, content: textContent } = c.custom_attr;
                            // Split the text content with \n (empty space) and show each in a <p> element
                            return textContent.split("\r").map((tc: string, split_idx: number) => {
                                // console.log("+++ Project +++ TextElement htmlStr: " + tc)
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