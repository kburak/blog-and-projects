import { getNumOfPosts } from "../lib/data";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Carousel from "./Carousel";
import PostGrid from "./postGrid";

export default async function HomeProjectList() {
    const projects = (await getNumOfPosts(5, "Project")) || [];
    return (
        <div id="home-projects-list" className="p-6 md:p-0 mt-6 mb-6">
            <p className="text-2xl">Projects</p>
            <div id="carousel-padding" className="pt-4 pb-4">
                <div className="block md:hidden">
                    <Carousel posts={projects} postType="project" />
                </div>
                <div className="hidden md:block">
                    <PostGrid posts={projects} postType="project"/>
                </div>
            </div>
            <Link href="/project">
                <div className="flex justify-end items-center text-blue-700">
                    <p className="underline text-lg">See All Projects</p>
                    <ArrowRightIcon className="ml-2 w-6" />
                </div>
            </Link>
        </div>
    );
}