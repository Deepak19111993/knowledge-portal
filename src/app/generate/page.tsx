import BlogGenerator from "@/components/blog-generator";
import { Sparkles } from "lucide-react";

export const metadata = {
    title: "Generate Blog — TrendPulse",
    description: "Generate a new AI-powered blog post from trending topics.",
};

export default function GeneratePage() {
    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-20">
            {/* Background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/5 blur-3xl animate-pulse-slow" />
            </div>

            <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-300">
                            Gemini 2.0 Flash
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Create AI Content
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Select a specific category to guide Google Gemini, or let it decide
                        based on the hottest trending news right now.
                    </p>
                </div>

                <BlogGenerator />
            </div>
        </div>
    );
}
