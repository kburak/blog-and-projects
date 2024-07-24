// Create an auth.config.ts file at the root of our project that exports an authConfig object.
// This object will contain the configuration options for NextAuth.js

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        signOut: ''
    },
    callbacks: {
        /*
        Invoked when user needs authorization. / Middleware runs it. If user is on a page that requires authorization. (Check matcher in middleware.ts)
        */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } 
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;