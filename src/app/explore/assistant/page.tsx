"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    role: "user" | "model";
    content: string;
}

export default function AssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", content: "Bonjou! I am Koné, your AI cultural assistant. How can I help you explore Creole history, language, or traditions today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        
        const newHistory = [...messages, { role: "user" as const, content: userMsg }];
        setMessages(newHistory);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                    message: userMsg
                })
            });
            const data = await res.json();
            
            if (data.success) {
                setMessages([...newHistory, { role: "model", content: data.text }]);
            } else {
                setMessages([...newHistory, { role: "model", content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([...newHistory, { role: "model", content: "An error occurred while connecting to my knowledge base." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-24 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-8">
                    <div className="inline-flex justify-center mb-4 w-12 h-12 rounded-xl bg-accent/10 items-center text-accent">
                        <Bot size={24} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-primary mb-4">
                        Chat with Koné
                    </h1>
                    <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
                        Your conversational AI specializing in Creole culture, deep historical facts, and language guidance.
                    </p>
                </div>

                <div className="bg-surface border border-muted/30 rounded-3xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-background/50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent/20 text-accent'}`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface border border-muted/20 text-foreground rounded-tl-sm shadow-sm'}`}>
                                        <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/20 text-accent">
                                        <Bot size={18} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-surface border border-muted/20 text-foreground rounded-tl-sm shadow-sm flex items-center gap-2">
                                        <Sparkles size={16} className="text-accent animate-pulse" />
                                        <span className="text-sm text-muted-foreground italic font-medium">Koné is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-surface border-t border-muted/20">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Koné about culture, history, or language..."
                                className="w-full pr-14 pl-4 h-14 bg-background border border-muted/30 rounded-full focus-visible:ring-accent/50 text-base shadow-inner text-foreground"
                                disabled={loading}
                                autoComplete="off"
                            />
                            <Button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="absolute right-2 h-10 w-10 p-0 rounded-full bg-accent text-white hover:bg-accent/80 transition-colors disabled:opacity-50"
                            >
                                <Send size={18} className={input.trim() ? "translate-x-[2px]" : ""} />
                            </Button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-[11px] text-muted-foreground">Generated confidentially by Gemini AI. Koné can make mistakes.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
