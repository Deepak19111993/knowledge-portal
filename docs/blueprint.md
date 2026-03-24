# 🌿 Knowledge Portal — AI-Powered Website Blueprint

> A comprehensive guide to features, functionality, design system, and AI integrations for a modern localized knowledge, cultural, and global intelligence platform.

---

## 🎯 Project Overview

The **Knowledge Portal** is a streamlined AI-powered hub designed to empower communities through localized intelligence and cultural preservation. The platform has been refactored into a focused dual-purpose architecture:

1. **Cultural Exploration & Preservation** — Safeguarding localized traditions, language variants, and historical knowledge. (Route: `/explore`)
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

| Use | Font | Weight | Notes |
|-----|------|--------|-------|
| Headlines | **Playfair Display** | 700–900 | Elegant serif for cultural headlines |
| Body Text | **Lora** | 400–600 | Warm, readable serif for long-form blogs |
| UI Elements | **DM Sans** | 400–500 | Clean sans for navigation and forms |

---

## 🏗️ Website Structure

### 1. Home Page (`/`)
- **Hero Section**: High-impact branding with the "Knowledge Portal" identity.
- **Mission Statement**: Focused on preserving localized knowledge and empowering communities via AI.
- **Latest Insights**: A curated grid of the newest AI-generated blog posts.
- **Section Redirects**: Direct entry points to **Explore Culture** and **AI Blogs**.

### 2. Culture Explorer (`/explore`)
- **Smart Dictionary**: Multilingual translation and cultural definitions.
- **AI Assistant "Koné"**: Conversational AI specializing in local history and linguistics.
- **Learning Center**: Structured paths for language and cultural mastery.

### 3. AI Insights Blog Engine (`/blogs`)
- **Curated Feed**: Displays the latest 6 articles across all categories (Agriculture, Health, Education, Sports, Politics).
- **Automated Generator**: A category-mandatory AI engine that "scrapes" trending news (via RSS) and generates deep-research blogs using Gemini 1.5.
- **Full Archive**: Dedicated search and listing for all previously generated intelligence reports (`/blogs/all`).
- **Interactive Learning**: Every blog post features an **AI-Generated Quiz** with real-time scoring to reinforce knowledge retention.

---

## 🤖 AI & Technical Stack

### AI Integrations (Google Gemini 1.5)
- **Deep Research Persona**: Gemini acts as a professional analyst, cross-referencing trending news with high-quality knowledge bases.
- **Interactive Quiz Engine**: Automated generation of 5-question multiple-choice tests for every article.
- **Visual Synthesis**: Dynamic cover image generation via Pollinations AI integration.

### Core Technology
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **API Architecture**: Hono.js integrated into Next.js routes
- **Content Source**: Category-specific RSS feeds (Trending.ts)

---

## 📋 Current Implementation Status

### ✅ Completed (Phase 1 & 2)
- [x] Full rebranding from legacy "Creole" to **Knowledge Portal**.
- [x] Refactored Navigation: Home, Explore, AI Blogs.
- [x] **AI Blog Engine**: Successfully implemented RSS-based discovery and Gemini-powered article writing.
- [x] **Mandatory Categorization**: Enforced Agriculture, Health, Education, Sports, Politics selection.
- [x] **Interactive Quizzes**: Database-backed quiz system with real-time feedback UI.
- [x] **Footer Redesign**: Streamlined 3-column professional footer with quick navigation.

### ⏳ In Progress (Phase 3)
- [ ] **Advanced Learning Center**: Transitioning static courses to interactive AI-tutor sessions.
- [ ] **Global Search**: Unified indexing across the dictionary and the growing blog archive.
- [ ] **Offline PWA Support**: Enabling cached access to core health and agriculture guides.

---

## 🌍 Sector Specializations

| Sector | Focus Area | AI Integration |
|--------|------------|----------------|
| **Agriculture** | Soil health, sustainable yield, and pest management. | RSS Trend Tracking + Gemini Pro tips. |
| **Health** | Clinical accuracy, disease prevention, and well-being. | Strict disclaimer enforcement + accuracy-first prompts. |
| **Education** | Bilingual curriculum and instructional clarity. | Lesson-plan style structures in blog content. |
| **Sports** | Global events and community fitness trends. | Real-time news synthesis. |
| **Politics** | Policy analysis and civic engagement. | Neutral, analytical reporting. |

---

*Built with love to preserve localized knowledge and empower communities to solve real challenges.*

*"Yon sèl dwèt pa ka manje kalalou." — One finger cannot eat okra alone. (Haitian Proverb)*