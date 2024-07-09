import sql from './db';
/* import { unstable_noStore as noStore } from 'next/cache'; */

export async function getAllBlogs(userId: string | undefined = "c74de708-5937-41c2-9600-6286993866b3") {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // noStore();

    try {

        await new Promise((resolve) => { setTimeout(resolve, 2000) });

        const blogs = await sql`
        SELECT
        *
        FROM post
        WHERE userId = ${userId}
        AND posttype = 'Blog'
        `;

        if (!blogs) return [];
        return blogs;

    } catch (e) {

        console.error("Error happened getting Blogs", e);

    }

}

export async function getBlog(slug: string) {

    try {

        // await new Promise((resolve) => { setTimeout(resolve, 5000) });

        // Get blog data
        const blog = await sql`SELECT * FROM post WHERE slug = ${slug}`;

        // Is there blog data?
        if (blog.length > 0) {

            // Extract id
            const { id } = blog[0];

            // Get content data with blog id
            const content = await sql`SELECT 
            id,
            position,
            'text' as contentType,
            json_build_object('size', size, 'style', style, 'word_count', word_count, 'content', content) as custom_attr
            FROM text
            WHERE postId = ${id}
            
            UNION ALL
            
            SELECT 
            id,
            position,
            'image' as contentType,
            json_build_object('url', url, 'caption', caption, 'size', size) as custom_attr
            FROM image
            WHERE postId = ${id}
            
            UNION ALL
            
            SELECT 
            id,
            position,
            'code' as contentType,
            json_build_object('language', language, 'code', code) as custom_attr
            FROM codesnippet
            WHERE postId = ${id}
            ORDER BY position ASC`
                ;

            return {
                id: blog[0].id,
                slug: blog[0].slug,
                title: blog[0].title,
                summary: blog[0].summary,
                header: blog[0].header,
                createdAt: blog[0].createdat,
                updatedAt: blog[0].updatedat,
                postType: blog[0].posttype,
                content
            };

        } else {
            // No blog found with the id, return null
            return null;

        }

    } catch (e) {
        console.error("Couldn't get blog", e);
    }


}

export async function getBlogMetadata(slug: string) {

    try {

        // Get blog data
        const blog = await sql`SELECT * FROM post WHERE slug = ${slug}`;

        // Is there blog data? 
        if (blog.length > 0) {
            // Return title
            const { title, summary } = blog[0];

            return { title, summary };

        } else {
            // No blog found with the id, return null
            return null;
        }

    } catch (e) {
        console.error("Couldn't get blog", e);
    }


}