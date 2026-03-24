"use client";

import { formatDate, formatViewCount } from "@/lib/utils";
import { Eye, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    source: string | null;
    viewCount: number;
    createdAt: string | Date;
    coverImage: string | null;
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

export default function BlogCard({
    id,
    title,
    excerpt,
    category,
    source,
    viewCount,
    createdAt,
    coverImage,
}: BlogCardProps) {
    const badgeClass =
        categoryColors[category] || "text-primary bg-primary/10 border border-primary/20";

    return (
        <a href={`/blog/${id}`} className="group block h-full">
            <article className="bg-surface border border-muted/30 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

                {/* Cover image area */}
                <div className="relative h-48 overflow-hidden bg-muted/10 border-b border-muted/20">
                    {coverImage && coverImage.startsWith('http') ? (
                        <>
                            <img
                                src={coverImage}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-muted/10`}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${badgeClass}`}
                        >
                            {category}
                        </span>
                    </div>

                    {/* View count badge */}
                    <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-foreground bg-background/80 backdrop-blur-md shadow-sm border border-muted/10">
                            <Eye size={12} />
                            {formatViewCount(viewCount)}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-left text-xl font-bold font-serif text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {title}
                    </h2>

                    <p className="text-left text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-muted/20 mt-auto">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/80">
                                <Clock size={12} />
                                {formatDate(createdAt)}
                            </span>
                        </div>

                        <span className="flex items-center gap-1 text-xs font-black text-primary group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                            Read Post
                            <ArrowRight size={12} />
                        </span>
                    </div>
                </div>

            </article>
        </a>
    );
}
