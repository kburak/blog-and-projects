import { getPost, getAllTags, getPostTags } from "@/app/lib/data";
import EditBlogForm from "@/app/components/edit-form-blog";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {

    // Get post data with content, Get tags for the post.
    const [blogData, allTags, postTags] = await Promise.all([getPost(slug), getAllTags(), getPostTags(slug)]);

    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto mt-20'>
            <h1 className='p-2 text-xl'>Edit Blog: {slug}</h1>
            <EditBlogForm blogData={blogData} allTags={allTags} postTags={postTags} />
        </div>
    );
}