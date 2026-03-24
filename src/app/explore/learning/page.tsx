"use client";

import { useState } from "react";
import { GraduationCap, Sparkles, CheckCircle2, ArrowRight, PlayCircle, Video, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
    title: string;
    duration: string;
    videoId: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    icon: string;
    level: string;
    lessons: Lesson[];
}

const AI_COURSES: Course[] = [
    {
        id: "gen-ai",
        title: "Generative AI Masterclass",
        description: "From LLMs to Diffusion Models: Master the technologies powering ChatGPT and Midjourney.",
        icon: "✨",
        level: "Beginner",
        lessons: [
            { title: "Lesson 1: Introduction to Generative AI", duration: "12:45", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 2: How Large Language Models Work", duration: "15:20", videoId: "aircAruvnKk" },
            { title: "Lesson 3: The Basics of Prompt Engineering", duration: "10:30", videoId: "jC4v5AS4ART" },
            { title: "Lesson 4: Zero-Shot vs Few-Shot Learning", duration: "18:00", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 5: Understanding Transformers", duration: "14:15", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 6: Self-Attention Mechanisms", duration: "20:00", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 7: Fine-Tuning pretrained Models", duration: "25:10", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 8: RAG (Retrieval-Augmented Gen)", duration: "22:45", videoId: "jC4v5AS4ART" },
            { title: "Lesson 9: AI Agents & LangChain", duration: "19:30", videoId: "ad79nYk2Oig" },
            { title: "Lesson 10: Deploying LLM Applications", duration: "16:20", videoId: "zjkBMFhNj_g" },
        ]
    },
    {
        id: "ai-ml",
        title: "Artificial Intelligence & ML",
        description: "Learn Python, TensorFlow, and the mathematical foundations of Neural Networks.",
        icon: "🧠",
        level: "Advanced",
        lessons: [
            { title: "Lesson 1: What is Machine Learning?", duration: "14:20", videoId: "ad79nYk2Oig" },
            { title: "Lesson 2: Supervised vs Unsupervised", duration: "18:10", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 3: Linear Regression dive", duration: "22:00", videoId: "jC4v5AS4ART" },
            { title: "Lesson 4: Logistic Regression", duration: "15:45", videoId: "aircAruvnKk" },
            { title: "Lesson 5: Intro to Neural Networks", duration: "19:10", videoId: "aircAruvnKk" },
            { title: "Lesson 6: Gradient Descent explained", duration: "21:30", videoId: "I74ymkoNTnw" },
            { title: "Lesson 7: Backpropagation Calculus", duration: "25:00", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 8: Convolutional Networks (CNNs)", duration: "26:15", videoId: "ad79nYk2Oig" },
            { title: "Lesson 9: Recurrent Networks (RNNs)", duration: "18:40", videoId: "aircAruvnKk" },
            { title: "Lesson 10: Building your first AI Model", duration: "30:00", videoId: "zjkBMFhNj_g" },
        ]
    },
    {
        id: "devops",
        title: "DevOps & CI/CD Pipelines",
        description: "Build, test, and deploy faster using Docker, Kubernetes, Jenkins, and GitHub Actions.",
        icon: "⚙️",
        level: "Intermediate",
        lessons: [
            { title: "Lesson 1: The DevOps Philosophy", duration: "08:20", videoId: "jC4v5AS4ART" },
            { title: "Lesson 2: Linux Basics for DevOps", duration: "18:10", videoId: "ad79nYk2Oig" },
            { title: "Lesson 3: Git & Version Control", duration: "14:30", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 4: Docker Fundamentals", duration: "25:00", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 5: Writing Dockerfiles", duration: "19:15", videoId: "aircAruvnKk" },
            { title: "Lesson 6: Docker Compose Multi-container", duration: "22:40", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: CI/CD with GitHub Actions", duration: "28:10", videoId: "jC4v5AS4ART" },
            { title: "Lesson 8: Intro to Jenkins", duration: "20:00", videoId: "ad79nYk2Oig" },
            { title: "Lesson 9: Kubernetes Architecture", duration: "31:20", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 10: Scaling apps with K8s cluster", duration: "29:45", videoId: "WXuK6gekU1Y" },
        ]
    },
    {
        id: "cloud-computing",
        title: "Cloud Computing Fundamentals",
        description: "Deploy scalable applications on AWS, Google Cloud, and Microsoft Azure.",
        icon: "☁️",
        level: "Beginner",
        lessons: [
            { title: "Lesson 1: What is the Cloud?", duration: "09:40", videoId: "ad79nYk2Oig" },
            { title: "Lesson 2: IaaS vs PaaS vs SaaS", duration: "12:15", videoId: "aircAruvnKk" },
            { title: "Lesson 3: Introduction to AWS", duration: "18:30", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 4: Core AWS Services (EC2, S3)", duration: "22:45", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 5: Identity & Access (IAM)", duration: "16:20", videoId: "jC4v5AS4ART" },
            { title: "Lesson 6: Cloud Networking & VPC", duration: "21:10", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: Serverless Computing (Lambda)", duration: "19:50", videoId: "ad79nYk2Oig" },
            { title: "Lesson 8: Database on Cloud (RDS, Dynamo)", duration: "25:30", videoId: "aircAruvnKk" },
            { title: "Lesson 9: Intro to Google Cloud & Azure", duration: "17:15", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 10: Deploying a Full Web App", duration: "28:00", videoId: "2eWuYf-aZE4" },
        ]
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity & Ethical Hacking",
        description: "Protect systems, identify vulnerabilities, and master modern encryption techniques.",
        icon: "🛡️",
        level: "Advanced",
        lessons: [
            { title: "Lesson 1: Intro to Cybersecurity", duration: "14:20", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 2: Cyber Threats & Malware", duration: "18:40", videoId: "jC4v5AS4ART" },
            { title: "Lesson 3: Cryptography Basics", duration: "22:15", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 4: Network Security Protocols", duration: "19:30", videoId: "aircAruvnKk" },
            { title: "Lesson 5: Firewalls & VPNs", duration: "16:45", videoId: "ad79nYk2Oig" },
            { title: "Lesson 6: Ethical Hacking & Kali Linux", duration: "25:00", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: Penetration Testing Steps", duration: "32:10", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 8: Web App Vulnerabilities (OWASP)", duration: "28:20", videoId: "jC4v5AS4ART" },
            { title: "Lesson 9: Social Engineering Attacks", duration: "17:50", videoId: "ad79nYk2Oig" },
            { title: "Lesson 10: Securing Your Enterprise", duration: "20:00", videoId: "WXuK6gekU1Y" },
        ]
    },
    {
        id: "data-science",
        title: "Data Science & Analytics",
        description: "Analyze Big Data, build statistical models, and learn advanced Python data visualizations.",
        icon: "📊",
        level: "Intermediate",
        lessons: [
            { title: "Lesson 1: The Data Science Pipeline", duration: "15:10", videoId: "ad79nYk2Oig" },
            { title: "Lesson 2: Python for Data Science", duration: "22:30", videoId: "aircAruvnKk" },
            { title: "Lesson 3: Data Manipulation with Pandas", duration: "28:15", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 4: Numerical Arrays with NumPy", duration: "19:40", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 5: Cleaning Messy Datasets", duration: "24:00", videoId: "jC4v5AS4ART" },
            { title: "Lesson 6: Data Visualization (Matplotlib)", duration: "21:20", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: Creating Interactive Dashboards", duration: "26:50", videoId: "ad79nYk2Oig" },
            { title: "Lesson 8: Statistical Modeling Basics", duration: "30:10", videoId: "aircAruvnKk" },
            { title: "Lesson 9: Intro to Scikit-Learn", duration: "35:00", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 10: Capstone: Predicting House Prices", duration: "45:00", videoId: "2eWuYf-aZE4" },
        ]
    },
    {
        id: "full-stack",
        title: "Full-Stack Web Development",
        description: "Build modern web applications from scratch with React, Next.js, and Node.js.",
        icon: "💻",
        level: "Beginner",
        lessons: [
            { title: "Lesson 1: How the Web Works (HTTP)", duration: "12:20", videoId: "jC4v5AS4ART" },
            { title: "Lesson 2: HTML5 & Semantic Tags", duration: "18:45", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 3: Modern CSS & Tailwind", duration: "25:15", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 4: JavaScript Fundamentals", duration: "30:00", videoId: "aircAruvnKk" },
            { title: "Lesson 5: React Component Architecture", duration: "35:30", videoId: "ad79nYk2Oig" },
            { title: "Lesson 6: State Management (Hooks)", duration: "28:40", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: Backend Basics with Node.js", duration: "22:15", videoId: "jC4v5AS4ART" },
            { title: "Lesson 8: Building RESTful APIs (Express)", duration: "31:00", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 9: Database Integration (PostgreSQL)", duration: "26:50", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 10: Deploying Next.js on Vercel", duration: "19:20", videoId: "ad79nYk2Oig" },
        ]
    },
    {
        id: "blockchain",
        title: "Blockchain & Web3",
        description: "Understand smart contracts, Ethereum, and decentralized application (dApp) deployment.",
        icon: "⛓️",
        level: "Advanced",
        lessons: [
            { title: "Lesson 1: Introduction to Distributed Ledgers", duration: "14:10", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 2: How Cryptography Works", duration: "18:45", videoId: "aircAruvnKk" },
            { title: "Lesson 3: The Bitcoin Network", duration: "22:30", videoId: "ad79nYk2Oig" },
            { title: "Lesson 4: Ethereum & Virtual Machine", duration: "24:15", videoId: "2eWuYf-aZE4" },
            { title: "Lesson 5: Smart Contracts Explained", duration: "19:00", videoId: "jC4v5AS4ART" },
            { title: "Lesson 6: Intro to Solidity Programming", duration: "28:50", videoId: "zjkBMFhNj_g" },
            { title: "Lesson 7: Compiling & deploying contracts", duration: "30:20", videoId: "WXuK6gekU1Y" },
            { title: "Lesson 8: Web3.js & Frontend integration", duration: "35:40", videoId: "aircAruvnKk" },
            { title: "Lesson 9: Decentralized Finance (DeFi)", duration: "22:15", videoId: "ad79nYk2Oig" },
            { title: "Lesson 10: Minting your first NFT", duration: "25:00", videoId: "2eWuYf-aZE4" },
        ]
    }
];

export default function LearningCenterPage() {
    const [activeCourse, setActiveCourse] = useState<Course | null>(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

    const startCourse = (course: Course) => {
        setActiveCourse(course);
        setActiveLessonIndex(0);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <div className="inline-flex justify-center mb-4 w-12 h-12 rounded-xl bg-primary/10 items-center text-primary">
                        <GraduationCap size={24} />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-primary mb-4 leading-tight">
                        AI Learning
                    </h1>
                    <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
                        Explore our top-demanded interactive video courses to master Artificial Intelligence and secure your future.
                    </p>
                </div>

                {/* COURSE GRID VIEW */}
                {!activeCourse && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-500">
                        {AI_COURSES.map((course) => (
                            <div
                                key={course.id}
                                className="bg-surface border border-muted/30 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full cursor-pointer"
                                onClick={() => startCourse(course)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-muted/10 group-hover:scale-110 transition-transform">
                                        {course.icon}
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.level === 'Beginner' ? 'bg-green-100 text-green-700 border border-green-200' :
                                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                        {course.level}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold font-serif text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground flex-grow mb-6 leading-relaxed">
                                    {course.description}
                                </p>
                                <div className="mt-auto pt-4 border-t border-muted/20 flex items-center justify-between">
                                    <div className="flex items-center text-xs font-semibold text-muted-foreground gap-1">
                                        <BookOpen size={14} /> {course.lessons.length} Lessons
                                    </div>
                                    <Button className="bg-primary text-white rounded-full px-5 hover:bg-primary-light transition-colors gap-2 shadow-md">
                                        <PlayCircle size={16} /> Start
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* COURSE PLAYER VIEW */}
                {activeCourse && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-muted/20 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground font-serif flex items-center gap-3">
                                    <span className="text-4xl">{activeCourse.icon}</span>
                                    {activeCourse.title}
                                </h2>
                                <p className="text-muted-foreground mt-2">{activeCourse.description}</p>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-full border-muted/30 text-muted-foreground hover:bg-muted/10 shrink-0"
                                onClick={() => setActiveCourse(null)}
                            >
                                <ArrowRight size={16} className="mr-2 rotate-180" /> Back to Courses
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Video Player */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-xl border border-muted/20 relative">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${activeCourse.lessons[activeLessonIndex].videoId}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="bg-surface rounded-3xl p-8 border border-muted/20 shadow-sm">
                                    <h3 className="text-2xl font-bold font-serif mb-4 flex items-center gap-3">
                                        <Sparkles className="text-primary" size={24} />
                                        {activeCourse.lessons[activeLessonIndex].title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Welcome to {activeCourse.lessons[activeLessonIndex].title}. Watch the video above to master this concept. Once finished, mark it as complete and proceed to the next lesson in the sidebar! Our AI checks off your progress automatically.
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar Playlist */}
                            <div className="bg-surface rounded-3xl border border-muted/20 shadow-sm p-6 max-h-[800px] overflow-y-auto">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                    <BookOpen size={20} className="text-primary" />
                                    Course Curriculum
                                </h3>

                                <div className="space-y-3">
                                    {activeCourse.lessons.map((lesson, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveLessonIndex(idx)}
                                            className={`p-4 rounded-xl cursor-pointer transition-all border flex items-start gap-4 ${activeLessonIndex === idx
                                                    ? 'bg-primary/10 border-primary shadow-sm'
                                                    : 'bg-background border-muted/20 hover:border-primary/50 hover:bg-muted/5 text-muted-foreground'
                                                }`}
                                        >
                                            <div className={`mt-1 flex-shrink-0 ${activeLessonIndex === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                                                {activeLessonIndex === idx ? <PlayCircle size={20} /> : <Video size={20} />}
                                            </div>
                                            <div>
                                                <h4 className={`font-semibold text-sm leading-tight ${activeLessonIndex === idx ? 'text-primary' : 'text-foreground'}`}>
                                                    {lesson.title}
                                                </h4>
                                                <div className="flex items-center gap-1 mt-2 text-xs opacity-70 font-medium">
                                                    <Clock size={12} /> {lesson.duration}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-muted/20 text-center">
                                    <Button
                                        className="w-full rounded-full bg-primary text-white font-bold hover:bg-primary-light transition-colors h-12 shadow-md flex items-center gap-2"
                                        onClick={() => { setActiveCourse(null); }}
                                    >
                                        <CheckCircle2 size={18} /> Finish Course
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
