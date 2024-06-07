import { getBlog } from "@/app/lib/data";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, atomOneDark, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Get post data with content
    const blogData = await getBlog(slug);
    const { title, summary, createdAt, updatedAt, content, postType } = blogData ?? {};

    const options: RTCSetParameterOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"/* ,
        timeZone: "Australia/Sydney" */
    };

    return (
        <>
            <p>Type: {postType}</p>
            <h1 className="font-bold">{title}</h1>
            <h2>Summary</h2>
            <p>{summary}</p>
            <p>Created at: {new Intl.DateTimeFormat('de-DE', options).format(createdAt)}</p>
            <p>Updated at: {new Intl.DateTimeFormat('de-DE', options).format(updatedAt)}</p>

            <hr />

            {
                content?.map(c => {
                    if (c.contenttype === "image") {
                        const { url, caption, size } = c.custom_attr;
                        return <img className={
                            `
                            ${size === 'small' && 'w-1/4 h-auto'}
                            ${size === 'normal' && 'w-1/2 h-auto'}
                            ${size === 'large' && 'w-screen h-auto"'}
                            `
                        }
                            src={url}
                            alt={caption}
                        />
                    } else if (c.contenttype === "text") {
                        const { size, style, word_count, content } = c.custom_attr;
                        return <p className={
                            `
                            ${size === 'h1' && 'text-xl'}
                            ${size === 'p' && 'text-base'}
                            ${style === 'bold' && 'font-bold'}
                            ${style === 'italic' && 'italic'}
                            ${style === 'normal' && 'font-normal'}
                            `
                        }>
                            {content}
                        </p>
                    } else if (c.contenttype === "code") {
                        const { language, code } = c.custom_attr;
                        return <SyntaxHighlighter language={language} style={docco /* dark atomOneDark github */}>
                            {code}
                        </SyntaxHighlighter>
                    }
                })
            }


            <p>{JSON.stringify(blogData)}</p>
        </>

    )
}