'use server';
import { z } from 'zod';
import sql from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ImageSchema = z.object({
    type: z.literal('image'),
    url: z.string().min(1, { message: 'Please provide a valid URL!' }),
    caption: z.string().min(1, { message: 'Please provide a valid Caption!' }),
    size: z.enum(['small', 'medium', 'large'], {
        invalid_type_error: 'Please select a image size!.'
    })
});

const TextSchema = z.object({
    type: z.literal('text'),
    content: z.string().min(1, { message: 'Content cannot be empty!' }),
    size: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'p']).optional().default('p'),
    style: z.enum(['normal', 'bold', 'italic'], {
        invalid_type_error: 'Please select a text style!.'
    }).optional().default('normal')
});

const CodeSchema = z.object({
    type: z.literal('code'),
    code: z.string().min(1, { message: 'Code cannot be empty!' }),
    language: z.enum(['javascript', 'python', 'sql', 'java', 'json', 'csharp'])
});

const ContentSchema = z.union([ImageSchema, TextSchema, CodeSchema]);

const FormSchema = z.object({
    title: z.string().min(1, { message: 'Please enter a title!' }),
    summary: z.string().min(1, { message: 'Please enter a summary!' }),
    content: z.array(ContentSchema)
});

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        [key: string]: any
    };
    message?: string | null;
};

interface ContentObject {
    [key: string]: string | File
}

function makeSlug(str: string, maxLength: number = 40): string {
    // str is valid and no empty space then return (return not more than maxLength)
    if (str.length === str.toLowerCase().match(/[a-z0-9]/g)?.length) return str.slice(0, maxLength).toLowerCase();

    // Reduce empty spaces to one empty space, replace empty space with -
    let prevEmpty = false;
    let slug = "";
    for (let i = 0; i < str.length; i++) {
        if (prevEmpty && str[i] === " ") {
            continue;
        } else if (str[i] === " ") {
            prevEmpty = true;
            // If not at beginning or end of str then replace " " with "-"
            if (i !== 0 && i !== str.length - 1) {
                slug += "-"
            }
        } else {
            prevEmpty = false;
            slug += str[i].toLowerCase();
        }
    }

    // Replace everyting that's not A-Z0-9 or -> /(?![a-z0-9-])./
    slug = slug.replace(/(?![a-z0-9-])./g, '');

    // Return max 40 chars length
    return slug.slice(0, maxLength);
}

export async function createBlog(prevState: State | undefined, formData: FormData) {
    console.log(prevState, formData);

    // Normalize form data, Group content data
    const normalizedFormData: { [key: string]: string | ContentObject[] | null } = {};
    const groupedContent: ContentObject[] = [];

    // Add blog title and summary
    normalizedFormData['title'] = formData.get('blog-title')?.toString() || null;
    normalizedFormData['summary'] = formData.get('blog-summary')?.toString() || null;

    // Add groupedContent to normalizedFormData
    normalizedFormData['content'] = groupedContent;

    for (let data of formData.entries()) {
        const [key, value] = data;

        // Does key contain image, text or code? (name attribute of element)
        if (["image", "text", "code"].includes(key.split('-')[1])) {
            // Extract index, type, field
            const index: number = parseInt(key.split('-')[0]);
            const typeName: string = key.split('-')[1];
            const fieldName: string = key.split('-')[2];

            // Is there already ContentObject at this index of the grouped data?
            if (groupedContent[index] && groupedContent[index].type === typeName) {
                // If yes, Push the current field and its value to the existing ContentObject
                groupedContent[index][fieldName] = value;
            } else {
                // If no, Create new ContentObject and push current field and its value into it.
                groupedContent.push({
                    type: typeName,
                    [fieldName]: value
                });
            }
        }
    }

    console.log("normalizedFormData", normalizedFormData);

    // Validate the form data using safeParse
    const validationResult = FormSchema.safeParse(normalizedFormData);

    console.log(validationResult.error);

    if (!validationResult.success) {

        // Iterate the errors and build an error object for the state
        const pResult: { [key: string]: any } = {};
        for (let err of validationResult?.error.errors) {

            const [type, idx, field] = err.path;

            // Check type and create key accordingly
            switch (type) {
                case 'title':
                    if (pResult['title']) {
                        pResult['title'].push(err.message)
                    } else {
                        pResult['title'] = [err.message]
                    }
                    break;
                case 'summary':
                    if (pResult['summary']) {
                        pResult['summary'].push(err.message)
                    } else {
                        pResult['summary'] = [err.message]
                    }
                    break;
                case 'content':
                    // If content array is not defined yet, define it.
                    if (!pResult['content']) pResult['content'] = [];

                    // Is there error messages array for the item at this idx?
                    if (pResult['content'][idx]) {
                        // Push the err message inside
                        pResult['content'][idx].push(err.message);
                    } else {
                        // Create the array
                        pResult['content'][idx] = [err.message];
                    }
                    break;
            }

        }

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

        // Build slug out of the blog title
        const { title, summary } = validationResult.data;
        const createdAt = new Date(Date.now()).toISOString();
        const updatedAt = new Date(Date.now()).toISOString();
        const userid = "c74de708-5937-41c2-9600-6286993866b3";
        const posttype = "Blog";

        // Insert Post and get the id
        const res = await sql`
        INSERT INTO post (slug, title, summary, userid, createdat, updatedat, posttype)
        VALUES (${slug}, ${title}, ${summary}, ${userid}, ${createdAt}, ${updatedAt}, ${posttype})
        RETURNING *
        `;

        console.log("Inserted Blog data:", res[0]);

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
    // revalidatePath(`/blog/${slug}`);

    // Redirect user to the new blog page
    // redirect internally throws an error so it should be called outside of try/catch blocks.
    console.log("Redirect to:", `/blog/${slug}`);
    redirect(`/blog/${slug}`);

}