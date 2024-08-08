'use client';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

export default function TagFilter({ availableTags, fullWidth }: { availableTags: any, fullWidth: Boolean }) {
    // Get current pathname, searchParams
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Function that Handles tag click - Add / Remove tags from the search params
    function handleClick(clickedTag: string, selected: Boolean) {
        // Create new URLSearchParams object with existing searchParams
        const params = new URLSearchParams(searchParams);

        // Is the tag selected / should be activated?
        if (selected) { // Activate / Add clickedTag

            // Do other tags already exist in searchParams?
            if (params.has('tags')) {
                // Yes, then Add clickedTag to the existing string
                const newVal = params.get('tags') + "," + clickedTag;
                params.set('tags', newVal);
            } else {
                // No, then just add it
                params.set('tags', clickedTag);
            }

        } else { // Deactivate / Remove clickedTag

            // Does the clickedTag exist in searchParams?
            if (params.has('tags') && params.get('tags')?.includes(clickedTag)) {

                // Is there more than one tag in search params?
                if (params.get('tags')?.includes(',')) {
                    // Multiple tags, extract clickedTag
                    const newVal = params.get('tags')?.split(',')
                        .filter((t) => t !== clickedTag)
                        .join();

                    if (newVal) params.set('tags', newVal);
                } else {
                    // One tag, just remove it completely.
                    params.delete('tags');
                }

            }

        }

        // Call Replace with new searchParams for client-side navigation
        replace(`${pathname}?${params.toString()}`);
    }

    if (!availableTags.length) {
        return (
            <div id="tagFilter" className={clsx(
                "w-full h-auto mb-4",
                { "lg:w-1/4 lg:h-64": !fullWidth }
            )}>
                <p className="mb-2 text-xs">FILTER BY</p>
                <button
                    key={`tag-noTag-unselected`}
                    className="mr-1 bg-gray-100 text-black text-sm rounded-md p-1"

                >
                    There are no tags...
                </button>
            </div>
        )
    }

    return (
        <div id="tagFilter" className={clsx(
            "w-full h-auto mb-4",
            { "lg:w-1/4 lg:h-64": !fullWidth }
        )}>
            <p className="mb-2 text-xs">FILTER BY</p>
            {
                availableTags?.map((tag: any) => {
                    // Does the tag.name exist in searchParams?
                    if (searchParams.get('tags')?.includes(tag.name)) {
                        // Show selected
                        return <button
                            key={`tag-${tag.name}-selected`}
                            className="mr-1 bg-blue-900 text-white text-sm rounded-md p-1"
                            onClick={() => { handleClick(tag.name, false) }}
                        >
                            {tag.name}
                        </button>
                    } else {
                        // Show unselected
                        return <button
                            key={`tag-${tag.name}-unselected`}
                            className="mr-1 rounded-md border text-sm border-gray-200 p-1"
                            onClick={() => { handleClick(tag.name, true) }}
                        >
                            {tag.name}
                        </button>
                    }

                })
            }
        </div>
    );
}