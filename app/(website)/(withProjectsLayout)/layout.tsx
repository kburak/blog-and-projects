import WebNav from "@/app/components/WebNav";

export default function ProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <WebNav goBackLink="/project"/>            
            {children}
        </div>
    );
}
