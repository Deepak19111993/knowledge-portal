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
        ? `IMPORTANT: you are a best and professional blog writer of "${requestedCategory}" category. You MUST write this blog post from the perspective of the "${requestedCategory}" category. Tailor the content, insights, and tone specifically to fit the "${requestedCategory}" category. The "category" field in your JSON MUST be exactly "${requestedCategory}".`
        : `Choose the most appropriate category for this topic from the list below.`;

    const prompt = `You are an expert Deep Research Analyst and professional blog writer. Your mission is to write the MOST KNOWLEDGEABLE and ACCURATE blog post possible based on the topic below.
    
    Topic: "${topic}"
    Source: ${source}
    
    ${categoryInstruction}
    
    CRITICAL VISUAL INSTRUCTION:
    - ONLY provide ONE highly professional cover image for the entire blog.
    - DO NOT include ANY images within the <body> of the content. ALL content images are disallowed.
    - Focus 100% of your visual effort on the "coverImage" field.
    
    RESEARCH INSTRUCTIONS:
    - Act as if you are "scraping" and researching the latest scientific papers, industry reports, and expert consensus for this topic.
    - If the category is "Agriculture", focus on soil health, yield optimization, and modern sustainable practices.
    - If "Health", focus on clinical accuracy, recent medical breakthroughs, and well-being.
    - Ensure EVERY fact is cross-referenced with your internal high-quality knowledge base.
    - DO NOT HALLUCINATE. If a specific data point is unknown, provide expert-level general principles instead.

CRITICAL RULES:
1. The content MUST be 100% original and FACTUALLY ACCURATE. DO NOT copy-paste. Verify all historical, scientific, or industry-specific information. Write in a deep, analytical, and professional voice.
2. The content MUST be highly SEO-optimized. Include natural keyword variations, strong headings, and a compelling structure.
3. You MUST provide deep, accurate knowledge and educational value for the readers. Avoid generic filler. Provide real insights.
4. IMPORTANT: DO NOT include any <img> tags in the "content" field. The "content" should only be text, headings, and lists.

 Return your response as a valid JSON object with these exact fields:
 {
   "title": "An engaging, SEO-friendly blog title",
   "slug": "url-friendly-slug-for-the-title",
   "excerpt": "A compelling 2-3 sentence summary for the blog card preview",
   "content": "Full blog post content in HTML format. Use <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong>, <em> tags. IMPORTANT: DO NOT INCLUDE ANY <img> TAGS HERE. Make it at least 800 words, well-structured with sections, and include relevant insights and analysis.",
   "category": "One of: Agriculture, Health, Education, Sports, Politics",
   "coverImage": "A valid image URL using the format https://image.pollinations.ai/prompt/{prompt}?width=1200&height=630&seed={seed} where {prompt} is a VIVID, HIGHLY DESCRIPTIVE prompt about the topic that MUST end with 'photorealistic, 8k resolution, DSLR, cinematic lighting, national geographic style' and {seed} is a random integer.",
   "quiz": [
     {
       "question": "A multiple choice question about a key fact or insight in the blog",
       "options": ["Option A", "Option B", "Option C", "Option D"],
       "answer": 0
     }
   ]
 }
 Return exactly 5 questions in the "quiz" array. Each question MUST have exactly 4 options. The "answer" field MUST be the 0-indexed integer of the correct option.`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response;
    const text = response.text();
    console.log("Raw Gemini Response:", text);

    // Clean up potential markdown formatting
    let cleanedText = text.trim();
    // With responseMimeType: "application/json", the model should directly output JSON,
    // so these cleanup steps are less likely to be needed but kept for robustness
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
    if (cleanedText.startsWith("\`\`\`json")) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith("\`\`\`")) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith("\`\`\`")) cleanedText = cleanedText.slice(0, -3);

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

    // Gemini history MUST start with a 'user' message. 
    // Our UI might start with a 'model' greeting which would cause an error.
    let chatHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));

    // Find the first 'user' message and slice history from there
    const firstUserIndex = chatHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex !== -1) {
        chatHistory = chatHistory.slice(firstUserIndex);
    } else {
        chatHistory = []; // No user messages yet
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
    if (cleanedText.startsWith("\`\`\`json")) cleanedText = cleanedText.slice(7);
    if (cleanedText.startsWith("\`\`\`")) cleanedText = cleanedText.slice(3);
    if (cleanedText.endsWith("\`\`\`")) cleanedText = cleanedText.slice(0, -3);

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
    return response.text().trim().replace(/^"|"$/g, ''); // Remove potential quotes
}
