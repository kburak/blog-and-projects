import Image from "next/image";
import Link from "next/link";
import { inter, lusitana } from '@/app/lib/fonts';

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
      <div className="bg-blue-700 pb-8" 
        /* style={{
          backgroundColor: '#1D4ED8',
          backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="456" height="456" viewBox="0 0 800 800"%3E%3Cg fill="none" stroke="%23909BEA" stroke-width="1"%3E%3Cpath d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"/%3E%3Cpath d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764"/%3E%3Cpath d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880"/%3E%3Cpath d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382"/%3E%3Cpath d="M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269"/%3E%3C/g%3E%3Cg fill="%23D1DFFF"%3E%3Ccircle cx="769" cy="229" r="6"/%3E%3Ccircle cx="539" cy="269" r="6"/%3E%3Ccircle cx="603" cy="493" r="6"/%3E%3Ccircle cx="731" cy="737" r="6"/%3E%3Ccircle cx="520" cy="660" r="6"/%3E%3Ccircle cx="309" cy="538" r="6"/%3E%3Ccircle cx="295" cy="764" r="6"/%3E%3Ccircle cx="40" cy="599" r="6"/%3E%3Ccircle cx="102" cy="382" r="6"/%3E%3Ccircle cx="127" cy="80" r="6"/%3E%3Ccircle cx="370" cy="105" r="6"/%3E%3Ccircle cx="578" cy="42" r="6"/%3E%3Ccircle cx="237" cy="261" r="6"/%3E%3Ccircle cx="390" cy="382" r="6"/%3E%3C/g%3E%3C/svg%3E')`
        }} */
      >
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

    </main >
  );
}
