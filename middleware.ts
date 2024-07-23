import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

export default function (request: NextRequest) {
    const encryptedSessionData = cookies().get('session')?.value;
    let sessionData;

    if (encryptedSessionData) {
        const bytes = CryptoJS.AES.decrypt(encryptedSessionData, "My secret blog app secret 1235555!!");
        sessionData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    const { currentUser, role } = sessionData;

    if ((!currentUser || role !== "admin") && !request.nextUrl.pathname.startsWith('/admin/login')) {
        return Response.redirect(new URL('/admin/login', request.url));
    }
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|blog|project|admin/login|.*\\.png$).*)'], // Don't run on these
}