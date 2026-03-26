interface TrendingTopic {
    title: string;
    source: string;
    link: string;
    thumbnail?: string | null;
}

interface RSSFeedSource {
    name: string;
    url: string;
}

const NEWS_SOURCES: RSSFeedSource[] = [
    {
        name: "BBC News",
        url: "https://feeds.bbci.co.uk/news/rss.xml",
    },
    {
        name: "CNN",
        url: "http://rss.cnn.com/rss/edition.rss",
    },
    {
        name: "Reuters",
        url: "https://www.rss-bridge.org/bridge01/?action=display&bridge=Reuters&feed=home%2FtopNews&format=Mrss",
    },
    {
        name: "The Guardian",
        url: "https://www.theguardian.com/world/rss",
    },
    {
        name: "Al Jazeera",
        url: "https://www.aljazeera.com/xml/rss/all.xml",
    },
];

const CATEGORY_SOURCES: Record<string, RSSFeedSource[]> = {
    "Sports": [
        { name: "ESPN", url: "https://www.espn.com/espn/rss/news" },
        { name: "BBC Sports", url: "https://feeds.bbci.co.uk/sport/rss.xml" },
    ],
    "Health": [
        { name: "Medical News Today", url: "https://www.medicalnewstoday.com/rss/top_stories" },
        { name: "ScienceDaily Health", url: "https://www.sciencedaily.com/rss/health_medicine.xml" },
    ],
    "Agriculture": [
        { name: "AgriNews", url: "https://www.agrinews-pubs.com/rss/all-news/" },
        { name: "Feedstuffs", url: "https://www.feedstuffs.com/rss/all-news" },
    ],
    "Politics": [
        { name: "Politico", url: "https://www.politico.com/rss/politicopics.xml" },
        { name: "Reuters Politics", url: "https://www.rss-bridge.org/bridge01/?action=display&bridge=Reuters&feed=topNews&format=Mrss" },
    ],
    "Education": [
        { name: "Education Week", url: "https://www.edweek.org/rss/all-content.xml" },
        { name: "Inside Higher Ed", url: "https://www.insidehighered.com/rss/news" },
    ],
    "Technology": [
        { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
        { name: "Wired", url: "https://www.wired.com/feed/rss" },
    ],
};

function parseRSSItems(xml: string): { title: string; link: string; thumbnail?: string | null }[] {
    const items: { title: string; link: string; thumbnail?: string | null }[] = [];
    const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const itemContent = match[1];
        const titleMatch = itemContent.match(
            /<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i
        );
        const linkMatch = itemContent.match(
            /<link[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/i
        );

        const imageMatch = itemContent.match(
            /<(?:media:content|media:thumbnail|enclosure)[^>]*?url=["']([^"']+)["']/i
        ) || itemContent.match(
            /<img[^>]*?src=["']([^"']+)["']/i
        );

        let thumbnailRaw = imageMatch ? imageMatch[1] : null;
        let thumbnail = thumbnailRaw ? thumbnailRaw.replace(/&amp;/g, '&') : null;

        if (titleMatch && linkMatch) {
            items.push({
                title: titleMatch[1].trim(),
                link: linkMatch[1].trim(),
                thumbnail: thumbnail,
            });
        }
    }

    return items;
}

async function fetchRSSFeed(source: RSSFeedSource): Promise<TrendingTopic[]> {
    try {
        const response = await fetch(source.url, {
            headers: {
                "User-Agent": "BlogBot/1.0",
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            console.warn(`Failed to fetch RSS from ${source.name}: ${response.status}`);
            return [];
        }

        const xml = await response.text();
        const items = parseRSSItems(xml);

        return items.slice(0, 3).map((item) => ({
            title: item.title,
            source: source.name,
            link: item.link,
            thumbnail: item.thumbnail,
        }));
    } catch (error) {
        console.warn(`Error fetching RSS from ${source.name}:`, error);
        return [];
    }
}

export async function getTrendingTopics(category?: string): Promise<TrendingTopic[]> {
    const sourcesToFetch = category && CATEGORY_SOURCES[category] 
        ? [...CATEGORY_SOURCES[category], ...NEWS_SOURCES.slice(0, 2)] 
        : NEWS_SOURCES;

    const results = await Promise.allSettled(
        sourcesToFetch.map((source) => fetchRSSFeed(source))
    );

    const allTopics: TrendingTopic[] = [];

    for (const result of results) {
        if (result.status === "fulfilled") {
            allTopics.push(...result.value);
        }
    }

    // Shuffle and return a diverse mix of topics
    const shuffled = allTopics.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

export async function getRandomTrendingTopic(category?: string): Promise<TrendingTopic | null> {
    const topics = await getTrendingTopics(category);
    if (topics.length === 0) return null;

    if (category) {
        // Filter those that might be more relevant
        const filtered = topics.filter(t => t.title.toLowerCase().includes(category.toLowerCase()) || (CATEGORY_SOURCES[category]?.some(s => s.name === t.source)));
        if (filtered.length > 0) return filtered[Math.floor(Math.random() * filtered.length)];
    }

    return topics[Math.floor(Math.random() * topics.length)];
}
