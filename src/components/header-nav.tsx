"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HeaderNav() {
    const pathname = usePathname();

    const activeClass = "text-primary font-bold";
    const inactiveClass = "text-muted-foreground hover:text-primary";

    return (
        <nav className="hidden md:flex items-center gap-8 font-sans">
            <Link
                href="/"
                className={cn(
                    "text-base transition-colors",
                    pathname === "/" ? activeClass : inactiveClass
                )}
            >
                Home
            </Link>
            <Link
                href="/explore"
                className={cn(
                    "text-base transition-colors",
                    pathname?.startsWith("/explore") ? activeClass : inactiveClass
                )}
            >
                Explore
            </Link>

            <Link
                href="/blogs"
                className={cn(
                    "text-base transition-colors",
                    pathname?.startsWith("/blogs") ? activeClass : inactiveClass
                )}
            >
                AI Blogs
            </Link>
        </nav>
    );
}
