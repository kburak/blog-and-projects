import Image from "next/image";
import Link from "next/link";
import { inter, lusitana } from '@/app/lib/fonts';
import HomeProjectList from "@/app/components/homeProjectList";
import HomeBlogList from '@/app/components/homeBlogList';
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={`${inter.className} mt-8`}>
      {/* Header section with logo and about me text */}
      <div className="bg-blue-700 pb-8">
        <div className='min-w-screen h-auto p-6 text-white md:max-w-2xl lg:max-w-4xl text-center ml-auto mr-auto'>
          <Image
            className="mb-8 text-white ml-auto mr-auto"
            src="/logo-w-xl-transparent.png"
            alt="Logo"
            width={75}
            height={75}
          />
          <p className='text-2xl leading-relaxed'>Hello I'm Burak. Welcome to my blog and projects website. Here I present my work and write blog posts about topics that I'm interested in.</p>
        </div>
      </div>

      <div className="">
        <Suspense fallback="Loading...">
          <HomeProjectList />
        </Suspense>

        <Suspense fallback="Loading...">
          <HomeBlogList />
        </Suspense>

      </div>

    </main >
  );
}
