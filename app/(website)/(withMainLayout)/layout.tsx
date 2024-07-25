import WebNav from '../../components/WebNav';
import { auth } from '@/auth';

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <div>
            <WebNav isAdmin={!!session?.user} />
            {children}
        </div>
    );
}
