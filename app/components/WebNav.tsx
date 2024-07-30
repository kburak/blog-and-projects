"use client";

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const MOBILE_NAV_HIDE = 150;

export default function WebNav({ goBackLink }: { goBackLink: string }) {
    const [showNav, setShowNav] = useState(true); // Hide and show navigation
    const scrolled = useRef(0);

    // Show and hide navigation completelty on mobile depending on scroll direction
    function showAndHideNav() {

        setShowNav(prevState => {

            // Scrolling down or up?
            if (prevState && window.scrollY > scrolled.current && window.scrollY > MOBILE_NAV_HIDE) {
                // Not yet hidden and Scrolling down and Already scolled more than MOBILE_NAV_HIDE px?
                return false;
            } else if (!prevState && window.scrollY < scrolled.current) {
                // Already hidden and Scrolling up?
                return true;
            }

            // Otherwise, don't do anything, return previous state.
            return prevState;

        });

        // Set scrolled to the current scrollY
        scrolled.current = window.scrollY;

    }

    useEffect(() => {
        // Run at each scroll
        window.addEventListener("scroll", showAndHideNav);

        // Clean up the listener on unmount.
        return () => {
            window.removeEventListener("scroll", showAndHideNav);
        }
    });

    return (
        <div className={clsx(
            'transition-all ease-in duration-100 bg-blue-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 left-0 z-10',
            {
                "top-0": showNav
            },
            {
                "-top-12": !showNav
            }
        )}>
            <Link
                href={goBackLink}
                className='absolute top-2 left-2 inline text-white w-8 z-10'
            >
                <ArrowLeftIcon />
            </Link>
        </div>
    );
}