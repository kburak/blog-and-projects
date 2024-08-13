import Image from "next/image";
import Link from "next/link";
import { inter, lusitana } from '@/app/lib/fonts';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <main className={`${inter.className} mt-8`}>
      {/* <div className="z-10 w-full text-5xl max-w-6xl items-center justify-between text-sm lg:flex">
        <p>
          <Link className='underline' href='/blog'>Blog</Link>
          and
          <Link className='underline' href='/project'>Projects</Link>
        </p>
      </div> */}
      <div className="bg-blue-700 pb-8">
        <div className='min-w-screen h-auto p-6 text-white md:max-w-2xl lg:max-w-4xl text-center ml-auto mr-auto'>
          <RocketLaunchIcon className="w-16 mb-8 text-white ml-auto mr-auto" />
          <p className='text-2xl leading-relaxed'>Hello I'm Burak. Welcome to my blog and projects website. Here I present my work and write blog posts about topics that I'm interested in.</p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1">
          <h2>Blog Posts</h2>
          <Link
            href={`/blog/`}
          >
            Blog
          </Link>
        </div>
        <div className="flex-1">
          <h2>Projects</h2>
          <Link
            href={`/projects/`}
          >
            Projects
          </Link>
        </div>

      </div>

    </main>
  );
}
