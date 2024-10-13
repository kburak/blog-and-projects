import type { Metadata } from "next";
import { inter, lusitana, inter_tight, jost, nunito, nunito_sans } from '@/app/lib/fonts';
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
      <body className={`${nunito_sans.className } antialiased`}>
        {children}
      </body>
    </html>
  );
}
