import { getAllPosts } from "../lib/data";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function ProjectList() {
    const projects = await getAllPosts('', 'Project');

    return (
        <div className="md:max-w-2xl lg:max-w-4xl mb-0 ml-auto mr-auto mt-12">
            <div className="pl-6 pr-6 md:pl-0 md:pr-0 pt-8">
                <h1 className="font-bold text-2xl pb-4">Projects</h1>
                <div id="projectList-Wrap" className="flex flex-wrap justify-between">
                    <div id="projectList-Navigation" className="w-full h-auto mb-4">
                        <p className="mb-2">Filter by</p>
                        <span className="mr-1 bg-blue-100 rounded-md p-1">Apple</span>
                        <span className="mr-1 bg-blue-100 rounded-md p-1">Peach</span>
                    </div>
                    <div id="projectList-Posts" className="w-full gap-4 mt-4">
                        {projects?.map((p, idx) => {
                            return <Link
                                id={`project-${idx}`}
                                href={`/project/${p.slug}`}
                                className="md:flex md:flex-row min-h-36 w-full border-blue-100 border-solid border-2 rounded-xl overflow-hidden mb-2"
                                key={`project-${p.slug}`}
                            >
                                {p.header &&
                                    <div id="projectImage-Wrap" className='relative w-full h-40 md:w-48 md:min-w-48'>
                                        <Image
                                            className="object-cover"
                                            src="https://cdn.pixabay.com/photo/2024/06/20/17/03/fishing-8842590_1280.jpg"
                                            quality={75}
                                            alt="Placeholder image"
                                            fill={true}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                        />
                                    </div>
                                }
                                <div id="projectContent-Wrap" className='p-2 md:p-4 flex w-full'>
                                    <div className="flex-grow relative">
                                        <h2 className="text-xl text-blue-700">{p.title}</h2>
                                        <p>{p.summary}</p>
                                    </div>
                                    <ArrowRightIcon className="w-8 h-8 min-w-8 self-center text-blue-700" />
                                </div>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}