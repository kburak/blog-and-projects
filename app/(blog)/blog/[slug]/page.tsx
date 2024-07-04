import { getBlogMetadata } from "@/app/lib/data";
import Blog from "@/app/components/blog";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from 'react';
import { BlogSkeleton } from "@/app/components/skeletons";


export async function generateMetadata(
    { params, searchParams }: { params: { slug: string }, searchParams: any },
    parent: ResolvingMetadata
): Promise<Metadata> {

    const data = await getBlogMetadata(params.slug);

    return {
        title: data?.title,
        description: data?.summary
    }

}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    return (
        <main>
            {/* <BlogSkeleton /> */}
            <Suspense fallback={<BlogSkeleton />}>
                <Blog slug={slug} />
            </Suspense>
        </main>
    );
}