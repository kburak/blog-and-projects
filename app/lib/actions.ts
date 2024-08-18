'use server';
import { z } from 'zod';
import sql from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import makeSlug from './makeSlug';
import { normalizePostFormData, normalizeTagFormData } from './normalizeFormData';
import normalizeValidationErrors from './normalizeValidationErrors';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

const ImageSchema = z.object({
    id: z.string().optional(),
    type: z.literal('image'),
    url: z.string().min(1, { message: 'Please provide a valid URL!' }),
    caption: z.string().min(1, { message: 'Please provide a valid Caption!' }),
    size: z.enum(['small', 'medium', 'large'], {
        invalid_type_error: 'Please select a image size!.'
    }),
    dbUpdate: z.string().optional(),
    dbDelete: z.string().optional(),
    dbInsert: z.string().optional()
});

const TextSchema = z.object({
    id: z.string().optional(),
    type: z.literal('text'),
    content: z.string().min(1, { message: 'Content cannot be empty!' }),
    size: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'p']).optional().default('p'),
    style: z.enum(['normal', 'bold', 'italic'], {
        invalid_type_error: 'Please select a text style!.'
    }).optional().default('normal'),
    dbUpdate: z.string().optional(),
    dbDelete: z.string().optional(),
    dbInsert: z.string().optional()
});

const CodeSchema = z.object({
    id: z.string().optional(),
    type: z.literal('code'),
    code: z.string().min(1, { message: 'Code cannot be empty!' }),
    language: z.enum(['javascript', 'python', 'sql', 'java', 'json', 'csharp']),
    dbUpdate: z.string().optional(),
    dbDelete: z.string().optional(),
    dbInsert: z.string().optional()
});

const IframeSchema = z.object({
    id: z.string().optional(),
    type: z.literal('iframe'),
    iframetype: z.enum(['video', 'maps']),
    url: z.string().min(1, { message: 'Url cannot be empty!' }),
    title: z.string().min(1, { message: 'Title cannot be empty!' }),
    dbUpdate: z.string().optional(),
    dbDelete: z.string().optional(),
    dbInsert: z.string().optional()
});

const ContentSchema = z.union([ImageSchema, TextSchema, CodeSchema, IframeSchema]);

const BlogSchema = z.object({
    title: z.string().min(1, { message: 'Please enter a title!' }),
    summary: z.string().min(1, { message: 'Please enter a summary!' }),
    header: z.string().min(1, { message: 'Please provide a valid header image URL!' }),
    projecturl: z.string().nullable().optional(),
    content: z.array(ContentSchema),
    tags: z.array(z.string())
});

const ProjectSchema = z.object({
    title: z.string().min(1, { message: 'Please enter a title!' }),
    summary: z.string().min(1, { message: 'Please enter a summary!' }),
    header: z.string().nullable().optional(),
    projecturl: z.string().nullable().optional(),
    content: z.array(ContentSchema)
});

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        [key: string]: any
    };
    message?: string | null;
};

