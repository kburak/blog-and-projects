import sql from './db';
import { Post } from './definitions';
/* import { unstable_noStore as noStore } from 'next/cache'; */

export async function getAllPosts(query: string, tags: string[], postType: Post) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // noStore();

    const userId = "c74de708-5937-41c2-9600-6286993866b3";

    try {

        // await new Promise((resolve) => { setTimeout(resolve, 2000) });

        /*
            Search posts with query and tags
            Search posts with only query
            Search posts with only tags
            Search without query or tags 

        */
        let posts;
        // Search posts with query and tags
        if (query && tags.length > 0) {
            const tagsStr = tags.join();
            posts = await sql`
            SELECT
            *
            FROM post p
            JOIN posts_tags pt ON pt.postid = p.id
            JOIN tag t ON pt.tagid = t.id
            WHERE p.userId = ${userId}
            AND p.posttype = ${postType}
            AND p.title ILIKE ${`%${query}%`}
            AND t.name IN (${tagsStr})
            ORDER BY p.createdat DESC
            `;
        }
        // Search posts with only query
        else if (query) {
            posts = await sql`
            SELECT
            *
            FROM post
            WHERE userId = ${userId}
            AND posttype = ${postType}
            AND title ILIKE ${`%${query}%`}
            ORDER BY createdat DESC
            `;
        }
        // Search posts with only tags
        else if (tags.length > 0) {
            const tagsStr = tags.join();
            posts = await sql`
            SELECT
            *
            FROM post p
            JOIN posts_tags pt ON pt.postid = p.id
            JOIN tag t ON pt.tagid = t.id
            WHERE p.userId = ${userId}
            AND p.posttype = ${postType}
            AND t.name IN (${tagsStr})
            ORDER BY p.createdat DESC
            `;
        }
        // Search without query or tags 
        else {
            posts = await sql`
            SELECT
            *
            FROM post
            WHERE userId = ${userId}
            AND posttype = ${postType}
            ORDER BY createdat DESC
            `;
        }

        if (!posts) return [];
        return posts;

    } catch (e) {

        console.error("Error happened getting Posts", e);

    }

}

export async function getPost(slug: string) {

    try {

        // await new Promise((resolve) => { setTimeout(resolve, 5000) });

        // Get Post data
        const post = await sql`SELECT * FROM post WHERE slug = ${slug}`;

        // Is there post data?
        if (post.length > 0) {

            // Extract id
            const { id } = post[0];

            // Get content data with post id
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

            UNION ALL

            SELECT 
            id,
            position,
            'iframe' as contentType,
            json_build_object('iframetype', iframetype, 'url', url, 'title', title) as custom_attr
            FROM iframe
            WHERE postId = ${id}
            ORDER BY position ASC`
                ;

            return {
                id: post[0].id,
                slug: post[0].slug,
                title: post[0].title,
                summary: post[0].summary,
                header: post[0].header,
                projecturl: post[0].projecturl,
                createdAt: post[0].createdat,
                updatedAt: post[0].updatedat,
                postType: post[0].posttype,
                content
            };

        } else {
            // No post found with the id, return null
            return null;

        }

    } catch (e) {
        console.error("Couldn't get post", e);
    }


}

export async function getPostMetadata(slug: string) {

    try {

        // Get blog data
        const post = await sql`SELECT * FROM post WHERE slug = ${slug}`;

        // Is there blog data? 
        if (post.length > 0) {
            // Return title
            const { title, summary } = post[0];

            return { title, summary };

        } else {
            // No post found with the id, return null
            return null;
        }

    } catch (e) {
        console.error("Couldn't get post", e);
    }


}

export async function getAllTags(postType?: string) {
    try {
        let tags;
        if (postType) {
            // Get all tags per postType that has a relation with a post
            tags = await sql`SELECT 
                DISTINCT t.id, t.name
                FROM tag t
                JOIN posts_tags pt ON pt.tagid = t.id
                JOIN post p ON pt.postid = p.id
                WHERE p.posttype = ${postType}
                `;
        } else {
            // Get all tags
            tags = await sql`SELECT 
                DISTINCT id, name
                FROM tag t
                `;
        }

        if (!tags) return [];

        return tags;

    } catch (e) {
        console.error("Couldn't get tags", e);
    }
}
