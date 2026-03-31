"use client";

import { useState } from "react";
import { Search, ArrowRightLeft, Sparkles, BookOpen, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
    { value: "auto", label: "Detect Language" },
    // Popular World Languages
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "zh", label: "Chinese (Simplified)" },
    { value: "hi", label: "Hindi" },
    { value: "ar", label: "Arabic" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "ja", label: "Japanese" },
    { value: "de", label: "German" },
    { value: "ko", label: "Korean" },
    { value: "it", label: "Italian" },
    { value: "vi", label: "Vietnamese" },
    { value: "tr", label: "Turkish" },
    { value: "nl", label: "Dutch" },
    { value: "pl", label: "Polish" },
    { value: "sv", label: "Swedish" },
    { value: "da", label: "Danish" },
    { value: "fi", label: "Finnish" },
    { value: "el", label: "Greek" },
    { value: "cs", label: "Czech" },
    { value: "ro", label: "Romanian" },
    { value: "hu", label: "Hungarian" },
    { value: "th", label: "Thai" },
    { value: "id", label: "Indonesian" },
    { value: "ms", label: "Malay" },
    { value: "tl", label: "Tagalog/Filipino" },
    { value: "sw", label: "Swahili" },
    { value: "yo", label: "Yoruba" },
    { value: "zu", label: "Zulu" },
    { value: "bn", label: "Bengali" },
    { value: "ur", label: "Urdu" },
    { value: "fa", label: "Persian" },
    { value: "he", label: "Hebrew" },
    // Creole Variants
    { value: "ht", label: "Haitian Creole" },
    { value: "jm", label: "Jamaican Patois" },
    { value: "gcr", label: "Guianese Creole" },
    { value: "mfe", label: "Mauritian Creole" },
    { value: "crs", label: "Seychellois Creole" },
    { value: "mq", label: "Martinican Creole" },
    { value: "gp", label: "Guadeloupean Creole" },
    { value: "lou", label: "Louisiana Creole" },
    { value: "tpi", label: "Tok Pisin" },
    { value: "pap", label: "Papiamento" },
    { value: "kri", label: "Krio" },
    { value: "srm", label: "Saramaccan" },
    { value: "srn", label: "Sranan Tongo" }
];

