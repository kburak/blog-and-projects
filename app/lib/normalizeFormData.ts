interface ContentObject {
    [key: string]: string | File
}

export default function normalizeFormData(formData: FormData, postType: "blog" | "project") {

    if (!formData || !postType) {
        throw new Error("normalizeFormData input arguments are missing!");
    }

    // Normalize form data, Group content data
    const res: { [key: string]: string | ContentObject[] | null } = {};
    const groupedContent: ContentObject[] = [];

    // Add groupedContent to normalizedFormData
    res['content'] = groupedContent;

    // Push post data into res
    res['title'] = formData.get(`${postType}-title`)?.toString() || null;
    res['summary'] = formData.get(`${postType}-summary`)?.toString() || null;
    res['header'] = formData.get(`${postType}-header`)?.toString() || null;
    res['projecturl'] = formData.get(`${postType}-projecturl`)?.toString() || null;

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

    return res;
}