export async function createBlog(prevState: State | undefined, formData: FormData) {
    console.log(prevState, formData);

    // Normalize form data
    const normalizedPostData = normalizePostFormData(formData, 'blog');
    const normalizedTagData = normalizeTagFormData(formData);

    // Union post and tag data
    const normalizedData = { ...normalizedPostData, tags: normalizedTagData }

    // Validate the form data using safeParse
    const validationResult = BlogSchema.safeParse(normalizedData);

    // Validation failed, normalize error data and return errors in state.
    if (!validationResult.success) {

        const pResult = normalizeValidationErrors(validationResult?.error.errors);

        console.log("pResult", pResult)

        return {
            errors: pResult,
            message: 'Missing Fields. Failed to Create Blog.'
        }
    }

    console.log("validatedData", validationResult.data);

    // Make slug
    const slug = makeSlug(validationResult.data.title, 40);

    try {

        const { title, summary, header } = validationResult.data;
        const createdAt = new Date(Date.now()).toISOString();
        const updatedAt = new Date(Date.now()).toISOString();
        const userid = "c74de708-5937-41c2-9600-6286993866b3";
        const posttype = "Blog";

        // Insert Post and get the id
        const res = await sql`
        INSERT INTO post (slug, title, summary, userid, createdat, updatedat, posttype, header)
        VALUES (${slug}, ${title}, ${summary}, ${userid}, ${createdAt}, ${updatedAt}, ${posttype}, ${header})
        RETURNING *
        `;

        console.log("Inserted Blog data:", res[0]);

        const { id } = res[0];

        // Iterate grouped tags
        for (let tag of validationResult.data.tags) {

            // Create post tag relationship using postid and tagid

        }

        const dbUpdates: Promise<any>[] = [];

        // Iterate grouped data 
        for (let i = 0; i < validationResult.data.content.length; i++) {

            const cur = validationResult.data.content[i];

            // Extract type
            const { type } = cur;

            // Depending on type, Send directly update to DB (without await), store returned promise into an array.
            if (type === "image") {
                const { url, caption, size: imageSize } = cur;

                const insertImage = sql`
                INSERT INTO image (postid, url, caption, size, position)
                VALUES (${id}, ${url}, ${caption}, ${imageSize}, ${i})`;

                dbUpdates.push(insertImage);
            } else if (type === "text") {
                const { content: textContent, size: textSize, style: textStyle } = cur;

                const insertText = sql`
                    INSERT INTO text (postid, size, style, word_count, content, position)
                    VALUES (${id}, ${textSize}, ${textStyle}, ${textContent.length}, ${textContent}, ${i})
                    `;

                dbUpdates.push(insertText);
            } else if (type === "code") {
                const { code, language } = cur;

                const insertCode = sql`
                    INSERT INTO codesnippet (postid, language, code, position)
                    VALUES (${id}, ${language}, ${code}, ${i})
                    `;

                dbUpdates.push(insertCode);
            } else if (type === "iframe") {
                const { iframetype, url, title } = cur;

                const insertIframe = sql`
                    INSERT INTO iframe (postid, iframetype, url, title, position)
                    VALUES (${id}, ${iframetype}, ${url}, ${title}, ${i})
                    `;

                dbUpdates.push(insertIframe);
            }

        }

        // Wait for all promises to resolve Promise.all(dbUpdates)
        await Promise.all(dbUpdates);

    } catch (e) {
        // return message and errors to update the state
        console.error("Create Blog Failed", e);
        return {
            message: "Some Error Hint!", errors: {}
        };
    }

    // No need to Revalidate path / Clear cache because the blog is newly created!!!

    // Redirect user to the new blog page
    // redirect internally throws an error so it should be called outside of try/catch blocks.
    redirect(`/blog/${slug}`);

}

