import HeaderNav from "@/components/header-nav";
import AnimatedLogo from "@/components/animated-logo";
import AnimatedBrandText from "@/components/animated-brand-text";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 glass border-b border-[rgba(99,102,241,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="flex items-center gap-3 group">
                        <AnimatedLogo size={42} />
                        <AnimatedBrandText />
                    </a>

                    <HeaderNav />

                    <div className="flex items-center gap-4">
                        <form action="/search" method="GET" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 hover:border-secondary/40 transition-colors">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-secondary"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input 
                                type="text"
                                name="q"
                                placeholder="Search..."
                                className="bg-transparent border-none text-sm text-foreground focus:outline-none w-24 focus:w-40 transition-all placeholder:text-muted-foreground"
                                required 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}
