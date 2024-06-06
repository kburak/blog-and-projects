import { getAllBlogs } from '../../../../lib/data';
import CreateBloForm from '@/app/components/create-form-blog';

export default async function Page() {
    return (
        <>
            <h1>Blog Create page</h1>
            <CreateBloForm />
        </>

    );
}