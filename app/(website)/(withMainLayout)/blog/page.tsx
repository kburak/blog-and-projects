import { Suspense } from "react";
import { BlogListSkeleton } from "@/app/components/skeletons";
import BlogList from "@/app/components/blogList";

export default async function Page({ searchParams }:
    {
        searchParams?: {
            query?: string,
            tags?: string,
        }
    }) {

    const searchQuery = searchParams?.query || '';
    const searchTags = searchParams?.tags?.split(',') || []; 
    return (
        <Suspense fallback={<BlogListSkeleton />}>
            <BlogList searchQuery={searchQuery} searchTags={searchTags}/>
        </Suspense>
    );
}