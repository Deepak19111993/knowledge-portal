import { MetadataRoute } from 'next';
import { db } from '@/server/db';
import { articles } from '@/server/db/schema';
import { desc } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-website-ten-chi.vercel.app';

    // Fetch dynamic routes (e.g., articles)
    const allArticles = await db.select({
        id: articles.id,
        updatedAt: articles.updatedAt,
    }).from(articles).orderBy(desc(articles.createdAt));

    const articleUrls = allArticles.map((article: { id: number; updatedAt: Date }) => ({
        url: `${baseUrl}/blog/${article.id}`,
        lastModified: article.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static routes
    const routes = [
        '',
        '/explore',
        '/explore/dictionary',
        '/explore/agriculture',
        '/explore/healthcare',
        '/explore/technology'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
    }));

    return [...routes, ...articleUrls];
}
