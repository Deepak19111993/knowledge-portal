import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface GeneratedBlog {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    quiz: {
        question: string;
        options: string[];
        answer: number; // 0-indexed correct option
    }[];
}

export async function generateBlogFromTopic(
    topic: string,
    source: string,
    requestedCategory?: string
): Promise<GeneratedBlog> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    });

    const categoryInstruction = requestedCategory
        ? `IMPORTANT: you are a globally recognized expert and professional research analyst specializing in the "${requestedCategory}" sector. You MUST write this blog post from the perspective of an industry authority in "${requestedCategory}". 
        - If "Agriculture": Focus on yield optimization, soil conservation, climate-resilient crops, and ROI for small-scale farmers.
        - If "Health": Focus on preventative measures, evidence-based wellness, nutrition science, and mental health accessibility.
        - If "Education": Focus on pedagogy, future skills (AI/STEM), literacy, and equal access to learning resources.
        - If "Sports": Focus on the physiology of performance, community participation, and the social impact of major sporting events.
        - If "Politics": Focus on public policy impact, civic responsibility, and transparent governance.
        
        The "category" field in your JSON MUST be exactly "${requestedCategory}".`
        : `Choose the most appropriate category for this topic from: Agriculture, Health, Education, Sports, Politics.`;

    const prompt = `You are an elite Research Journalist. Your goal is to write a blog post that provides IMMENSE VALUE and PRACTICAL KNOWLEDGE to the reader. 
    
    Topic: "${topic}"
    Source Context: ${source}
    
    ${categoryInstruction}
    
    CONTENT STRUCTURE REQUIREMENTS (MUST BE IN THE "content" FIELD):
    1. **Deep Analysis**: Start with a sophisticated overview of the topic.
    2. **Key Insights**: Use <h3> headings to break down the most important data points or trends.
    3. **Key Takeaways & Action Plans**: Include a section titled "What This Means For You" or "Actionable Steps". Provide at least 3-4 concrete things the reader can do or understand better based on this information.
    4. **Global Perspective**: Briefly mention how this topic affects different regions (especially looking toward localized impact).
    
    CRITICAL QUALITY RULES:
    - Act as if you have "scraped" and researched the latest 2026 data and scientific papers.
    - NO GENERIC FILLER. Every paragraph must contain a specific fact, expert opinion, or logical deduction.
    - Word count: At least 1000 words.
    - Tone: Authoritative, educational, and empathetic.
    - Format: Use high-quality HTML (<h2>, <h3>, <p>, <ul>, <li>, <blockquote>). 
    - NO images in <body>.

    Return your response as a valid JSON object with these exact fields:
    {
      "title": "A sophisticated, high-authority blog title",
      "slug": "url-friendly-slug",
      "excerpt": "A high-value 2-paragraph summary that entices the reader with a clear value proposition.",
      "content": "The full 1000+ word HTML blog content. DO NOT INCLUDE ANY <img> TAGS.",
      "category": "The selected category",
      "coverImage": "https://image.pollinations.ai/prompt/{prompt}?width=1200&height=630&seed={seed} where {prompt} is a VIVID, HIGHLY DESCRIPTIVE prompt about the topic ending with 'photorealistic, 8k resolution, DSLR, cinematic lighting, national geographic style' and {seed} is a random integer.",
      "quiz": [
        {
          "question": "A challenging but fair question about a specific fact in the blog",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": 0
        }
      ]
    }
    Return exactly 5 questions in the "quiz" array. Each question MUST have exactly 4 options.`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    const text = response.text();
    console.log("Raw Gemini Response:", text);

    // Clean up potential markdown formatting
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7);
    }
    if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.slice(0, -3);
    }
    console.log("Cleaned Text for JSON Parsing:", cleanedText);

    try {
        const parsed: GeneratedBlog = JSON.parse(cleanedText);
        return parsed;
    } catch (parseError) {
        console.error("JSON Parse Error in gemini.ts:", parseError);
        console.error("Attempted to parse:", cleanedText);
        throw parseError;
    }
}

