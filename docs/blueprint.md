# 🌿 Knowledge Portal — AI-Powered Website Blueprint

> A comprehensive guide to features, functionality, design system, and AI integrations for a modern localized knowledge and global intelligence platform.

---

## 🎯 Project Overview

The **Knowledge Portal** is a streamlined AI-powered hub designed to empower communities through localized intelligence and knowledge preservation. 

> "Your gateway to knowledge and AI-powered insights — exploring languages, traditions, and ideas that the world's mainstream platforms overlook."

The platform has been refactored into a focused dual-purpose architecture:

1. **Exploration & Preservation** — Safeguarding localized traditions, language variants, and historical knowledge. (Route: `/explore`)
2. **AI-Driven Global Intelligence** — Providing deep, research-backed insights across critical sectors (Agriculture, Health, Education, Sports, Politics) through an automated AI blog engine. (Route: `/blogs`)

The portal serves as a bridge between traditional wisdom and modern AI capabilities, ensuring that vital information is accessible, accurate, and interactive.

---

## 🎨 Design System

### Color Palette 

| Role | Color Name | Hex | Usage |
|------|-----------|-----|-------|
| Primary | Deep Mahogany | `#6B1E14` | Headers, CTAs, primary branding |
| Secondary | Saffron Gold | `#E8A020` | Accents, highlights, icons |
| Tertiary | Tropical Green | `#2D6A4F` | Links, success states, Agriculture category |
| Background | Warm Ivory | `#FAF6EF` | Global page background |
| Surface | Creamy White | `#FFF9F0` | Cards, glassmorphism panels |
| Dark | Rich Espresso | `#1A0A05` | Primary text, footer backgrounds |
| Muted | Sandstone | `#C4A882` | Borders, subtle metadata |
| Accent | Caribbean Teal | `#1B7A7A` | Info states, specialized actions |

### Typography
 
All text across the site uses **DM Sans** — a clean, modern sans-serif font.
 
| Use | Element Examples | Weight | Size Range | Notes |
|-----|-----------------|--------|------------|-------|
| **H1 Headlines** | Hero title, Page titles | 800–900 | 48px–72px | Heaviest weight, maximum impact, uppercase or title case |
| **H2 Headlines** | Section titles, Blog titles | 700 | 32px–40px | Bold, clear hierarchy separator |
| **H3 Headlines** | Card headings, Sub-sections | 600–700 | 22px–28px | Semi-bold, used inside cards and content blocks |
| **H4 Headlines** | Card headings, Sub-sections | 600–700 | 22px–28px | Semi-bold, used inside cards and content blocks |
| **H5 Headlines** | Card headings, Sub-sections | 600–700 | 22px–28px | Semi-bold, used inside cards and content blocks |
| **H6 Headlines** | Card headings, Sub-sections | 600–700 | 22px–28px | Semi-bold, used inside cards and content blocks |
| **Body / Blog Text** | Article paragraphs, descriptions | 400 | 16px–18px | Regular weight, optimized line-height (~1.7) for readability |
| **Navigation & UI Buttons** | Nav links, CTA buttons | 500–600 | 14px–16px | Medium weight, letter-spacing slightly increased for clarity |
| **Card Titles & Metadata** | Blog card title, date, read time | 600 (title) / 400 (meta) | 16px–20px (title) / 12px–14px (meta) | Title semi-bold; metadata regular with muted color (`#C4A882`) |
| **Captions & Tags** | Category badges, image captions | 500 | 11px–13px | Uppercase + letter-spacing for badge style; sentence case for captions |
| **Footer Text** | Footer links, copyright, tagline | 400 | 13px–14px | Regular weight, muted tone, reduced opacity or sandstone color |
 
---
 
### Font Loading (Next.js)
 
```ts
// app/layout.tsx
import { DM_Sans } from 'next/font/google'
 
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
})
```
 
### Tailwind CSS Mapping
 
```js
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-dm-sans)', 'sans-serif'],
}

```
 
### Usage Reference
 
```
H1  → text-5xl md:text-7xl font-black        (800–900)
H2  → text-3xl md:text-4xl font-bold         (700)
H3  → text-xl md:text-2xl font-semibold      (600)
H4  → text-xl md:text-xl font-semibold      (600)
H5  → text-xl md:text-lg font-semibold      (600)
H6  → text-xl md:text-md font-semibold      (600)
Body → text-base md:text-lg font-normal      (400)
Nav  → text-sm md:text-base font-medium      (500)
Card Title → text-lg font-semibold           (600)
Meta → text-xs font-normal text-[#C4A882]    (400)
Tag  → text-xs font-medium uppercase tracking-wide (500)
Footer → text-sm font-normal                 (400)

```

## 🏗️ Website Structure