export async function editBlog(postData: string[], prevState: State | undefined, formData: FormData) {
    console.log(prevState, formData);

    const [postId, postSlug] = postData;

    // Normalize form data
    const normalizedFormData = normalizePostFormData(formData, 'blog');

    // Validate data
    const validationResult = BlogSchema.safeParse(normalizedFormData);

    // Validation failed, normalize error data and return errors in state.
    if (!validationResult.success) {

        const pResult = normalizeValidationErrors(validationResult?.error.errors);

        console.log("pResult", pResult)

        return {
            errors: pResult,
            message: 'Missing Fields. Failed to Create Blog.'
        }
    }

    // console.log("validatedData", validationResult.data);

    const dbUpdates: Promise<any>[] = [];

    try {

        // DELETE, UPDATE, INSERT CONTENT DATA
        for (let i = 0; i < validationResult.data.content.length; i++) {

            const cur = validationResult.data.content[i];
            const { type, id } = cur;

            if (cur?.dbDelete === "on") { // Is dbDelete provided for item?

                // Throw error if id is missing
                if (!id) throw Error(`Missing blog content id`);
                // Delete content
                if (type === "image") {
                    const p = sql`DELETE FROM image WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "text") {
                    const p = sql`DELETE FROM text WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "code") {
                    const p = sql`DELETE FROM codesnippet WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "iframe") {
                    const p = sql`DELETE FROM iframe WHERE id = ${id}`;
                    dbUpdates.push(p);
                }

            } else if (cur?.dbUpdate === "on" && !cur.dbDelete) { // Is dbUpdate provided for item and not dbDelete?

                // Throw error if id is missing
                if (!id) throw Error(`Missing blog content id`);

                // Update content
                if (type === "image") {
                    const updateImage = sql`
                    UPDATE image set ${sql(cur, 'url', 'caption', 'size')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateImage);
                } else if (type === "text") {
                    const updateText = sql`
                    UPDATE text set ${sql(cur, 'content', 'size', 'style')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateText);
                } else if (type === "code") {
                    const updateCode = sql`
                    UPDATE codesnippet set ${sql(cur, 'code', 'language')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateCode);
                } else if (type === "iframe") {
                    const updateIframe = sql`
                    UPDATE iframe set ${sql(cur, 'iframetype', 'url', 'title')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateIframe);
                }

            } else if (cur?.dbInsert === "on") { // Is dbInsert provided for item?

                // Insert content
                if (type === "image") {
                    const { url, caption, size: imageSize } = cur;
                    const insertImage = sql`
                    INSERT INTO image (postid, url, caption, size, position)
                    VALUES (${postId}, ${url}, ${caption}, ${imageSize}, ${i})
                    `;
                    dbUpdates.push(insertImage);
                } else if (type === "text") {
                    const { content: textContent, size: textSize, style: textStyle } = cur;
                    const insertText = sql`
                    INSERT INTO text (postid, size, style, word_count, content, position)
                    VALUES (${postId}, ${textSize}, ${textStyle}, ${textContent.length}, ${textContent}, ${i})
                    `;
                    dbUpdates.push(insertText);
                } else if (type === "code") {
                    const { code, language } = cur;
                    const insertCode = sql`
                    INSERT INTO codesnippet (postid, language, code, position)
                    VALUES (${postId}, ${language}, ${code}, ${i})
                    `;
                    dbUpdates.push(insertCode);
                } else if (type === "iframe") {
                    const { iframetype, url, title } = cur;
                    const insertIframe = sql`
                    INSERT INTO iframe (postid, iframetype, url, title, position)
                    VALUES (${postId}, ${iframetype}, ${url}, ${title}, ${i})
                    `;
                    dbUpdates.push(insertIframe);
                }

            }

        }

        // UPDATE BLOGPOST DATA (title, summary, updatedAt, etc.)
        const { title, summary, header } = validationResult.data;
        const updatedat = new Date(Date.now()).toISOString();
        const updateBlog = sql`
        UPDATE post set ${sql({
            title,
            summary,
            updatedat,
            header
        }, 'title', 'summary', 'updatedat', 'header')}
        WHERE id = ${postId}
        `;
        dbUpdates.push(updateBlog);

        // WAIT FOR ALL PROMISES to resolve
        await Promise.all(dbUpdates);

    } catch (e) {
        console.error("Update blog post failed", e);
        return {
            message: "Update blog post failed",
            errors: {}
        }
    }

    // Revalidate path / Clear cache because the blog is newly created!!!
    revalidatePath(`/blog/${postSlug}`);

    // Redirect user to the new blog page
    // redirect internally throws an error so it should be called outside of try/catch blocks.
    console.log("Redirect to:", `/blog/${postSlug}`);
    redirect(`/blog/${postSlug}`);

}

export async function deletePost(postData: string[]) {

    const [postId, posttype] = postData;
    if (!postId) throw new Error("No postId provided");

    try {

        const promises: Promise<any>[] = [];

        // Remove all content
        promises.push(sql`
            DELETE FROM image 
            WHERE postId = ${postId} 
        `);
        promises.push(sql`
            DELETE FROM text 
            WHERE postId = ${postId} 
        `);
        promises.push(sql`
            DELETE FROM codesnippet 
            WHERE postId = ${postId} 
        `);
        promises.push(sql`
            DELETE FROM iframe 
            WHERE postId = ${postId} 
        `);

        // Remove blog post
        promises.push(sql`
            DELETE FROM post 
            WHERE id = ${postId} 
        `);

        // Wait for all to resolve
        await Promise.all(promises);

        // Since this action is being called in the /dashboard/invoices path, you don't need to call redirect. 
        // Calling revalidatePath will trigger a new server request and re-render the table.
        revalidatePath(`/admin/${posttype}`);

    } catch (e) {
        console.error(`Delete ${posttype[0].toUpperCase() + posttype.substring(1)} Action failed.`, e);
    }
}

export async function createProject(prevState: State | undefined, formData: FormData) {
    console.log(prevState, formData);

    // Normalize form data
    const normalizedFormData = normalizePostFormData(formData, 'project');

    // Validate the form data using safeParse
    const validationResult = ProjectSchema.safeParse(normalizedFormData);

    // Validation failed, normalize error data and return errors in state.
    if (!validationResult.success) {

        const pResult = normalizeValidationErrors(validationResult?.error.errors);

        console.log("pResult", pResult)

        return {
            errors: pResult,
            message: 'Missing Fields. Failed to Create Project.'
        }
    }

    console.log("validatedData", validationResult.data);

    // Make slug
    const slug = makeSlug(validationResult.data.title, 40);

    try {

        const { title, summary, header, projecturl } = validationResult.data;
        const createdAt = new Date(Date.now()).toISOString();
        const updatedAt = new Date(Date.now()).toISOString();
        const userid = "c74de708-5937-41c2-9600-6286993866b3";
        const posttype = "Project";

        // Insert Post and get the id
        const post = {
            slug: slug,
            title: title,
            summary: summary,
            userid: userid,
            createdat: createdAt,
            updatedat: updatedAt,
            posttype: posttype,
            header,
            projecturl
        }

        const res = await sql`
            INSERT INTO post ${sql(post, 'slug', 'title', 'summary', 'userid', 'createdat', 'updatedat', 'posttype', 'header', 'projecturl')}
            RETURNING *
            `;

        console.log("Inserted Project data:", res[0]);

        const { id } = res[0];

        const dbUpdates: Promise<any>[] = [];
        // Iterate grouped data 
        for (let i = 0; i < validationResult.data.content.length; i++) {

            const cur = validationResult.data.content[i];

            // Extract type
            const { type } = cur;

            // Depending on type, Send directly update to DB (without await), store returned promise into an array.
            if (type === "image") {
                const { url, caption, size: imageSize } = cur;

                const insertImage = sql`
                INSERT INTO image (postid, url, caption, size, position)
                VALUES (${id}, ${url}, ${caption}, ${imageSize}, ${i})`;

                dbUpdates.push(insertImage);
            } else if (type === "text") {
                const { content: textContent, size: textSize, style: textStyle } = cur;

                const insertText = sql`
                    INSERT INTO text (postid, size, style, word_count, content, position )
                    VALUES (${id}, ${textSize}, ${textStyle}, ${textContent.length}, ${textContent}, ${i})
                    `;

                dbUpdates.push(insertText);
            } else if (type === "code") {
                const { code, language } = cur;

                const insertCode = sql`
                    INSERT INTO codesnippet (postid, language, code, position )
                    VALUES (${id}, ${language}, ${code}, ${i})
                    `;

                dbUpdates.push(insertCode);
            } else if (type === "iframe") {
                const { iframetype, url, title } = cur;

                const insertIframe = sql`
                    INSERT INTO iframe (postid, iframetype, url, title, position)
                    VALUES (${id}, ${iframetype}, ${url}, ${title}, ${i})
                    `;

                dbUpdates.push(insertIframe);
            }

        }

        // Wait for all promises to resolve Promise.all(dbUpdates)
        await Promise.all(dbUpdates);

    } catch (e) {
        // return message and errors to update the state
        console.error("Create Project Failed", e);
        return {
            message: "Some Error Hint!", errors: {}
        };
    }

    // No need to Revalidate path / Clear cache because the blog is newly created!!!

    // Redirect user to the new blog page
    // redirect internally throws an error so it should be called outside of try/catch blocks.
    redirect(`/project/${slug}`);

}

export async function editProject(postData: string[], prevState: State | undefined, formData: FormData) {
    console.log(prevState, formData);

    const [postId, postSlug] = postData;

    // Normalize form data
    const normalizedFormData = normalizePostFormData(formData, 'project');

    // Validate data
    const validationResult = ProjectSchema.safeParse(normalizedFormData);

    // Validation failed, normalize error data and return errors in state.
    if (!validationResult.success) {

        const pResult = normalizeValidationErrors(validationResult?.error.errors);

        console.log("pResult", pResult)

        return {
            errors: pResult,
            message: 'Missing Fields. Failed to Create Project.'
        }
    }

    // console.log("validatedData", validationResult.data);

    const dbUpdates: Promise<any>[] = [];

    try {

        // DELETE, UPDATE, INSERT CONTENT DATA
        for (let i = 0; i < validationResult.data.content.length; i++) {

            const cur = validationResult.data.content[i];
            const { type, id } = cur;

            if (cur?.dbDelete === "on") { // Is dbDelete provided for item?

                // Throw error if id is missing
                if (!id) throw Error(`Missing project content id`);
                // Delete content
                if (type === "image") {
                    const p = sql`DELETE FROM image WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "text") {
                    const p = sql`DELETE FROM text WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "code") {
                    const p = sql`DELETE FROM codesnippet WHERE id = ${id}`;
                    dbUpdates.push(p);
                } else if (type === "iframe") {
                    const p = sql`DELETE FROM iframe WHERE id = ${id}`;
                    dbUpdates.push(p);
                }

            } else if (cur?.dbUpdate === "on" && !cur.dbDelete) { // Is dbUpdate provided for item and not dbDelete?

                // Throw error if id is missing
                if (!id) throw Error(`Missing project content id`);

                // Update content
                if (type === "image") {
                    const updateImage = sql`
                    UPDATE image set ${sql(cur, 'url', 'caption', 'size')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateImage);
                } else if (type === "text") {
                    const updateText = sql`
                    UPDATE text set ${sql(cur, 'content', 'size', 'style')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateText);
                } else if (type === "code") {
                    const updateCode = sql`
                    UPDATE codesnippet set ${sql(cur, 'code', 'language')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateCode);
                } else if (type === "iframe") {
                    const updateIframe = sql`
                    UPDATE iframe set ${sql(cur, 'iframetype', 'url', 'title')
                        }
                    WHERE id = ${id}
                    `;
                    dbUpdates.push(updateIframe);
                }

            } else if (cur?.dbInsert === "on") { // Is dbInsert provided for item?

                // Insert content
                if (type === "image") {
                    const { url, caption, size: imageSize } = cur;
                    const insertImage = sql`
                    INSERT INTO image (postid, url, caption, size, position)
                    VALUES (${postId}, ${url}, ${caption}, ${imageSize}, ${i})
                    `;
                    dbUpdates.push(insertImage);
                } else if (type === "text") {
                    const { content: textContent, size: textSize, style: textStyle } = cur;
                    const insertText = sql`
                    INSERT INTO text (postid, size, style, word_count, content, position)
                    VALUES (${postId}, ${textSize}, ${textStyle}, ${textContent.length}, ${textContent}, ${i})
                    `;
                    dbUpdates.push(insertText);
                } else if (type === "code") {
                    const { code, language } = cur;
                    const insertCode = sql`
                    INSERT INTO codesnippet (postid, language, code, position )
                    VALUES (${postId}, ${language}, ${code}, ${i})
                    `;
                    dbUpdates.push(insertCode);
                } else if (type === "iframe") {
                    const { iframetype, url, title } = cur;
                    const insertIframe = sql`
                    INSERT INTO iframe (postid, iframetype, url, title, position)
                    VALUES (${postId}, ${iframetype}, ${url}, ${title}, ${i})
                    `;
                    dbUpdates.push(insertIframe);
                }

            }

        }

        // UPDATE PROJECTPOST DATA (title, summary, updatedAt, etc.)
        const { title, summary, header } = validationResult.data;
        const updatedat = new Date(Date.now()).toISOString();
        const updateProject = sql`
        UPDATE post set ${sql({
            title,
            summary,
            updatedat,
            header
        }, 'title', 'summary', 'updatedat', 'header')}
        WHERE id = ${postId}
        `;
        dbUpdates.push(updateProject);

        // WAIT FOR ALL PROMISES to resolve
        await Promise.all(dbUpdates);

    } catch (e) {
        console.error("Update project post failed", e);
        return {
            message: "Update project post failed",
            errors: {}
        }
    }

    // Revalidate path / Clear cache because the project is newly created!!!
    revalidatePath(`/project/${postSlug}`);

    // Redirect user to the new project page
    // redirect internally throws an error so it should be called outside of try/catch blocks.
    console.log("Redirect to:", `/project/${postSlug}`);
    redirect(`/project/${postSlug}`);

}

export async function authenticate(prevState: any, formData: FormData) {
    try {
        await signIn('credentials', {
            redirectTo: "/admin",
            email: formData.get("email"),
            password: formData.get("password")
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    await signOut({
        redirectTo: "/",
    });
}