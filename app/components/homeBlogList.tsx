import { getNumOfPosts } from "../lib/data";
import Carousel from '@/app/components/Carousel';
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default async function HomeBlogList() {
    const blogPosts = (await getNumOfPosts(5, "Blog")) || [];
    return (
        <div id="home-blog-list" className="p-6">
            <p className="text-2xl">Blog Posts</p>
            <div id="carousel-padding" className="pt-4 pb-4">
                <Carousel posts={blogPosts} postType="blog"/>
            </div>
            <Link href="/blog">
                <div className="flex justify-end items-center text-blue-700 text-xl">
                    <p className="underline">See All Blog Posts</p>
                    <ArrowRightIcon className="ml-2 w-6" />
                </div>
            </Link>
        </div>
    );
}