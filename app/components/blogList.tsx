import { getAllBlogs } from "@/app/lib/data";
import Link from "next/link";

export default async function BlogList() {
    const blogPosts = await getAllBlogs();

    return (
        <ul>
            {blogPosts?.map((b) => {
                return <li>
                    <Link href={`/blog/${b.slug}`}>
                        {b.title}
                    </Link>
                </li>
            })}
        </ul>
    );
}