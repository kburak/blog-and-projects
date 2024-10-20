import { getNumOfPosts } from "../lib/data";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Carousel from "./Carousel";
import PostGrid from "./postGrid";

export default async function HomeProjectList() {
    const projects = (await getNumOfPosts(4, "Project")) || [];
    return (
        <div id="home-projects-list" className="p-6 md:p-0 mt-6 mb-6 md:mt-12 md:mb-12">
            <p className="font-bold text-2xl">Latest Projects</p>
            <div id="carousel-padding" className="pt-4 pb-4">
                <div className="block md:hidden">
                    <Carousel posts={projects} postType="project" />
                </div>
                <div className="hidden md:block">
                    <PostGrid posts={projects} postType="project"/>
                </div>
            </div>
            <Link href="/project" className="flex w-full justify-end mt-6">
                <div className="flex items-center text-customBlue border-customBlue border-2 border-solid p-1 rounded hover:bg-customBlue hover:text-white">
                    <p className="text-lg font-bold">See All Projects</p>
                    <ArrowRightIcon className="ml-2 w-6" />
                </div>
            </Link>
        </div>
    );
}