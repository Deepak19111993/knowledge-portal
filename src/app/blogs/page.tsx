import { db } from "@/server/db";
import { articles as blogs } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import BlogCard from "@/components/blog-card";
import BlogGenerator from "@/components/blog-generator";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getBlogs() {

    try {
        const results = await db
            .select()
            .from(blogs)
            .orderBy(desc(blogs.createdAt))
            .limit(12);
        return results;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export const metadata = {
    title: "AI Blogs — TrendPulse",
    description: "Browse curated AI-generated insights from trending news.",
};

export const dynamic = "force-dynamic";


export default async function BlogsPage() {
    const allBlogs = await getBlogs();

    return (
        <div className="relative py-20 bg-background text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-foreground mb-3 font-serif">AI Blogs</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto italic">
                        Explore our curated selection of AI-generated insights. Generate a custom report below or browse the full archive.
                    </p>
                </div>

                <BlogGenerator />

                {allBlogs.length > 0 ? (
                    <>
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

                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/blogs/all"
                                className="px-10 py-4 rounded-full bg-primary text-white font-bold text-base shadow-lg hover:bg-primary-light hover:-translate-y-1 transition-all flex items-center gap-3 group"
                            >
                                View all blog listings
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="bg-surface border border-muted/30 rounded-3xl p-16 text-center max-w-2xl mx-auto mt-20">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Sparkles size={32} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 font-serif">
                            No articles yet
                        </h3>
                        <p className="text-sm text-muted-foreground mb-8">
                            Use the generator above to create your very first
                            AI-powered blog post from today's trending news.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

