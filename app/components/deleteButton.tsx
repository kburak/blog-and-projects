import { deleteBlog } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton(props: {
    postId: string
}) {
    const { postId } = props;
    const deleteBlogWithId = deleteBlog.bind(null, postId);
    return <form action={deleteBlogWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
            <TrashIcon className="w-5" />
        </button>
    </form>
};