### 1. Home Page (`/`)
- **Hero Section**: High-impact branding with the "Knowledge Portal" identity.
- **Mission Statement**: Focused on preserving localized knowledge and empowering communities via AI.
- **Latest Insights**: A curated grid of the newest AI-generated blog posts.
- **Section Redirects**: Direct entry points to **Explore** and **AI Blogs**.

### 2. Explore (`/explore`)
- **Smart Dictionary**: Universal translation engine between 50+ languages and Creole variants (`/explore/dictionary`).
- **AI Assistant "Koné"**: Conversational agent specializing in knowledge and language guidance (`/explore/assistant`).

### 3. AI Insights Blog Engine (`/blogs`)
- **Curated Feed**: Displays the latest research across all categories (Agriculture, Health, Education, Sports, Politics, Technology).
- **Automated Generator**: A sophisticated AI engine that "scrapes" regional and sector-specific trending news (via RSS) to identify high-impact topics.
- **Expert Personas**: Articles are written using specialized expert personas (e.g., Agricultural Scientist, Clinical Researcher) to ensure authoritative, evidence-based content.
- **Deep Research Generation**: High-fidelity, 1,200+ word articles featuring structured HTML, data points, and expert insights via Gemini 2.0 Flash.
- **Multimedia Integration**: Every blog is enhanced with context-aware **YouTube coverage** and photorealistic **Pollinations AI** cover images.
- **Interactive Knowledge Check**: Built-in 5-question AI-generated quizzes with immediate feedback to reinforce reader comprehension.
- **Full archive access**: Complete listing of all previously generated intelligence reports.

---

## 🤖 AI & Technical Stack

### AI Integrations (Google Gemini 2.0 Flash)
- **Deep Research Persona**: Gemini acts as a professional analyst, cross-referencing trending news with high-quality knowledge bases.
- **Interactive Quiz Engine**: Automated generation of 5-question multiple-choice tests for every article.
- **Multilingual Lexicography**: AI-powered dictionary providing definitions, phonetics, and context.
- **Visual Synthesis**: Dynamic cover image generation via Pollinations AI integration.

### Core Technology
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **API Architecture**: Hono.js integrated into Next.js routes
- **Content Source**: Category-specific RSS feeds (Trending.ts)

---

## 🏗️ Technical Architecture

The Knowledge Portal follows a modern decoupled architecture where the frontend, backend, and AI layers interact seamlessly:

```mermaid
graph TD
    subgraph "Client layer (Next.js 15)"
        UI["React Server & Client Components"]
        Forms["Interactive Forms & Quizzes"]
    end

    subgraph "API Layer (Hono.js)"
        API["Hono Middleware & Routes"]
        Auth["Authentication / Validation"]
    end

    subgraph "Service Layer"
        Gemini["Gemini 2.0 AI Engine"]
        RSS["RSS Scraper (Trending)"]
        Pollinations["Pollinations AI (Images)"]
        YT["YouTube Integration"]
    end

    subgraph "Data Layer"
        DB[("PostgreSQL")]
        Drizzle["Drizzle ORM"]
    end

    UI <--> API
    API <--> Gemini
    API <--> RSS
    API <--> Drizzle
    Drizzle <--> DB
    Gemini --> Pollinations
    RSS --> Gemini
    Gemini --> YT
```

### Data Flow & Lifecycle:

1. **Trend Discovery**: The `RSS Scraper` fetches global news which is analyzed by `Gemini` to identify high-relevance topics.
2. **Blog Synthesis**: Gemini assumes an `Expert Persona` to generate a 1,200+ word report. The result is structured as JSON, including a dynamic **Pollinations AI** image prompt and **YouTube** video search parameters.
3. **Persistence**: The structured report and generated quiz are saved to `PostgreSQL` via `Drizzle`.
4. **Delivery**: The `Next.js` frontend fetches data through `Hono` API routes and renders interactive, SEO-optimized pages.

---

## 🌍 Sector Specializations

| Sector | Focus Area | AI Integration |
|--------|------------|----------------|
| **Agriculture** | Soil health, sustainable yield, and pest management. | RSS Trend Tracking + Gemini Pro tips. |
| **Health** | Clinical accuracy, disease prevention, and well-being. | Strict disclaimer enforcement + accuracy-first prompts. |
| **Education** | Bilingual curriculum and instructional clarity. | Lesson-plan style structures in blog content. |
| **Sports** | Global events and community fitness trends. | Real-time news synthesis. |
| **Politics** | Policy analysis and civic engagement. | Neutral, analytical reporting. |
| **Technology** | IT industry, software engineering, and digital transformation. | Technical tutorials + Emerging tech analysis. |

---

*Built with love to preserve localized knowledge and empower communities to solve real challenges.*

*"Yon sèl dwèt pa ka manje kalalou." — One finger cannot eat okra alone. (Haitian Proverb)*