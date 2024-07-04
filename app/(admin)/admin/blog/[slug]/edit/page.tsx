import { getBlog } from "@/app/lib/data";
import EditBlogForm from "@/app/components/edit-form-blog";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {

    // Get post data with content
    const blogData = await getBlog(slug);

    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto'>
            <h1 className='p-2 text-xl'>Edit Blog: {slug}</h1>
            <EditBlogForm blogData={blogData} />
        </div>
    );
}