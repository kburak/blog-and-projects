import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>Blog and Projects</p>
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
