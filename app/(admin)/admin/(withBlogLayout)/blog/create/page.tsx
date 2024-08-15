import CreateBloForm from '@/app/components/create-form-blog';
import { getAllTags } from '@/app/lib/data';

export default async function Page() {
    const allTags = await getAllTags() ?? [];
    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto mt-20'>
            <h1 className='p-2 text-xl'>Create new Blog</h1>
            <CreateBloForm allTags={allTags} />
        </div>

    );
}
