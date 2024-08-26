import { getPost, getAllTags, getPostTags } from "@/app/lib/data";
import EditProjectForm from "@/app/components/edit-form-project";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {

    // Get project data with content, Get tags for the post.
    const [projectData, allTags, postTags] = await Promise.all([getPost(slug), getAllTags(), getPostTags(slug)]);

    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto mt-20'>
            <h1 className='p-2 text-xl'>Edit Project: {slug}</h1>
            <EditProjectForm projectData={projectData} allTags={allTags} postTags={postTags} />
        </div>
    );
}