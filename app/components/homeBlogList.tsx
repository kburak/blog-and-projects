import { getNumOfPosts } from "../lib/data";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Carousel from "./Carousel";
import PostGrid from "./postGrid";

export default async function HomeBlogList() {
    const blogPosts = (await getNumOfPosts(5, "Blog")) || [];
    return (
        <div id="home-blog-list" className="p-6 md:p-0 mt-6 mb-6">
            <p className="text-2xl">Blog Posts</p>
            <div id="carousel-padding" className="pt-4 pb-4">
                <div className="block md:hidden">
                    <Carousel posts={blogPosts} postType="blog" />
                </div>
                <div className="hidden md:block">
                    <PostGrid posts={blogPosts} postType="blog"/>
                </div>
            </div>
            <Link href="/blog">
                <div className="flex justify-end items-center text-blue-700">
                    <p className="underline text-lg">See All Blog Posts</p>
                    <ArrowRightIcon className="ml-2 w-6" />
                </div>
            </Link>
        </div>
    );
}