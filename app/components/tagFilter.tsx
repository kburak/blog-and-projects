'use client';
import { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function TagFilter({ availableTags, fullWidth }: { availableTags: any, fullWidth: boolean }) {
    // Get current pathname, searchParams
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const TAGFILTER_REF = useRef<HTMLDivElement>(null);

    const [arrowState, setArrowState] = useState({ left: false, right: false });

    // Function that Handles tag click - Add / Remove tags from the search params
    function handleClick(clickedTag: string, selected: boolean) {
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

    function handleScroll() {
        if (TAGFILTER_REF.current) {
            // Get directions for which the icons should be shown/hidden
            const arrowDirections = getVisibleIcons();

            // Set state according to result.
            setArrowState(arrowDirections);
        }
    }

    function getVisibleIcons() {

        // console.log("+++ getVisibleIcons +++");

        if (TAGFILTER_REF.current) {
            const scrollElm = TAGFILTER_REF.current;
            // Use given elm
            const elmWidth = scrollElm.getBoundingClientRect().width;
            const alreadyScrolled = scrollElm.scrollLeft;
            // Sometimes, a difference of 1 pixel might be unavoidable due to how browsers calculate and round the dimensions. In such cases, you could implement a tolerance.
            const scrollableToRight = Math.abs(scrollElm.scrollWidth - alreadyScrolled - elmWidth) > 1;

            // console.log(`+++ SCROLL +++ elmWidth: ${elmWidth} alreadyScrolled: ${alreadyScrolled} scrollableToRight: ${scrollableToRight}`);

            // Is there scrollable space to the left and right?
            if (alreadyScrolled > 0 && scrollableToRight) {
                // LEFT and RIGHT
                // console.log("Scrollable space - YES LEFT and YES RIGHT");
                return { left: true, right: true };

            } else if (alreadyScrolled > 0 && !scrollableToRight) {
                // LEFT, not RIGHT?
                // console.log("Scrollable space - YES LEFT and NO RIGHT");
                return { left: true, right: false };
            } else if (alreadyScrolled <= 0 && scrollableToRight) {
                // Not LEFT, RIGHT?
                // console.log("Scrollable space - NO LEFT and YES RIGHT");
                return { left: false, right: true };
            } else {
                // Not LEFT, Not RIGHT
                // console.log("Scrollable space - NO LEFT and NO RIGHT");
                return { left: false, right: false };
            }
        }

        // Fallback, return both false
        return { left: false, right: false }
    }

    function handleArrowClick(direction: "left" | "right") {
        const scrollElm = TAGFILTER_REF.current;
        if (scrollElm) {
            const elmWidth = scrollElm.getBoundingClientRect().width;
            const alreadyScrolled = scrollElm.scrollLeft;
            const scrollableToRight = Math.abs(scrollElm.scrollWidth - alreadyScrolled - elmWidth) > 1;

            // Add / Substract scrolleft value depending on direction
            if (direction === "left" && alreadyScrolled > 0) {
                // console.log(`+++ DEBUG LEFT +++ alreadyScrolled: ${alreadyScrolled} elmWidth: ${elmWidth} Math.max((alreadyScrolled - elmWidth), 0): ${Math.max((alreadyScrolled - elmWidth), 0)}`);
                scrollElm.scrollLeft = Math.max((alreadyScrolled - elmWidth), 0);
            } else if (direction === "right" && scrollableToRight) {
                scrollElm.scrollLeft += elmWidth;
            }

        }
    }

    useEffect(() => {
        if (TAGFILTER_REF.current) {
            setArrowState(getVisibleIcons());
        }
    }, []); // Run only once

    if (!availableTags?.length) {
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
        <div id="tagFilter-Wrap">
            {/* Arrow icons */}
            <div id="tagFilter-Icons" className="relative">
                {arrowState.left && <ArrowLeftCircleIcon
                    className={clsx(
                        "bg-white text-gray-600 w-8 z-10 absolute -left-1",
                        { "lg:hidden": !fullWidth }
                    )}
                    onClick={() => handleArrowClick("left")}
                />}
                {arrowState.right && <ArrowRightCircleIcon
                    className={clsx(
                        "bg-white text-gray-600 w-8 z-10 absolute -right-1",
                        { "lg:hidden": !fullWidth }
                    )}
                    onClick={() => handleArrowClick("right")}
                />}
            </div>

            <div
                id="tagFilter-Tags"
                ref={TAGFILTER_REF}
                className={clsx(
                    "flex w-full h-auto overflow-x-auto scroll-smooth no-scrollbar", // no-scrollbar
                    // Not fullWidth ? => Then show 1/4 width and hide scrolling on LARGE
                    { "lg:overflow-x-hidden lg:flex-wrap": !fullWidth }
                )}
                onScroll={handleScroll}
            >
                {
                    availableTags?.map((tag: any) => {
                        // Does the tag.name exist in searchParams?
                        if (searchParams.get('tags')?.split(',').includes(tag.name)) {
                            // Show selected
                            return <button
                                key={`tag-${tag.name}-selected`}
                                className="min-w-fit text-sm mr-1 bg-blue-900 text-white rounded-md p-1 font-bold lg:mb-1"
                                onClick={() => { handleClick(tag.name, false) }}
                            >
                                {tag.name}
                            </button>
                        } else {
                            // Show unselected
                            return <button
                                key={`tag-${tag.name}-unselected`}
                                className="min-w-fit text-sm mr-1 rounded-md border border-gray-200 p-1 lg:mb-1"
                                onClick={() => { handleClick(tag.name, true) }}
                            >
                                {tag.name}
                            </button>
                        }

                    })
                }
            </div>

        </div>
    );
}