import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Creole Knowledge Portal — AI-Powered Website",
    description:
        "Your gateway to cultural knowledge and AI-powered insights — exploring languages, traditions, and ideas that the world's mainstream platforms overlook.",
    keywords: ["creole", "AI", "language", "culture", "knowledge portal", "traditions"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400..700;1,400..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

