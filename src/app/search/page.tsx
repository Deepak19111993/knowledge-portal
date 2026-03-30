import { Search, BookOpen, LayoutGrid, ArrowRight, NotebookIcon, Languages } from "lucide-react";
import Link from "next/link";
import { db } from "@/server/db";
import { articles as blogs, dictionaryWords } from "@/server/db/schema";
import { ilike, or } from "drizzle-orm";
import BlogCard from "@/components/blog-card";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q: query = "" } = await searchParams;

    // Search Blog Articles
    const blogResults = query ? await db.select().from(blogs).where(
        or(
            ilike(blogs.title, `%${query}%`),
            ilike(blogs.excerpt, `%${query}%`),
            ilike(blogs.content, `%${query}%`)
        )
    ).limit(10) : [];

    // Search Dictionary Words
    const wordResults = query ? await db.select().from(dictionaryWords).where(
        or(
            ilike(dictionaryWords.word, `%${query}%`),
            ilike(dictionaryWords.translationEnglish, `%${query}%`),
            ilike(dictionaryWords.definition, `%${query}%`)
        )
    ).limit(10) : [];

    const hasResults = blogResults.length > 0 || wordResults.length > 0;

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-20">
                <h1 className="text-4xl sm:text-5xl font-black font-serif text-primary mb-6">
                    Portal Search
                </h1>
                <form action="/search" method="GET" className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Search articles, dictionary, or concepts..."
                        className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-primary/20 bg-surface text-lg font-serif shadow-xl focus:border-primary/50 focus:outline-none transition-all"
                        required
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={24} />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-2xl hover:bg-primary-light transition-colors">
                        <ArrowRight size={20} />
                    </button>
                </form>
                {query && (
                    <p className="mt-8 text-lg font-serif italic text-muted-foreground">
                        Found {blogResults.length + wordResults.length} results for <span className="text-foreground font-bold not-italic">"{query}"</span>
                    </p>
                )}
            </div>

            {query && !hasResults && (
                <div className="text-center py-20 bg-surface/50 border-2 border-dashed border-muted/30 rounded-3xl max-w-2xl mx-auto">
                    <NotebookIcon size={64} className="mx-auto text-muted/30 mb-6" />
                    <h3 className="text-2xl font-bold font-serif text-foreground mb-3">No matches found</h3>
                    <p className="text-muted-foreground mb-8 px-8">
                        Our AI agents couldn't find anything matching your exact terms. 
                        Try searching for general topics like "Health", "Agriculture", or specific words.
                    </p>
                    <Link href="/" className="text-primary font-bold hover:underline">
                        Return to Homepage
                    </Link>
                </div>
            )}

            <div className="space-y-24">
                {/* Dictionary Results */}
                {wordResults.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-10 border-b border-muted/30 pb-6">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                                <Languages size={24} />
                            </div>
                            <h2 className="text-3xl font-black font-serif text-foreground">Cultural Dictionary</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wordResults.map((word) => (
                                <div key={word.id} className="p-8 rounded-3xl bg-surface border border-muted/20 hover:border-secondary/30 transition-all group shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-black font-serif text-primary group-hover:text-secondary transition-colors">
                                            {word.word}
                                        </span>
                                        <span className="px-3 py-1 bg-muted/10 text-muted-foreground rounded-full text-xs font-bold uppercase tracking-widest">
                                            {word.partOfSpeech || "Term"}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-foreground mb-2">{word.translationEnglish}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                        {word.definition}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-muted/20">
                                        <Link href="/explore" className="text-sm font-black text-secondary hover:underline flex items-center gap-2">
                                            Go to Explorer <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Blog Results */}
                {blogResults.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-10 border-b border-muted/30 pb-6">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                <LayoutGrid size={24} />
                            </div>
                            <h2 className="text-3xl font-black font-serif text-foreground">AI Intelligence Blogs</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogResults.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    id={blog.id}
                                    slug={blog.slug}
                                    title={blog.title}
                                    excerpt={blog.excerpt}
                                    category={blog.module || "Intelligence"}
                                    source={blog.author}
                                    viewCount={blog.views || 0}
                                    createdAt={blog.createdAt.toISOString()}
                                    coverImage={blog.coverImage}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
