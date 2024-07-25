"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
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

export default function WebNav(props: { isAdmin: boolean }) {
    const pathname = usePathname();
    const { isAdmin } = props;
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    // console.log("RENDER WebNav", showMobileNav);

    function toggleMobileNav() {
        setShowMobileNav(prevState => {
            if (!prevState && window.innerWidth <= MOBILE_NAV_WIDTH) {
                return true;
            } else if (prevState && window.innerWidth > MOBILE_NAV_WIDTH) {
                return false;
            }
            return prevState;
        });
    }

    function handleOpenMobileNav() {
        setIsMobileNavOpen(prevState => !prevState);
    }

    useEffect(() => {

        // Run after first render and set state
        toggleMobileNav();

        // Run at each resize
        window.addEventListener("resize", toggleMobileNav);

        // Clean up the listener on unmount.
        return () => {
            window.removeEventListener("resize", toggleMobileNav);
        }

    }, []); // Run only once


    return (
        <div className='bg-blue-700 bg-opacity-95 flex justify-end items-center fixed w-full h-12 top-0 left-0 z-10'>
            {showMobileNav ?
                <div className='relative'>
                    <Bars3Icon
                        id="menu-button"
                        className={
                            clsx(
                                "md:hidden w-12 p-2 text-white border-1px",
                                {
                                    "bg-white text-black": isMobileNavOpen
                                }
                            )
                        }
                        onClick={handleOpenMobileNav}
                    />
                    <nav
                        id="mobile-menu"
                        className={clsx(
                            "absolute top-12 right-0 md:flex flex-col md:flex-row md:items-center md:space-x-6 bg-white md:bg-transparent",
                            {
                                "block": isMobileNavOpen
                            },
                            {
                                "hidden": !isMobileNavOpen
                            }
                        )}>
                        {
                            links.map(link => {
                                if (link.title === "Admin") {
                                    if (isAdmin) {
                                        return <Link
                                            key={`mobileNavLink-Admin}`}
                                            href={link.href}
                                            onClick={() => setIsMobileNavOpen(false)}
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
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className="block px-12 py-4 text-gray-800 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-500"
                                >
                                    {link.title}
                                </Link>;
                            })
                        }
                    </nav>
                </div>

                :
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
        </div >
    );
}
