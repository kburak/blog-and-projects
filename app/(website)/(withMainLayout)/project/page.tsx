import ProjectList from "@/app/components/projectList";
import { Suspense } from "react";
import { ProjectListSkeleton } from '@/app/components/skeletons';

export default function Page({ searchParams }:
    {
        searchParams?: {
            query?: string,
            tags?: string,
        }
    }) {
    const searchQuery = searchParams?.query || '';
    const searchTags = searchParams?.tags?.split(',') || [];
    return (
        <Suspense fallback={<ProjectListSkeleton />}>
            <ProjectList searchQuery={searchQuery} searchTags={searchTags} />
            {/* <ProjectListSkeleton /> */}
        </Suspense>

    );
}