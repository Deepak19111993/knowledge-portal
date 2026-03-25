import AnimatedLogo from "@/components/animated-logo";
import AnimatedBrandText from "@/components/animated-brand-text";

export default function Footer() {
    return (
        <footer className="border-t border-muted/20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-6 font-serif tracking-tight">
                                <AnimatedLogo size={40} />
                                <AnimatedBrandText />
                            </div>
                            <p className="text-base text-muted-foreground max-w-sm leading-[150%] font-serif italic mb-4">
                                &quot;Yon sèl dwèt pa ka manje kalalou.&quot;<br />
                                <span className="text-sm not-italic mt-1 block">— One finger cannot eat okra alone. (Haitian Proverb)</span>
                            </p>
                            <p className="text-sm text-muted-foreground/80 max-w-sm leading-[150%]">
                                Built with love to preserve localized Knowledge and empower speaking communities to solve real challenges using AI.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-base font-bold text-foreground mb-4 font-serif">
                            Quick Navigation
                        </h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home Page</a></li>
                            <li><a href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explore Culture</a></li>
                            <li><a href="/blogs" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Insights Blog</a></li>
                            <li><a href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">Global Search</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-bold text-foreground mb-4 font-serif">
                            Support & Info
                        </h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About the Portal</a></li>
                            <li><a href="/community-guidelines" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community Guidelines</a></li>
                            <li><a href="/disclaimer/health" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health Disclaimer</a></li>
                            <li><a href="/disclaimer/legal" className="text-sm text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</a></li>
                            <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-muted/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Knowledge Portal.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Powered by</span>
                        <span className="text-sm font-bold text-secondary">
                            Google Gemini
                        </span>
                        <span className="text-sm text-muted-foreground">×</span>
                        <span className="text-sm font-bold text-tertiary">Next.js</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
