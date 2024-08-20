'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PowerIcon, BookOpenIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { handleSignOut } from '../lib/actions';
import Image from 'next/image';

const links = [
    {
        href: "/admin/blog",
        text: "Blog",
        icon: BookOpenIcon
    },
    {
        href: "/admin/project",
        text: "Projects",
        icon: ClipboardDocumentListIcon
    },
    {
        href: "/admin",
        text: "Admin Home",
        icon: HomeIcon
    },
    {
        href: "/",
        text: "Leave Admin",
        icon: PowerIcon
    }
];

export default function AdminNav() {
    const pathname = usePathname();
    return (
        <div className='flex space-x-4 p-3'>
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
                    const LinkIcon = link.icon;
                    if (link.text === "Leave Admin") {
                        return <form
                            key={`link-${link.text}`}
                            action={() => {
                                handleSignOut();
                            }}
                            className='inline content-center text-white hover:bg-gray-100 hover:text-red-600 md:flex-none md:justify-start px-3 md:px-3 h-12'
                        >
                            <button>
                                <LinkIcon className="w-6 mr-auto ml-auto mt-3 md:mt-0" />
                            </button>
                        </form>
                    } else {
                        return <Link
                            key={`link-${link.text}`}
                            href={link.href}
                            className={clsx(
                                'inline text-white hover:bg-gray-100 hover:text-red-600 md:flex-none md:justify-start px-3 md:px-3 h-12',
                                {
                                    'bg-gray-100 text-red-600': pathname === link.href
                                }
                            )}
                        >
                            <LinkIcon className="w-6 mr-auto ml-auto mt-3 md:mt-0" />
                            <p className='hidden md:block'>{link.text}</p>
                        </Link>
                    }
                })
            }
        </div>
    );
}