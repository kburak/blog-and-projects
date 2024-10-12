'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from "next/image";
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function Carousel({ posts, postType }: { posts: any[], postType: "blog" | "project" }) {
    /* 
        When image is swiped, highlight active dot. 
        When arrows are clicked, switch to 

        document.getElementById("swipe-container").scrollLeft
        document.getElementById("swipe-container").scrollWidth

    */
    const swipeContRef = useRef<HTMLDivElement>(null);
    const swipeElmRef = useRef<HTMLDivElement>(null);
    const [highlightIdx, setHighlightIdx] = useState(0);

    function handleHorizonalScroll(event: React.UIEvent<HTMLDivElement>) {
        console.log("++++ handleHorizonalScroll ++++");
        const target = event.target as HTMLElement; // event.target as HTMLElement casts the target to an HTMLElement, which has the scrollLeft property.

        if (swipeElmRef.current) {
            const oneElmWidth = swipeElmRef.current.getBoundingClientRect().width;
            const scrollLeft = target?.scrollLeft; // scrollLeft of swipe-container / how much scrolled currently? 

            // console.log("oneElmWidth:", oneElmWidth, "scrollLeft:", scrollLeft);

            // console.log("Remaining 0, then there can be N swipe elements in scrollLeft", scrollLeft % (oneElmWidth + 16)); // Add gap (16) to elmWidth to normalize
            // console.log("current elm idx:", scrollLeft / (oneElmWidth + 16));

            // Does exact N elements fit into scrollLeft?
            // Remaining 0, then there can be exact N swipe elements inside scrollLeft
            if (scrollLeft % (oneElmWidth + 16) === 0) {  // Add gap (16) to elmWidth to normalize
                // Update the state by calculation the amount of swipe elements fit into scrollLeft
                console.log("update highLightIdx state");
                setHighlightIdx(scrollLeft / (oneElmWidth + 16));
            }
        }
    }

    function increase() {
        console.log("++++ increase ++++");
        if (swipeContRef.current && swipeElmRef.current) {

            const scrollWidth = swipeContRef.current?.scrollWidth;
            const scrollLeft = swipeContRef.current?.scrollLeft;
            const oneElmWidth = swipeElmRef.current?.getBoundingClientRect().width;
            console.log("scrollWidth:", scrollWidth, "scrollLeft:", scrollLeft, "oneElmWidth:", oneElmWidth, "oneElmWidth + padding:", oneElmWidth + 16);

            const delta = scrollWidth - (scrollLeft + oneElmWidth); // Remaining scrollable area on right. Whole width - (scrolledLeft + shown/visible image width length)

            console.log("delta:", delta, "Can fit more to the right?:", delta >= (oneElmWidth + 16));

            // Can we still fit elm to the right?
            if (delta >= (oneElmWidth + 16)) {
                // Add one elm length to the left. / Scroll
                swipeContRef.current.scrollLeft += (oneElmWidth + 16);
            }

        }
    }

    function decrease() {
        console.log("++++ decrease ++++");
        if (swipeContRef.current && swipeElmRef.current) {

            const scrollWidth = swipeContRef.current?.scrollWidth;
            const scrollLeft = swipeContRef.current?.scrollLeft;
            const oneElmWidth = swipeElmRef.current?.getBoundingClientRect().width;
            console.log("scrollWidth:", scrollWidth, "scrollLeft:", scrollLeft, "oneElmWidth:", oneElmWidth, "oneElmWidth + padding:", oneElmWidth + 16);

            console.log("Can fit more to the left?:", scrollLeft >= (oneElmWidth + 16));

            // Can we scroll to the left? / Fit elm to the left
            if (scrollLeft >= (oneElmWidth + 16)) {
                // Add one elm length to the left. / Scroll
                swipeContRef.current.scrollLeft -= (oneElmWidth + 16);
            }

        }
    }

    function generateLogoGrid(num: number) {
        const grid = [];
        for (let i = 0; i < num; i++) {
            grid.push(
                <Image
                    className="text-white mb-1"
                    key={`grid-logo-${i}`}
                    src="/logo-w-xl-transparent.png"
                    alt="Logo"
                    width={25}
                    height={25}
                />
            );
        }
        return grid;
    }

    return (
        <div id="carousel" className="relative">
            <div className="flex absolute top-52 left-1/2 -translate-x-1/2 rounded items-center justify-around bg-gray-800 bg-opacity-75 w-auto h-4 z-10">
                {
                    posts?.map((p, idx) => (
                        <i
                            className={clsx(
                                "w-2 h-2 rounded z-10 ml-1 mr-1",
                                { "bg-gray-400": idx !== highlightIdx },
                                { "bg-white": idx === highlightIdx }
                            )}
                            key={`swipe-element-point-${p.slug}`}
                        ></i>
                    ))
                }
            </div>
            <div id="arrow-left-wrap" onClick={decrease} className="bg-gray-600 bg-opacity-50 z-10 absolute top-24 left-0 p-1">
                <ArrowLeftIcon className="w-8 text-white" />
            </div>
            <div id="arrow-right-wrap" onClick={increase} className="bg-gray-600 bg-opacity-50 z-10 absolute top-24 right-0 p-1">
                <ArrowRightIcon className="w-8 text-white" />
            </div>
            <div
                id="swipe-container"
                ref={swipeContRef}
                onScroll={handleHorizonalScroll}
                className="flex overflow-auto overflow-x-scroll snap-x snap-mandatory no-scrollbar gap-4"
            >
                {
                    posts?.map(p => {
                        return (
                            <div
                                id={`swipe-element-${p.slug}`}
                                ref={swipeElmRef}
                                key={`swipe-element-${p.slug}`}
                                className="snap-start min-w-full min-h-60"
                            >
                                <Link href={`/${postType}/${p.slug}`}>
                                    {p.header ?
                                        <div id="post-image-cover" className="block relative w-full h-60 w-auto">
                                            <Image
                                                className="object-cover"
                                                src={p.header}
                                                quality={75}
                                                alt={p.title}
                                                fill={true}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                /* 
                                                (max-width: 768px) 100vw: If the viewport width is 768 pixels or less, the image should take up 100% of the viewport width (100vw).
                                                (max-width: 1200px) 50vw: If the viewport width is between 769 pixels and 1200 pixels, the image should take up 50% of the viewport width (50vw).
                                                33vw: If the viewport width is greater than 1200 pixels, the image should take up 33% of the viewport width (33vw). 
                                                */
                                                priority={false}
                                            />
                                        </div>
                                        :
                                        <div
                                            id="empty-placeholder"
                                            className="grid grid-rows-4 grid-flow-col items-center gap-4 bg-gray-100 w-full h-60 p-4"
                                        >
                                            {generateLogoGrid(32)}
                                        </div>
                                    }
                                    <p className="text-black text-xl text-customBlue font-bold mt-2">{p.title}</p>
                                    <p className="text-black text-base">{p.summary.length > 70 ? p.summary.substring(0, 70) + "..." : p.summary}</p>
                                </Link>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
}