import { getAllPosts } from "@/app/lib/data";
import Link from "next/link";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Search from '@/app/components/search';
import DeleteButton from "@/app/components/deleteButton";

export default async function Page({ searchParams }:
    {
        searchParams?: {
            query?: string
        }
    }) {

    const query = searchParams?.query || '';
    const projectPosts = await getAllPosts(query, [], "Project");

    return (
        <div id="projectList-Posts" className="flex flex-col justify-center ml-auto mr-auto pl-2 pr-2 md:w-3/5 gap-4 mt-20">
            <div className="mt-4 mb-2 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Project..." />
                <Link
                    href="/admin/project/create"
                    className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    <span className="hidden md:block">Create Project</span>
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
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