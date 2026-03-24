import BlogCard from "@/components/blog-card";

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
    createdAt: string;
    updatedAt: string;
}

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/blogs`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

export const metadata = {
    title: "All Blog Listings — TrendPulse",
    description: "Browse our complete archive of AI-generated insights and trend reports.",
};

export default async function AllBlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="relative py-15 min-h-screen bg-surface/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4 font-serif">All Articles</h1>
                    <p className="text-lg text-muted-foreground italic font-serif">
                        Our complete historical archive of AI-driven research across Agriculture, Health, Education, Sports, and Politics.
                    </p>
                </div>

                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                excerpt={blog.excerpt}
                                category={blog.module || "Culture"}
                                source={blog.author}
                                viewCount={blog.views || 0}
                                createdAt={blog.createdAt}
                                coverImage={blog.coverImage}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground italic">No articles found in the archive.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
