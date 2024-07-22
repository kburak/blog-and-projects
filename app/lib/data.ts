import sql from './db';
import { getSession } from 'next-auth/react';
import { Post } from './definitions';
/* import { unstable_noStore as noStore } from 'next/cache'; */

export async function getAllPosts(query: string, postType: Post) {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // noStore();

    const userId = "c74de708-5937-41c2-9600-6286993866b3";

    try {

        // await new Promise((resolve) => { setTimeout(resolve, 2000) });

        let posts;
        if (query) {
            posts = await sql`
            SELECT
            *
            FROM post
            WHERE userId = ${userId}
            AND posttype = ${postType}
            AND title ILIKE ${`%${query}%`}
            `;
        } else {
            posts = await sql`
            SELECT
            *
            FROM post
            WHERE userId = ${userId}
            AND posttype = ${postType}
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

        await new Promise((resolve) => { setTimeout(resolve, 5000) });

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
