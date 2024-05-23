import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const blogPosts = [{ slug: "blog1", title: "Some Blog Post 1" }, { slug: "blog2", title: "Some Blog Post 2" }, { slug: "blog3", title: "Some Blog Post 3" }];
  const projects = [{ slug: "project1", title: "Some Project Post 1" }, { slug: "project2", title: "Some Project Post 2" }, { slug: "project3", title: "Some Project Post 3" }];
  return (
    <main className="min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>Blog and Projects</p>
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <h2>Blog Posts</h2>
          <ul>
            {
              blogPosts.map(b =>
                <li>
                  <Link
                    href={`/blog/${b.slug}`}
                  >
                    {b.title}
                  </Link>
                </li>
              )
            }
          </ul>
        </div>
        <div className="flex-1">
          <h2>Projects</h2>
          <ul>
            {
              projects.map(p =>
                <li>
                  <Link
                    href={`/blog/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                </li>
              )
            }
          </ul>
        </div>

      </div>

    </main>
  );
}
