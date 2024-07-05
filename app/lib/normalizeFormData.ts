interface ContentObject {
    [key: string]: string | File
}

export default function normalizeFormData(formData: FormData) {
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

    return normalizeFormData;
}