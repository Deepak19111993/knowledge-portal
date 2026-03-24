import { pgTable, text, timestamp, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// Common timestamp fields
const timestamps = {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

export const dictionaryWords = pgTable("dictionary_words", {
    id: serial("id").primaryKey(),
    word: text("word").notNull().unique(),
    phonetic: text("phonetic"),
    translationEnglish: text("translation_english").notNull(),
    translationFrench: text("translation_french"),
    partOfSpeech: text("part_of_speech"),
    definition: text("definition").notNull(),
    exampleSentence: text("example_sentence"),
    category: text("category").default("general"),
    ...timestamps,
});

export const articles = pgTable("articles", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    author: text("author").default("Admin"),
    module: text("module").default("culture"), // culture or industry
    readTime: integer("read_time").default(5),
    views: integer("views").default(0),
    quiz: jsonb("quiz"), // Stores array of questions: { question: string, options: string[], answer: number }
    ...timestamps,
});

export const industryProblems = pgTable("industry_problems", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    industry: text("industry").notNull(), // agriculture, healthcare, education, technology, legal
    region: text("region"),
    urgency: text("urgency").default("medium"), // low, medium, high, critical
    aiDraftResponse: text("ai_draft_response"),
    status: text("status").default("received"), // received, ai_answered, expert_review, solved
    submitterName: text("submitter_name").default("Anonymous"),
    ...timestamps,
});

export type DictionaryWord = typeof dictionaryWords.$inferSelect;
export type NewDictionaryWord = typeof dictionaryWords.$inferInsert;

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

export type IndustryProblem = typeof industryProblems.$inferSelect;
export type NewIndustryProblem = typeof industryProblems.$inferInsert;
