import WebMainNav from '../../components/WebMainNav';
import { auth } from '@/auth';
import Footer from '@/app/components/footer';

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <div>
            <WebMainNav isAdmin={!!session?.user} />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </div>
    );
}
