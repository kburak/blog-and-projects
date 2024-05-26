import { getBlogs } from '../../../../lib/data';
import CreateBlog from '@/app/components/create-form-blog';

export default async function Page() {

    const blogs = await getBlogs();

    return (
        <>
            <h1>Blog Create page</h1>
            {
                blogs?.map(b =>
                    <p>{b.title}</p>
                )
            }
            <CreateBlog />
        </>

    );
}