import { Hono } from "hono";
import { db } from "@/server/db";
import { articles as blogs } from "@/server/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { generateBlogFromTopic, translateText, chatWithAssistant, generateFlashcards, fixGrammar } from "@/server/services/gemini";
import { getRandomTrendingTopic, getTrendingTopics } from "@/server/services/trending";

const fixPollinationsUrls = (content: string) => {
    if (!content) return content;
    // Replace URL encoded spaces that could break image rendering
    return content.replace(/%20/g, '+');
};

const app = new Hono().basePath("/api");

// GET /api/blogs — List all blogs
app.get("/blogs", async (c) => {
    try {
        const limitQuery = c.req.query("limit");
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;

        let query = db.select().from(blogs).orderBy(desc(blogs.createdAt));

        if (limit && !isNaN(limit)) {
            query = query.limit(limit) as any;
        }

        const allBlogs = await query;

        return c.json({ success: true, data: allBlogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return c.json({ success: false, error: "Failed to fetch blogs" }, 500);
    }
});

// GET /api/blogs/:id — Get blog detail
app.get("/blogs/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ success: false, error: "Invalid blog ID" }, 400);
        }

        const blog = await db
            .select()
            .from(blogs)
            .where(eq(blogs.id, id))
            .limit(1);

        if (blog.length === 0) {
            return c.json({ success: false, error: "Blog not found" }, 404);
        }

        return c.json({ success: true, data: blog[0] });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return c.json({ success: false, error: "Failed to fetch blog" }, 500);
    }
});

// POST /api/blogs/:id/view — Increment view count
app.post("/blogs/:id/view", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ success: false, error: "Invalid blog ID" }, 400);
        }

        await db
            .update(blogs)
            .set({ 
                readTime: sql`${blogs.readTime} + 1`, // old field increment fallback? 
                views: sql`${blogs.views} + 1` 
            })
            .where(eq(blogs.id, id));

        return c.json({ success: true });
    } catch (error) {
        console.error("Error tracking view:", error);
        return c.json({ success: false, error: "Failed to track view" }, 500);
    }
});

// POST /api/blogs/generate — Generate blog from trending topic via Gemini
app.post("/blogs/generate", async (c) => {
    try {
        const body = await c.req.json().catch(() => ({}));
        const requestedCategory = typeof body.category === 'string' ? body.category : undefined;

        const topic = await getRandomTrendingTopic(requestedCategory);

        if (!topic) {
            return c.json(
                { success: false, error: "No trending topics available" },
                503
            );
        }

        console.log("Generating blog for topic:", topic.title);
        const generated = await generateBlogFromTopic(topic.title, topic.source, requestedCategory);
        console.log("Gemini generation successful");

        try {
            console.log("Fetching YouTube coverage...");
            const ytResponse = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.title)}`);
            const ytHtml = await ytResponse.text();

            const match = ytHtml.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
            const topVideoId = match ? match[1] : null;

            if (topVideoId) {
                generated.content += `
                    <div class="mt-12 mb-8 border-t border-muted/30 pt-8">
                        <h3 class="text-2xl font-bold font-serif text-foreground mb-6">Related Coverage</h3>
                        <div class="aspect-video w-full rounded-3xl overflow-hidden shadow-sm border border-muted/20 relative group bg-surface">
                            <iframe 
                                class="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/${topVideoId}" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                `;
            }
        } catch (ytError) {
            console.warn("Could not fetch YouTube video:", ytError);
        }

        console.log("Fixing Pollinations URLs...");
        const processedContent = fixPollinationsUrls(generated.content);
        const processedCoverImage = fixPollinationsUrls(topic.thumbnail || generated.coverImage);

        console.log("Inserting into database...");
        const inserted = await db
            .insert(blogs)
            .values({
                title: generated.title,
                slug: generated.slug,
                excerpt: generated.excerpt,
                content: processedContent,
                coverImage: processedCoverImage,
                module: generated.category || "culture",
                views: 0,
                quiz: generated.quiz,
            })
            .returning();
        
        console.log("Blog generation completed successfully");

        return c.json({
            success: true,
            data: inserted[0],
            topic: topic.title,
            source: topic.source,
        });
    } catch (error: any) {
        console.error("Error generating blog:", error);
        
        const errorStr = String(error);
        const errorMessage = error instanceof Error ? error.message : errorStr;
        const fullErrorInfo = (errorMessage + " " + errorStr).toLowerCase();
        
        // Comprehensive check for Rate Limit (429)
        if (fullErrorInfo.includes("429") || 
            fullErrorInfo.includes("quota exceeded") || 
            fullErrorInfo.includes("too many requests") ||
            error?.status === 429 || 
            error?.statusCode === 429 ||
            error?.response?.status === 429) {
            
            return c.json({ 
                success: false, 
                error: "Gemini API Rate Limit Reached. Please wait a minute before trying again.",
                details: errorMessage
            }, 429);
        }

        return c.json({ 
            success: false, 
            error: "Failed to generate blog. Please try again later.", 
            details: errorMessage 
        }, 500);
    }
});

// GET /api/trending — Get current trending topics
app.get("/trending", async (c) => {
    try {
        const topics = await getTrendingTopics();
        return c.json({ success: true, data: topics });
    } catch (error) {
        console.error("Error fetching trending topics:", error);
        return c.json(
            { success: false, error: "Failed to fetch trending topics" },
            500
        );
    }
});

// POST /api/translate — Translate text
app.post("/translate", async (c) => {
    try {
        const body = await c.req.json().catch(() => ({}));
        const { query, fromLang, toLang } = body;
        
        if (!query || typeof query !== "string") {
            return c.json({ success: false, error: "Invalid query" }, 400);
        }
        
        const result = await translateText(query, fromLang || "auto", toLang || "ht");
        return c.json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in translation API:", error);
        return c.json({ success: false, error: "Translation failed", details: String(error) }, 500);
    }
});

// POST /api/chat — Chat with AI Cultural Assistant Koné
app.post("/chat", async (c) => {
    try {
        const body = await c.req.json().catch(() => ({}));
        const { history = [], message } = body;
        
        if (!message || typeof message !== "string") {
            return c.json({ success: false, error: "Invalid message" }, 400);
        }
        
        const result = await chatWithAssistant(history, message);
        return c.json({ success: true, text: result });
    } catch (error: any) {
        console.error("Error in chat API:", error);
        return c.json({ success: false, error: "Chat processing failed", details: String(error) }, 500);
    }
});

// POST /api/learning/flashcards — Generate study materials
app.post("/learning/flashcards", async (c) => {
    try {
        const body = await c.req.json().catch(() => ({}));
        const { topic, language = "Haitian Creole" } = body;
        
        if (!topic || typeof topic !== "string") {
            return c.json({ success: false, error: "Invalid topic" }, 400);
        }
        
        const result = await generateFlashcards(topic, language);
        return c.json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error generating flashcards:", error);
        return c.json({ success: false, error: "Flashcard generation failed", details: String(error) }, 500);
    }
});

export default app;

// POST /api/fix-grammar — Fix grammar for a text
app.post("/fix-grammar", async (c) => {
    try {
        const body = await c.req.json().catch(() => ({}));
        const { text, language = "English" } = body;
        
        if (!text || typeof text !== "string") {
            return c.json({ success: false, error: "Invalid text" }, 400);
        }
        
        const corrected = await fixGrammar(text, language);
        return c.json({ success: true, corrected });
    } catch (error: any) {
        console.error("Error fixing grammar:", error);
        return c.json({ success: false, error: "Grammar correction failed", details: String(error) }, 500);
    }
});
