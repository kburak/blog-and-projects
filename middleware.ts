import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|blog|project|login|.*\\.png|$).*)'], // Don't run on these
}