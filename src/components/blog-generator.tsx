"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    "Agriculture",
    "Health",
    "Education",
    "Sports",
    "Politics",
];

export default function BlogGenerator() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        try {
            setIsGenerating(true);
            setError(null);

            const res = await fetch("/api/blogs/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: selectedCategory || undefined,
                }),
            });

            const data = await res.json();

            if (res.status === 429) {
                throw new Error("Gemini API Rate Limit Reached. Please wait a minute before trying again.");
            }

            if (!res.ok || !data.success) {
                const detailedError = data.details ? `${data.error} (${data.details})` : (data.error || "Failed to generate blog post");
                throw new Error(detailedError);
            }

            // Navigate to the newly generated blog post
            router.push(`/blog/${data.data.id}`);

            // Reset selection
            setSelectedCategory(null);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-surface border border-muted/30 shadow-sm rounded-3xl p-6 sm:p-8 mb-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-left text-xl font-bold font-serif text-foreground">Generate New Article</h3>
                        <p className="text-sm text-muted-foreground">
                            A category selection is required to guide the AI and generate tailored insights.
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="mb-8">
                    <label className="text-left block text-sm font-bold text-foreground mb-3">
                        Choose a Category <span className="text-primary font-black ml-1">(REQUIRED)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                disabled={isGenerating}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer",
                                    selectedCategory === cat
                                        ? "bg-primary text-white border-primary shadow-md"
                                        : "bg-background text-muted-foreground border-muted/50 hover:bg-muted/10 hover:text-foreground hover:border-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Area */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-red-500 font-bold">
                        {error && <p>{error}</p>}
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !selectedCategory}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-primary shadow-md hover:bg-primary-light transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Generating with Gemini...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={16} />
                                Generate Blog Post
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
