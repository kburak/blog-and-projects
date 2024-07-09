import { Suspense } from "react";
import { BlogListSkeleton } from "@/app/components/skeletons";
import BlogList from "@/app/components/blogList";

export default async function Page(){

    return (
        <Suspense fallback={<BlogListSkeleton />}>
            <BlogList />
        </Suspense>
    );
}