export default function DictionaryPage() {
    const [query, setQuery] = useState("");
    const [fromLang, setFromLang] = useState("auto");
    const [toLang, setToLang] = useState("ht"); // Haitian Creole default
    const [loading, setLoading] = useState(false);
    const [fixLoading, setFixLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleTranslate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, fromLang, toLang })
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            } else {
                console.error("Translation API error:", data.error);
                setResult(null);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleFixGrammar = async () => {
        if (!query) return;
        setFixLoading(true);
        try {
            const currentLangLabel = LANGUAGES.find(l => l.value === fromLang)?.label || "Auto-detected language";
            const res = await fetch("/api/fix-grammar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: query, language: currentLangLabel })
            });
            const data = await res.json();
            if (data.success) {
                setQuery(data.corrected);
            }
        } catch (error) {
            console.error("Grammar fix error:", error);
        } finally {
            setFixLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="inline-flex justify-center mb-4 w-12 h-12 rounded-xl bg-primary/10 items-center text-primary">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-primary mb-4">
                        Universal Smart Dictionary
                    </h1>
                    <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                        Powered by Google Gemini. Translate between multiple Creole dialects, English, and French instantly.
                    </p>
                </div>

                <div className="bg-surface border border-muted/30 rounded-3xl shadow-sm overflow-hidden">
                    {/* Header with Language Selectors */}
                    <div className="flex flex-col sm:flex-row items-center justify-between border-b border-muted/30 p-2 sm:px-6 sm:py-3 bg-background/50">
                        <div className="flex-1 flex justify-start">
                            <Select value={fromLang} onValueChange={setFromLang}>
                                <SelectTrigger className="w-[180px] sm:w-[220px] font-bold border-none shadow-none focus:ring-0 text-foreground bg-transparent text-lg">
                                    <SelectValue placeholder="Source Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGES.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                // Swap logic if auto is not selected
                                if (fromLang !== 'auto') {
                                    const temp = fromLang;
                                    setFromLang(toLang);
                                    setToLang(temp);
                                    setQuery("");
                                    setResult(null);
                                }
                            }}
                            className="rounded-full text-muted-foreground hover:bg-muted/20 hover:text-primary transition-colors h-10 w-10 p-0 mx-2"
                        >
                            <ArrowRightLeft size={18} />
                        </Button>

                        <div className="flex-1 flex justify-end">
                            <Select value={toLang} onValueChange={setToLang}>
                                <SelectTrigger className="w-[180px] sm:w-[220px] font-bold border-none shadow-none focus:ring-0 text-foreground bg-transparent text-lg justify-end [&>span]:mr-2">
                                    <SelectValue placeholder="Target Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGES.filter(l => l.value !== 'auto').map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Translation Panels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">

                        {/* LEFT: Input Area */}
                        <div className="p-6 relative border-b md:border-b-0 md:border-r border-muted/30 flex flex-col bg-background">
                            <Textarea
                                rows={8}
                                className="w-full h-full bg-transparent text-2xl sm:text-3xl text-foreground focus-visible:outline-none resize-none placeholder:text-muted-foreground/40 border-none p-0 pr-16 focus-visible:ring-0 shadow-none leading-relaxed flex-1"
                                placeholder="Enter text to translate..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <div className="absolute top-4 right-4 flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleFixGrammar}
                                        disabled={fixLoading}
                                        title="Fix Grammar"
                                        className="p-2 h-auto text-secondary hover:text-secondary hover:bg-secondary/10 rounded-full"
                                    >
                                        <Sparkles size={18} className={fixLoading ? "animate-spin" : ""} />
                                    </Button>
                                    <Button type="button" variant="ghost" onClick={() => setQuery("")} className="p-2 h-auto text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-full">
                                        ×
                                    </Button>
                                </div>
                            )}

                            <div className="flex justify-between items-end mt-4 pt-4">
                                <span className="text-xs text-muted-foreground font-medium">
                                    {query.length} / 500 characters
                                </span>
                                <Button
                                    onClick={handleTranslate}
                                    disabled={!query || loading}
                                    className="px-8 py-6 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md w-full sm:w-auto"
                                >
                                    {loading ? (
                                        <>Translating <Sparkles size={16} className="animate-pulse" /></>
                                    ) : (
                                        <>Translate <Search size={16} /></>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* RIGHT: Output Area */}
                        <div className="p-6 relative bg-surface flex flex-col justify-start min-h-[400px]">
                            {loading ? (
                                <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground animate-pulse gap-3">
                                    <Sparkles size={32} className="text-secondary opacity-50" />
                                    <p className="font-serif italic">Analyzing with Gemini AI...</p>
                                </div>
                            ) : result ? (
                                <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                                    {/* Main Translation */}
                                    <div className="flex justify-between items-start mb-6">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-primary leading-relaxed break-words pr-8">
                                            {result.translation || result.word}
                                        </h2>
                                        <Button variant="ghost" className="h-10 w-10 rounded-full text-secondary hover:bg-secondary/10 shrink-0">
                                            <Volume2 size={20} />
                                        </Button>
                                    </div>

                                    {/* Dictionary Details */}
                                    <div className="flex-1 mt-6 border-t border-muted/20 pt-6 space-y-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            {result.phonetic && (
                                                <span className="text-sm font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border border-muted/30">
                                                    {result.phonetic}
                                                </span>
                                            )}
                                            {result.part && (
                                                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded">
                                                    {result.part}
                                                </span>
                                            )}
                                        </div>

                                        {result.definition && (
                                            <div>
                                                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 opacity-60">Definition</h3>
                                                <p className="text-base text-foreground leading-relaxed">
                                                    {result.definition}
                                                </p>
                                            </div>
                                        )}

                                        {result.example && (
                                            <div className="p-4 bg-muted/5 rounded-xl border border-muted/20">
                                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Example</h3>
                                                <p className="text-base text-foreground font-serif italic">
                                                    "{result.example}"
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 opacity-70">
                                            <Sparkles size={12} className="text-secondary" /> Generated confidentially by Gemini
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground/40 font-serif italic text-xl">
                                    Translation will appear here
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
