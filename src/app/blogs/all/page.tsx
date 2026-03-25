import { db } from "@/server/db";
import { articles as blogs } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import BlogCard from "@/components/blog-card";

async function getAllBlogs() {
    try {
        const results = await db
            .select()
            .from(blogs)
            .orderBy(desc(blogs.createdAt));
        return results;
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        return [];
    }
}

export const metadata = {
    title: "All Blog Listings — TrendPulse",
    description: "Browse our complete archive of AI-generated insights and trend reports.",
};

export const dynamic = "force-dynamic";


export default async function AllBlogsPage() {
    const allBlogs = await getAllBlogs();

    return (
        <div className="relative py-20 bg-surface/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4 font-serif">All Articles</h1>
                    <p className="text-lg text-muted-foreground italic font-serif">
                        Our complete historical archive of AI-driven research across Agriculture, Health, Education, Sports, and Politics.
                    </p>
                </div>

                {allBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allBlogs.map((blog) => (
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

