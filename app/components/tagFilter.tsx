'use client';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function TagFilter({ availableTags }: { availableTags: any }) {
    // Get current pathname, searchParams
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Function that Handles tag click
    function handleClick(clickedTag: string, selected: Boolean) {
        // Determine if a tag is selected or unselected and add it or remove it from seachParams accordingly
        const params = new URLSearchParams(searchParams);
        if (selected) {
            // Do tags already exist in searchParams?
            if (params.has('tags')) {
                // Yes, then Add to the existing one
                const newVal = params.get('tags') + "," + clickedTag;
                params.set('tags', newVal);
            } else {
                // No, then just add it
                params.set('tags', clickedTag);
            }
        } else {
            // Do the clicked tag exist in searchParams?
            if (params.has('tags') && params.get('tags')?.includes(clickedTag)) {
                // Yes, then remove from the existing one
                if (params.get('tags')?.includes(',')) {
                    // If there are multiple tags
                    const newVal = params.get('tags')?.split(',')
                        .filter((t) => t !== clickedTag)
                        .join();

                    if(newVal) params.set('tags', newVal);
                } else {
                    // If there is only one tag, just remove it completely.
                    params.delete('tags');
                }
            }
        }

        // Call Replace with new searchParams for client-side navigation
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div id="blogList-Navigation" className="w-full h-auto lg:w-1/4 lg:h-64 mb-4">
            {/* <p className="mb-2">Filter by</p> */}
            {
                availableTags?.map((tag: any) => {
                    // Does the tag.name exist in searchParams?
                    if (searchParams.get('tags')?.includes(tag.name)) {
                        // Show selected
                        return <button
                            key={`tag-${tag.name}-selected`}
                            className="mr-1 bg-blue-300 rounded-md p-1"
                            onClick={() => { handleClick(tag.name, false) }}
                        >
                            {tag.name}
                        </button>
                    } else {
                        // Show unselected
                        return <button
                            key={`tag-${tag.name}-unselected`}
                            className="mr-1 rounded-md p-1"
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