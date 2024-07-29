"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const links = [
    {
        href: "/blog",
        title: "Blog"
    },
    {
        href: "/project",
        title: "Projects"
    },
    {
        href: "/",
        title: "Home"
    },
    {
        href: "/admin",
        title: "Admin"
    }
];

const MOBILE_NAV_WIDTH = 600;
const MOBILE_NAV_HIDE = 100;

export default function WebNav({ isAdmin }: { isAdmin: boolean }) {
    console.log("RENDER WEBNAV");
    const pathname = usePathname();
    const [navState, setNavState] = useState({
        showHam: false, // Show and hide hamburger menu
        openHam: false, // Open and close Hamburger menu
        showNav: true // Hide and show navigation
    });
    const scrolled = useRef(0);

    // Show and Hide Mobile Hamburger Nav
    function showAndHideHam() {

        if (window.innerWidth <= MOBILE_NAV_WIDTH) {
            setNavState(prevState => ({
                ...prevState,
                showHam: true
            }));
        } else if (window.innerWidth > MOBILE_NAV_WIDTH) {
            setNavState(prevState => ({
                ...prevState,
                showHam: false
            }));
        }

        setNavState(prevState => {
            console.log(prevState);
            return prevState;
        });
    }

    // Handle closing Mobile Hamburger Nav
    function handleCloseHam() {
        setNavState(prevState => ({
            ...prevState,
            openHam: false
        }));
    }

    // Toggle open/close Mobile Hamburger Nav
    function toggleOpenHam() {
        setNavState(prevState => ({
            ...prevState,
            openHam: !prevState.openHam
        }))
    }

    // Show and hide navigation completelty on mobile depending on scroll direction
    function showAndHideNav() {

        setNavState(prevState => {
            // Are we on mobile / showing Hamburger navigation?
            if (prevState.showHam) {

                // Scrolling down or up?
                if (prevState.showNav && window.scrollY > scrolled.current && window.scrollY > MOBILE_NAV_HIDE) {
                    // Not yet hidden and Scrolling down and exceeded the limit(already scolled more than 100px)?
                    return {
                        ...prevState,
                        showNav: false // Hide navigation
                    }
                } else if (!prevState.showNav && window.scrollY < scrolled.current) {
                    // Already hidden and Scrolling up?
                    return {
                        ...prevState,
                        showNav: true // Show navigation
                    }
                }

            }

            // Otherwise, don't do anything, return previous state.
            return prevState;

        });

        // Set scrolled to the current scrollY
        scrolled.current = window.scrollY;

    }

    useEffect(() => {

        // Run after first render and set state
        showAndHideHam();

        // Run at each resize
        window.addEventListener("resize", showAndHideHam);

        // Run at each scroll
        window.addEventListener("scroll", showAndHideNav);

        // Clean up the listener on unmount.
        return () => {
            window.removeEventListener("resize", showAndHideHam);
            window.removeEventListener("scroll", showAndHideNav);
        }

    }, []); // Run only once

    if (navState.showHam) {
        return <div className={clsx(
            'bg-blue-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10',
            {
                "hidden": !navState.showNav
            }
        )}>
            <div className="relative">
                <Bars3Icon
                    id="menu-button"
                    className={
                        clsx(
                            "md:hidden w-12 p-2  border-1px",
                            {
                                "bg-white text-black": navState.openHam
                            },
                            {
                                "text-white": !navState.openHam
                            }
                        )
                    }
                    onClick={toggleOpenHam}
                />
                <nav
                    id="mobile-menu"
                    className={clsx(
                        "absolute top-12 right-0 md:flex flex-col md:flex-row md:items-center md:space-x-6 bg-white md:bg-transparent",
                        {
                            "block": navState.openHam
                        },
                        {
                            "hidden": !navState.openHam
                        }
                    )}>
                    {
                        links.map(link => {
                            if (link.title === "Admin") {
                                if (isAdmin) {
                                    return <Link
                                        key={`mobileNavLink-Admin}`}
                                        href={link.href}
                                        onClick={handleCloseHam}
                                        className="block px-12 py-4 text-gray-800 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-500"
                                    >
                                        {link.title}
                                    </Link>;
                                } else {
                                    return;
                                }
                            }
                            return <Link
                                key={`mobileNavLink-${link.title}`}
                                href={link.href}
                                onClick={handleCloseHam}
                                className="block px-12 py-4 text-gray-800 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-500"
                            >
                                {link.title}
                            </Link>;
                        })
                    }
                </nav>
            </div>
        </div>;
    } else {
        return <div className='bg-blue-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10'>
            {
                links.map(link => {
                    if (link.title === "Admin") {
                        if (isAdmin) {
                            return <Link
                                key={`navLink-Admin`}
                                href={link.href}
                                className={clsx(
                                    'text-white content-center hover:bg-gray-100 hover:text-blue-600 px-3 md:px-3 h-12',
                                    {
                                        'text-white text-opacity-10': pathname === link.href
                                    }
                                )}
                            >
                                {link.title}
                            </Link>;
                        } else {
                            return;
                        }
                    }
                    return <Link
                        key={`navLink-${link.title}`}
                        href={link.href}
                        className={clsx(
                            'text-white content-center hover:bg-gray-100 hover:text-blue-600 px-3 md:px-3 h-12',
                            {
                                'text-white text-opacity-10': pathname === link.href
                            }
                        )}
                    >
                        {link.title}
                    </Link>;

                })
            }
        </div>
    }
}
