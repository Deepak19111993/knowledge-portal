import { BookOpen, Languages, Bot } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore Knowledge",
    description: "A universal smart dictionary and community repository of idiomatic expressions, proverbs, and traditional knowledge.",
    alternates: {
        canonical: "/explore",
    },
};

export default function CulturePage() {
    return (
        <div className="relative pt-20 pb-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex justify-center mb-6 w-16 h-16 rounded-2xl bg-secondary/10 text-secondary items-center">
                    <BookOpen size={32} />
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-primary mb-6 leading-tight">
                    Explore Knowledge
                </h1>

                <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto mb-12">
                    A universal smart dictionary, historical encyclopedia, and community repository of idiomatic expressions, proverbs, and traditional knowledge.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-w-6xl mx-auto text-left">
                    {/* Dictionary */}
                    <div className="bg-surface border border-muted/30 rounded-2xl p-8 hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Languages size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-foreground mb-3">
                            Smart Dictionary
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Translate seamlessly between 8 variations of Creole, English, and French with AI translations and audio pronunciations.
                        </p>
                        <Link href="/explore/dictionary" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                            Open Dictionary
                        </Link>
                    </div>

                    {/* AI Cultural Assistant */}
                    <div className="bg-surface border border-muted/30 rounded-2xl p-8 hover:shadow-lg transition-all group">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                            <Bot size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-foreground mb-3">
                            AI Assistant
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Interact with "Koné", a conversational AI specializing in Creole culture, history, and language guidance.
                        </p>
                        <Link href="/explore/assistant" className="text-accent font-bold text-sm hover:underline inline-flex items-center gap-1">
                            Chat with Koné
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}
