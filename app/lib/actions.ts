'use server';

export async function createBlog(prevState: any, formData: FormData) {
    console.log(prevState, formData);
    try {
        // Do some DB Action

        // Build slug out of the blog title

        // Insert Post and get the id

        // Group content data
        interface ContentObject {
            [key: string]: string | File
        }
        const groupedContent: ContentObject[] = [];
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

        console.log(groupedContent);

        const dbUpdates: Promise<any>[] = [];
        // Iterate grouped data 

            // Directly send update to DB (without await), store returned promise into an array.

        
        // Wait for all promises to resolve Promise.all(dbUpdates)

        // Revalidate path / Clear cache

        // Redirect user to the new blog page


    } catch (e) {
        // return message and errors to update the state
        return {
            message: "Some Error Hint!", errors: {}
        };
    }

}