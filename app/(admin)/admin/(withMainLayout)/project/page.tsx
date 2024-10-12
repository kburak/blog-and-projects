import { getAllPosts, getAllTags } from "@/app/lib/data";
import Link from "next/link";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Search from '@/app/components/search';
import DeleteButton from "@/app/components/deleteButton";
import TagFilter from "@/app/components/tagFilter";

export default async function Page({ searchParams }:
    {
        searchParams?: {
            query?: string,
            tags?: string,
        }
    }) {

    const searchQuery = searchParams?.query || '';
    const searchTags = searchParams?.tags?.split(',') || [];
    const projectPosts = await getAllPosts(searchQuery, searchTags, "Project");
    const projectTags = await getAllTags("Project");

    return (
        <div id="projectList-Posts" className="ml-auto mr-auto pl-2 pr-2 md:w-3/5 gap-4">
            <div id="filter-option" className="w-full bg-white sticky top-0">
                <div id="white-space" className="h-16 md:h-24 bg-white"></div>
                <div className="mb-2 flex items-center justify-between gap-2">
                    <Search placeholder="Search project..." />
                    <Link
                        href="/admin/project/create"
                        className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        <span className="hidden md:block">Create Project</span>
                        <PlusIcon className="h-5 md:ml-4" />
                    </Link>
                </div>
                <p className="mb-2 text-xs">FILTER BY</p>
                <TagFilter availableTags={projectTags} fullWidth={true} />
            </div>
            {projectPosts?.map((b) => {
                return <div className="flex" key={`projectPost-${b.slug}`}>
                    <div className="flex-grow">
                        <h2 className="text-xl">{b.title}</h2>
                    </div>
                    <Link href={`/admin/project/${b.slug}/edit`} className="mb-5 rounded-md border p-2 hover:bg-gray-100 mr-1">
                        <PencilIcon className="w-5" />
                    </Link>
                    {/* `/project/${b.slug}` */}
                    <DeleteButton postId={b.id} posttype="project" />
                </div>

            })}
        </div>
    );
}