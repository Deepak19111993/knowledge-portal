import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-8">
                <span className="text-5xl font-extrabold gradient-text">404</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-slate-400 mb-8 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
            >
                <ArrowLeft size={16} />
                Back to Home
            </a>
        </div>
    );
}
