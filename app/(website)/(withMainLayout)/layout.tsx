import WebMainNav from '../../components/WebMainNav';
import { auth } from '@/auth';

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <div>
            <WebMainNav isAdmin={!!session?.user} />
            {children}
        </div>
    );
}
