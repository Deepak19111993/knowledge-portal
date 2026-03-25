import { db } from "@/server/db";
import { articles as blogs } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles, LayoutGrid } from "lucide-react";
import BlogCard from "@/components/blog-card";

export const dynamic = "force-dynamic";

async function getLatestBlogs() {
    try {
        const results = await db
            .select()
            .from(blogs)
            .orderBy(desc(blogs.createdAt))
            .limit(6);
        return results;
    } catch (error) {
        console.error("Error fetching latest blogs:", error);
        return [];
    }
}

export default async function HomePage() {
    const latestBlogs = await getLatestBlogs();

    return (
        <div className="relative">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 pointer-events-none -z-10 bg-background opacity-90" />

            {/* Hero Section */}
            <section className="relative pt-10 pb-10 lg:pt-15 lg:pb-15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 mb-8 animate-float">
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                            Preserving the Past, Building the Future
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-serif text-primary mb-6 leading-tight">
                        Knowledge Portal
                    </h1>

                    <p className="text-lg sm:text-2xl text-muted-foreground font-serif max-w-3xl mx-auto mb-12 leading-relaxed">
                        A dual-purpose AI platform dedicated to cultural preservation and empowering communities through high-quality localized research.
                    </p>

                    {/* Dual Entry Points */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <Link href="/explore" className="flex-1 sm:flex-none flex items-center justify-between gap-4 px-8 py-5 rounded-2xl bg-surface border border-muted/40 shadow-sm hover:border-secondary hover:shadow-md transition-all group w-full sm:w-auto">
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-foreground font-serif">Explore</h3>
                                <p className="text-sm text-muted-foreground mt-1">Dictionary, History, Traditions</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                <BookOpen size={24} />
                            </div>
                        </Link>

                        <Link href="/blogs" className="flex-1 sm:flex-none flex items-center justify-between gap-4 px-8 py-5 rounded-2xl bg-surface border border-muted/40 shadow-sm hover:border-primary hover:shadow-md transition-all group w-full sm:w-auto">
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-foreground font-serif">AI Blogs</h3>
                                <p className="text-sm text-muted-foreground mt-1">Daily AI-generated insights</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <LayoutGrid size={24} />
                            </div>
                        </Link>
                    </div>

                    {/* Live Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-foreground">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black font-serif text-primary">5k+</span>
                            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Words<br />Catalogued</span>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-muted/30"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black font-serif text-secondary">850</span>
                            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Articles<br />Published</span>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-muted/30"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black font-serif text-tertiary">350</span>
                            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Experts<br />Online</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Insights Section */}
            {latestBlogs.length > 0 && (
                <section className="py-20 bg-surface/50 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Latest Blogs Section */}
                        <div>
                            <div className="flex flex-col sm:flex-row items-center justify-center mb-12 text-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4 transition-transform hover:scale-105">
                                        <Sparkles size={16} className="text-secondary" />
                                        <span className="text-xs font-black text-secondary uppercase tracking-widest">Global Intelligence</span>
                                    </div>
                                    <h2 className="text-4xl sm:text-5xl font-black font-serif text-foreground leading-tight">
                                        Empowering Communities with AI Research
                                    </h2>
                                    <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto font-serif italic">
                                        Deeply researched articles across Health, Agriculture, Education, Sports, and Politics, tailored for localized impact.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {latestBlogs.map((blog) => (
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
                                    href="/blogs"
                                    className="px-10 py-4 rounded-full bg-primary text-white font-bold text-base shadow-lg hover:bg-primary-light hover:-translate-y-1 transition-all flex items-center gap-3 group"
                                >
                                    Explore all findings
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
