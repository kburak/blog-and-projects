import CreateProjectForm from "@/app/components/create-form-project";

export default function Page() {
    return (
        <div className='w-full md:max-w-2xl lg:max-w-4xl mt-0 mb-0 ml-auto mr-auto mt-20'>
            <h1 className='p-2 text-xl'>Create new Project</h1>
            <CreateProjectForm />
        </div>

    );
}