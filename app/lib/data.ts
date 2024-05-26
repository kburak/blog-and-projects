import sql from './db';

export async function getBlogs(userId: string | undefined = "c74de708-5937-41c2-9600-6286993866b3") {
    try {

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