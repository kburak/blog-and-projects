import Image from "next/image";
import HomeProjectList from "@/app/components/homeProjectList";
import HomeBlogList from '@/app/components/homeBlogList';
import { Suspense } from "react";
import { HomeProjectListSkeleton, HomeBlogListSkeleton } from "@/app/components/skeletons";
import Link from 'next/link';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <main className="">
      {/* Header section with logo and about me text */}
      <div
        className="relative bg-blue-700 pb-8 pt-12 z-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Asvgjs%3D%22http%3A%2F%2Fsvgjs.dev%2Fsvgjs%22%20viewBox%3D%220%200%201422%20800%22%20id%3D%22qqquad%22%3E%3Cg%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%20stroke-width%3D%221%22%20stroke%3D%22%23a1a9bf%22%3E%3Cpolygon%20points%3D%221422%2C0%201066.5%2C200%201422%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C200%201066.5%2C0%20711%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C300%201066.5%2C200%201066.5%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C300%20888.75%2C200%20711%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C400%20711%2C300%20711%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C400%201066.5%2C300%20888.75%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C200%201066.5%2C400%201422%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C0%20711%2C200%20355.5%2C0%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C200%20355.5%2C0%200%2C0%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C400%20355.5%2C200%200%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C200%20533.25%2C300%20533.25%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C300%20355.5%2C200%20533.25%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C300%20355.5%2C400%20533.25%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C300%20711%2C400%20533.25%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C400%20711%2C600%20355.5%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C600%20355.5%2C400%200%2C600%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C800%200%2C600%20355.5%2C600%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C600%20711%2C800%20355.5%2C800%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C400%201066.5%2C600%201066.5%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C400%201066.5%2C500%20888.75%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C400%20888.75%2C500%20711%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C600%20888.75%2C500%20711%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C500%201066.5%2C600%20888.75%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C800%201066.5%2C600%201066.5%2C800%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C800%201066.5%2C600%201422%2C600%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
          // backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Asvgjs%3D%22http%3A%2F%2Fsvgjs.dev%2Fsvgjs%22%20viewBox%3D%220%200%201422%20800%22%20id%3D%22qqquad%22%3E%3Cg%20shape-rendering%3D%22crispEdges%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%20stroke-width%3D%221%22%20stroke%3D%22%23a1a9bf%22%3E%3Cpolygon%20points%3D%221422%2C0%201066.5%2C200%201422%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C200%201066.5%2C0%20711%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C300%201066.5%2C200%201066.5%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C300%20888.75%2C200%20711%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C400%20711%2C300%20711%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C400%201066.5%2C300%20888.75%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C200%201066.5%2C400%201422%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C0%20711%2C200%20355.5%2C0%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C200%20355.5%2C0%200%2C0%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C400%20355.5%2C200%200%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C200%20533.25%2C300%20533.25%2C200%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C300%20355.5%2C200%20533.25%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C300%20355.5%2C400%20533.25%2C300%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C300%20711%2C400%20533.25%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C400%20711%2C600%20355.5%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C600%20355.5%2C400%200%2C600%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22355.5%2C800%200%2C600%20355.5%2C600%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C600%20711%2C800%20355.5%2C800%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C400%201066.5%2C600%201066.5%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C400%201066.5%2C500%20888.75%2C400%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22888.75%2C400%20888.75%2C500%20711%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C600%20888.75%2C500%20711%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221066.5%2C500%201066.5%2C600%20888.75%2C500%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%22711%2C800%201066.5%2C600%201066.5%2C800%22%3E%3C%2Fpolygon%3E%3Cpolygon%20points%3D%221422%2C800%201066.5%2C600%201422%2C600%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3Cg%20fill%3D%22hsl(220%2C%2062%25%2C%2045%25)%22%20stroke-width%3D%223%22%20stroke%3D%22hsl(220%2C%2043%25%2C%2013%25)%22%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
        }}
      >
        <div className='min-w-screen h-auto p-6 text-white md:max-w-2xl xl:max-w-4xl text-center ml-auto mr-auto'>
          <Image
            className="mb-8 text-white ml-auto mr-auto"
            src="/logo-w-xl-transparent.png"
            alt="Logo"
            width={75}
            height={75}
          />
          <p
            className='text-2xl leading-relaxed font-bold'
            /* style={{ textShadow: "2px 2px #071a84" }} */
          >
            Hello I'm Burak. This space is where I document what I'm working on and thinking about. Feel free to to explore my work.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              className="flex items-center bg-white text-blue-700 border-white border-2 border-solid p-1 rounded hover:bg-blue-700 hover:text-white"
              href="/project"
            >
              <p className="font-bold">Projects</p>
              <ArrowRightIcon className="ml-2 w-6" />
            </Link>
            <Link
              className="flex items-center bg-white text-blue-700 border-white border-2 border-solid p-1 rounded hover:bg-blue-700 hover:text-white"
              href="/blog"
            >
              <p className="font-bold">Blog</p>
              <ArrowRightIcon className="ml-2 w-6" />
            </Link>
          </div>

        </div>
      </div>
      <div id="just-bg-for-nav" className="w-full h-12 bg-blue-700 sticky top-0 -mt-12 z-20"></div>

      <div className="md:max-w-2xl xl:max-w-4xl ml-auto mr-auto">

        <Suspense fallback={<HomeProjectListSkeleton />}>
          <HomeProjectList />
        </Suspense>

        <Suspense fallback={<HomeBlogListSkeleton />}>
          <HomeBlogList />
        </Suspense>

      </div>

    </main >
  );
}
