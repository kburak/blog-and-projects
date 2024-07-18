import WebNav from '../../components/WebNav';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <WebNav />
            {children}
        </div>
    );
}
