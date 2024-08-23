import { ContentObject } from "./definitions";

export function normalizePostFormData(formData: FormData, postType: "blog" | "project") {

    if (!formData || !postType) {
        throw new Error("normalizePostFormData input arguments are missing!");
    }

    // Normalize form data, Group content data, Group tags
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

        // Does key contain image, text, code, iframe? (name attribute of element)
        if (["image", "text", "code", "iframe"].includes(key.split('-')[1])) {
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

            // Continue to next form element
            continue;
        }
    }

    return res;
}

export function normalizeTagFormData(formData: FormData) {

    if (!formData) {
        throw new Error("normalizeTagFormData input arguments are missing!");
    }
    /*
    [1-tag-id, id]
    [1-tag-dbDelete, false]
    [1-tag-dbInsert, true]
    */
    // Normalize form data for tags, Group tags
    const res: any[] = [];

    for (let data of formData.entries()) {
        const [key, value] = data;

        // Is the key, value pair tag related?
        if ("tag" === key.split('-')[1]) {

            const [idx, typeName, fieldName] = key.split('-');

            // Is there already tag object at cur Idx?
            if (res[parseInt(idx)]) {
                // Yes. Then add field into that existing one.
                res[parseInt(idx)][fieldName] = value;
            } else {
                res.push({
                    [fieldName]: value
                });
            }

        }

    }

    return res;
}