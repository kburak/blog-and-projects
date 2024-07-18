/* 
    {
        title: ["error message"],
        summary: ["error message"],
        content: [
            {
                content: "error message",
                url: "error message"
            }
        ]
    } 
*/
import { ZodIssue } from "zod";

export default function normalizeValidationErrors(validationErrors: ZodIssue[]) {

    // Iterate the errors and build an error object for the state
    const pResult: { [key: string]: any } = {};

    for (let err of validationErrors) {

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
            case 'header':
                if (pResult['header']) {
                    pResult['header'].push(err.message)
                } else {
                    pResult['header'] = [err.message]
                }
                break;
            case 'projecturl':
                if (pResult['projecturl']) {
                    pResult['projecturl'].push(err.message)
                } else {
                    pResult['projecturl'] = [err.message]
                }
                break;
            case 'content':
                // If content array is not defined yet, define it.
                if (!pResult['content']) pResult['content'] = [];

                // Is there error messages array for the item at this idx?
                if (pResult['content'][idx]) {
                    // Push the err message inside
                    pResult['content'][idx] = { ...pResult['content'][idx], [field]: err.message };
                } else {
                    // Create the array
                    pResult['content'][idx] = { [field]: err.message };
                }
                break;
        }

    }

    return pResult;

}