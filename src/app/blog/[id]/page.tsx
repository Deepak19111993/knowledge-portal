import type { Metadata } from "next";
import { db } from "@/server/db";
import { articles as blogs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import BlogDetail from "@/components/blog-detail";
import { notFound } from "next/navigation";

async function getBlog(id: string) {
    try {
        const blogId = parseInt(id);
        if (isNaN(blogId)) return null;

        const results = await db
            .select()
            .from(blogs)
            .where(eq(blogs.id, blogId))
            .limit(1);

        return results[0] || null;
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
}


export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const blog = await getBlog(id);
    if (!blog) return { title: "Blog Not Found" };

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-website-ten-chi.vercel.app';
    const ogImage = blog.coverImage || `${baseUrl}/og-image.png`;

    return {
        title: `${blog.title} | Creole Knowledge Portal`,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            url: `${baseUrl}/blog/${id}`,
            type: "article",
            publishedTime: blog.createdAt.toISOString(),
            modifiedTime: blog.updatedAt.toISOString(),
            authors: [blog.author || "Admin"],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.excerpt,
            images: [ogImage],
        },
        alternates: {
            canonical: `/blog/${id}`,
        },
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="relative">
            <BlogDetail
                id={blog.id}
                title={blog.title}
                content={blog.content}
                category={blog.module || "Culture"}
                source={blog.author}
                viewCount={blog.views || 0}
                createdAt={blog.createdAt}
                coverImage={blog.coverImage}
                quiz={blog.quiz as any}
            />
        </div>
    );
}
