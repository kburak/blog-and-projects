import { getBlog } from "@/app/lib/data";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Get post data with content
    const blogData = await getBlog(slug);

    return (
        <>
            <h1>{slug} page</h1>
            <p>{JSON.stringify(blogData)}</p>
        </>

    )
}