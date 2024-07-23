import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

export class AuthError extends Error {
    type: string;
    constructor(message: string, type: string) {
        super(message);
        this.message = message;
        this.type = type;
    }
}

export async function signIn(credentials: any, formData: FormData) {

    const email = formData.get("email");
    const password = formData.get("password");
    if (email === "admin@admin.com" && password === "dev123") {

        let sessionData = JSON.stringify({ currentUser: "admin@admin.com", role: "admin" });
        const enycrptedSessionData = CryptoJS.AES.encrypt(sessionData, "My secret blog app secret 1235555!!").toString();
        
        cookies().set('session', enycrptedSessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

        return "success";

    } else {
        throw new AuthError("Error happened!!!", "CredentialsSignin");
    }


}

