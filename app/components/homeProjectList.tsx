import { getNumOfPosts } from "../lib/data";
import Carousel from '@/app/components/Carousel';
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function HomeProjectList() {
    const projects = (await getNumOfPosts(5, "Project")) || [];
    return (
        <div id="home-projects-list" className="p-6">
            <p className="text-2xl">Projects</p>
            <div id="carousel-padding" className="pt-4 pb-4">
                <Carousel posts={projects} postType="project" />
            </div>
            <Link href="/project">
                <div className="flex justify-end items-center text-blue-700 text-xl">
                    <p className="underline">See All Projects</p>
                    <ArrowRightIcon className="ml-2 w-6" />
                </div>
            </Link>
        </div>
    );
}