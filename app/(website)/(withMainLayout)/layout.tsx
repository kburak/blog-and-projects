import WebNav from '../../components/WebNav';

export default function BlogListLayout({
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
