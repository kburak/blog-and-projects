"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from "next/image";

const links = [
    {
        href: "/blog",
        title: "Blog"
    },
    {
        href: "/project",
        title: "Projects"
    },
    /* {
        href: "/",
        title: "Home"
    }, */
    {
        href: "/admin",
        title: "Admin"
    }
];

export default function WebMainNav({ isAdmin }: { isAdmin: boolean }) {
    // console.log("RENDER WEBNAV");
    const pathname = usePathname();
    const [navState, setNavState] = useState({
        openHam: false, // Open and close Hamburger menu
        showNav: true // Hide and show navigation
    });

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

    return (
        <div id="webMainNav">

            {/* Mobile Nav */}
            <div className={clsx(
                'flex md:hidden bg-customBlue justify-end items-center fixed w-full h-12 top-0 z-50',
                { "bg-transparent": pathname === "/" }
            )}>
                <Link
                    href="/"
                    className={clsx(
                        "absolute left-3 top-3 ml-auto mr-auto",
                        { "hidden": pathname === "/" }
                    )}
                >
                    <Image
                        className="text-white"
                        src="/logo-w-xl-transparent.png"
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </Link>
                <div className="relative">
                    <Bars3Icon
                        id="menu-button"
                        className={
                            clsx(
                                "w-12 p-2 border-1px",
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
                            "absolute top-12 right-0 bg-white",
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
            </div>

            {/* Desktop Nav */}
            <div className={clsx(
                'hidden md:flex bg-customBlue justify-end items-center fixed w-full h-12 top-0 left-0 z-50',
                { "bg-transparent": pathname === "/" }
            )}>
                <Link
                    href="/"
                    className={clsx(
                        "absolute left-3 top-3 ml-auto mr-auto",
                        { "hidden": pathname === "/" }
                    )}
                >
                    <Image
                        className="text-white"
                        src="/logo-w-xl-transparent.png"
                        alt="Logo"
                        width={25}
                        height={25}
                    />
                </Link>
                {
                    links.map(link => {
                        if (link.title === "Admin") {
                            if (isAdmin) {
                                return <Link
                                    key={`navLink-Admin`}
                                    href={link.href}
                                    className={clsx(
                                        'font-bold hover:bg-white hover:text-customBlue px-3 md:px-3 md:py-3',
                                        {
                                            'bg-white text-customBlue': pathname === link.href
                                        },
                                        {
                                            'text-white': pathname !== link.href
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
                                'font-bold hover:bg-white hover:text-customBlue px-3 md:px-3 md:py-3',
                                {
                                    'bg-white text-customBlue': pathname === link.href
                                },
                                {
                                    'text-white': pathname !== link.href
                                }
                            )}
                        >
                            {link.title}
                        </Link>;

                    })
                }
            </div>
        </div>
    );
}
