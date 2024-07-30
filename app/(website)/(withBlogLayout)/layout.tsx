import WebNav from "@/app/components/WebNav";

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <WebNav goBackLink="/blog" />
            {children}
        </div>
    );
}
