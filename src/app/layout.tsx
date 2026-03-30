import type { Metadata, Viewport } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-website-ten-chi.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Creole Knowledge Portal — AI-Powered Website",
        template: "%s | Creole Knowledge Portal",
    },
    description:
        "Your gateway to cultural knowledge and AI-powered insights — exploring languages, traditions, and ideas that the world's mainstream platforms overlook.",
    keywords: ["creole", "AI", "language", "culture", "knowledge portal", "traditions", "education", "indigenous"],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        siteName: "Creole Knowledge Portal",
        title: "Creole Knowledge Portal",
        description: "Your gateway to cultural knowledge and AI-powered insights.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Creole Knowledge Portal preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Creole Knowledge Portal",
        description: "Your gateway to cultural knowledge and AI-powered insights.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    },
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