export interface TranslationResult {
    word: string;
    phonetic: string;
    definition: string;
    translation: string;
    example: string;
    part: string;
}

export async function translateText(query: string, fromLang: string, toLang: string): Promise<TranslationResult> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    });

    const prompt = `You are a professional multilingual translator and cultural dictionary. Translate the following text from the Source Language to the Target Language.

Query: "${query}"
Source Language: ${fromLang === 'auto' ? 'Auto-detect' : fromLang}
Target Language: ${toLang}

Instructions:
1. Accurately translate the query into the Target Language. If the source text is identical to the target text, output it as-is.
2. Provide a dictionary entry based on the translated text.
3. If either the source or target language is a Creole dialect, provide rich cultural context and nuances in the definition. If it is a standard language pair (like French to English), provide standard, high-quality translation and definitions without hallucinating Creole context.

Return your response as a valid JSON object with these exact fields:
{
  "translation": "The direct, accurate translation of the query into the Target Language. Return only the translated text here.",
  "phonetic": "The phonetic pronunciation of the translated text (e.g. [koh-mahn a-lay-voo])",
  "definition": "A clear dictionary definition of the translated text (written in English). Include cultural context ONLY if the query or target involves a Creole dialect.",
  "example": "A practical example sentence using the translated text in the Target Language, followed by its English meaning.",
  "part": "The part of speech (e.g., Phrase, Greeting, Noun, Verb)",
  "word": "The original query string"
}`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    const text = response.text();

    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith("```")) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith("```")) cleanedText = cleanedText.slice(0, -3);

    try {
        return JSON.parse(cleanedText) as TranslationResult;
    } catch (parseError) {
        console.error("Translation parse error:", parseError);
        throw new Error("Failed to parse translation result");
    }
}

export async function chatWithAssistant(history: { role: string; content: string }[], newMessage: string) {
    const systemInstruction = `You are "Koné", a highly knowledgeable conversational AI specializing in Creole culture, history, and language guidance. 
You speak warmly, respectfully, and informatively. You can answer questions about Caribbean history, Creole linguistics, idioms, traditions, and cuisine.
Always be helpful but prioritize cultural accuracy. Frame your answers engagingly. Avoid hallucinating historical facts.`;

    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
        systemInstruction: systemInstruction,
    });

    let chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));

    const firstUserIndex = chatHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex !== -1) {
        chatHistory = chatHistory.slice(firstUserIndex);
    } else {
        chatHistory = [];
    }

    const chat = model.startChat({
        history: chatHistory,
    });

    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
}

export interface Flashcard {
    word: string;
    translation: string;
    phonetic: string;
    example: string;
}

export async function generateFlashcards(topic: string, language: string): Promise<Flashcard[]> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    });

    const prompt = `Generate 5 structured vocabulary flashcards to help someone learn ${language}. The overall topic should be: ${topic}. 

Return ONLY a valid JSON array of objects with these exact fields:
[
  {
    "word": "The word or short phrase in ${language}",
    "translation": "The English translation",
    "phonetic": "Phonetic pronunciation (e.g. [kuh-lah-loo])",
    "example": "A simple example sentence in ${language} showing usage"
  }
]`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    const text = response.text();

    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith("```")) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith("```")) cleanedText = cleanedText.slice(0, -3);

    try {
        return JSON.parse(cleanedText) as Flashcard[];
    } catch (parseError) {
        console.error("Flashcards parse error:", parseError);
        throw new Error("Failed to parse flashcards result");
    }
}

export async function fixGrammar(text: string, language: string): Promise<string> {
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    });

    const prompt = `You are an expert linguist and professional proofreader. 
Your task is to correct any grammatical, spelling, or punctuation errors in the text provided below. 

Text to correct: "${text}"
Original Language: ${language}

Rules:
1. Return ONLY the corrected version of the text. 
2. DO NOT add any explanations, or surrounding text. 
3. Preserve the original meaning and tone. 
4. If the text is already correct, return it exactly as-is.`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    return response.text().trim().replace(/^"|"$/g, '');
}
