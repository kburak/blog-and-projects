import { getNumOfPosts } from "../lib/data";

export default async function HomeProjectList() {
    const projects = await getNumOfPosts(5, "Project");
    return (
        <div id="home-projects.list" className="p-6">
            <p className="text-2xl">Projects</p>
            <div
                id="swipe-container"
                className="flex overflow-auto overflow-x-scroll snap-x snap-mandatory no-scrollbar gap-2"
            >
                {
                    projects?.map(project => {
                        return (
                            <div
                                id={`swipe-element-${project.slug}`}
                                className="snap-start bg-indigo-500 min-w-full p-6"
                            >
                                {project.title}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}