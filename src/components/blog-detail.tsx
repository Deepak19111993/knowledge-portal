"use client";

import { formatDate, formatViewCount } from "@/lib/utils";
import { Eye, Clock, ArrowLeft } from "lucide-react";
import { ViewTracker } from "./view-tracker";
import BlogQuiz from "./blog-quiz";

interface BlogDetailProps {
    id: number;
    title: string;
    content: string;
    category: string;
    source: string | null;
    viewCount: number;
    createdAt: string | Date;
    coverImage: string | null;
    quiz?: {
        question: string;
        options: string[];
        answer: number;
    }[] | null;
}

const categoryColors: Record<string, string> = {
    Technology: "text-blue-600 bg-blue-100 border border-blue-200",
    Politics: "text-red-600 bg-red-100 border border-red-200",
    Business: "text-emerald-600 bg-emerald-100 border border-emerald-200",
    Science: "text-violet-600 bg-violet-100 border border-violet-200",
    Health: "text-green-600 bg-green-100 border border-green-200",
    Entertainment: "text-pink-600 bg-pink-100 border border-pink-200",
    Sports: "text-amber-600 bg-amber-100 border border-amber-200",
    World: "text-indigo-600 bg-indigo-100 border border-indigo-200",
};

export default function BlogDetail({
    id,
    title,
    content,
    category,
    source,
    viewCount,
    createdAt,
    coverImage,
    quiz,
}: BlogDetailProps) {
    const badgeClass =
        categoryColors[category] || "text-primary bg-primary/10 border border-primary/20";

    // Fix hardcoded tech-theme colors from older generations for theme consistency
    const refinedContent = content
        .replace(/text-white/g, "text-foreground")
        .replace(/\[rgba\(99,102,241,0\.2\)\]/g, "muted/30")
        .replace(/\[rgba\(99,102,241,0\.5\)\]/g, "black/5")
        .replace(/border-white\/10/g, "border-muted/20")
        .replace(/rounded-2xl/g, "rounded-3xl")
        .replace(/shadow-\[[^\]]+\]/g, "shadow-sm");

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background min-h-screen">
            <ViewTracker id={id} />
            {/* Back button */}
            <a
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Back to all posts
            </a>

            {/* Header */}
            <header className="mb-10">
                {/* Category badge */}
                <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold shadow-sm mb-6 ${badgeClass}`}
                >
                    {category}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-foreground leading-tight mb-8 mt-2">
                    {title}
                </h1>

                {/* Main Cover Image */}
                {coverImage && coverImage.startsWith('http') && (
                    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden mb-10 shadow-md border border-muted/20">
                        <img
                            src={coverImage}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        {formatDate(createdAt)}
                    </span>

                    <span className="flex items-center gap-2">
                        <Eye size={16} className="text-secondary" />
                        {formatViewCount(viewCount)} views
                    </span>
                </div>
            </header>

            {/* Gradient divider */}
            <div
                className={`h-px bg-muted/30 mb-4`}
            />

            {/* Blog content */}
            <div
                className="blog-content text-lg leading-relaxed text-foreground mb-16"
                dangerouslySetInnerHTML={{ __html: refinedContent }}
            />

            {/* Interactive Quiz Section */}
            {quiz && quiz.length > 0 && (
                <div id="blog-quiz-section" className="mb-24 scroll-mt-24">
                    <BlogQuiz quiz={quiz} />
                </div>
            )}

            {/* Footer divider */}
            <div
                className={`h-px bg-muted/30 mb-8`}
            />

            {/* Bottom CTA */}
            <div className="bg-surface border border-muted/30 rounded-3xl p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold font-serif text-foreground mb-3">
                    Enjoyed this article?
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Stay updated with the latest AI-generated insights from trending news
                    topics.
                </p>
                <a
                    href="/blogs"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-primary shadow-md hover:bg-primary-light transition-all"
                >
                    Explore More Articles
                    <ArrowLeft size={14} className="rotate-180" />
                </a>
            </div>
        </article>
    );
}
