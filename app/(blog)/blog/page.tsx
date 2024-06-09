import { Suspense } from "react";
import { CardSkeleton } from "@/app/components/skeletons";
import BlogList from "@/app/components/blogList";

export default async function Page(){

    return (
        <Suspense fallback={<CardSkeleton />}>
            <BlogList />
        </Suspense>
    );
}