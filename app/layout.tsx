import type { Metadata } from "next";
import { inter, lusitana } from '@/app/lib/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "BK - Blog | Projects",
  description: "Blog posts and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
