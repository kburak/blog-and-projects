import CreateBloForm from '@/app/components/create-form-blog';

export default async function Page() {
    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto'>
            <h1 className='p-2 text-xl'>Create new Blog</h1>
            <CreateBloForm />
        </div>

    );
}