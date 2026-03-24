import BlogDetail from "@/components/blog-detail";
import { notFound } from "next/navigation";
interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    module: string;
    author: string | null;
    readTime: number | null;
    views: number | null;
    quiz: any;
    createdAt: string;
    updatedAt: string;
}

async function getBlog(id: string): Promise<Blog | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const blog = await getBlog(id);
    if (!blog) return { title: "Blog Not Found" };

    return {
        title: `${blog.title} — TrendPulse`,
        description: blog.excerpt,
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
