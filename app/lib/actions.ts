'use server';

export async function createBlog() {
    try {
        // Do some DB Action
    } catch (e) {
        // return message and errors to update the state
        return {
            message: "Some Error Hint!", errors: {} 
        };
    }

}