"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
    question: string;
    options: string[];
    answer: number;
}

interface BlogQuizProps {
    quiz: Question[];
}

export default function BlogQuiz({ quiz }: BlogQuizProps) {
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    if (!quiz || quiz.length === 0) return null;

    const handleStart = () => {
        setIsStarted(true);
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowResults(false);
        setIsAnswered(false);
    };

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === quiz[currentQuestion].answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < quiz.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    if (!isStarted) {
        return (
            <div className="mt-20 p-10 rounded-3xl bg-primary/5 border border-primary/20 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                    <HelpCircle size={32} />
                </div>
                <h3 className="text-3xl font-black font-serif text-foreground mb-4">Test Your Knowledge</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Challenge yourself with a quick 5-question quiz based on the insights you just read.
                    Can you get a perfect score?
                </p>
                <button
                    onClick={handleStart}
                    className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary-light hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto"
                >
                    Start Quick Quiz
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    }

    if (showResults) {
        const percentage = (score / quiz.length) * 100;
        return (
            <div className="mt-20 p-10 rounded-3xl bg-surface border border-muted/30 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mx-auto mb-8">
                    <Award size={40} />
                </div>
                <h3 className="text-4xl font-black font-serif text-foreground mb-4">Quiz Completed!</h3>
                <div className="mb-8">
                    <p className="text-6xl font-black text-primary mb-2">{score} / {quiz.length}</p>
                    <p className="text-lg text-muted-foreground">
                        {percentage === 100 ? "Perfect Score! You're a true expert." :
                            percentage >= 60 ? "Great job! You have a strong grasp of the topic." :
                                "Good effort! Review the article and try again for a higher score."}
                    </p>
                </div>
                <button
                    onClick={handleStart}
                    className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={18} />
                    Try Again
                </button>
            </div>
        );
    }

    const question = quiz[currentQuestion];

    return (
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-surface border border-muted/30 shadow-xl relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-2 bg-primary/10 w-full">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                />
            </div>

            <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                    Question {currentQuestion + 1} of {quiz.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    Score: {score}
                </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-foreground mb-8 leading-tight">
                {question.question}
            </h3>

            <div className="space-y-4 mb-10">
                {question.options.map((option, idx) => {
                    const isCorrect = idx === question.answer;
                    const isSelected = selectedOption === idx;

                    let variant = "default";
                    if (isAnswered) {
                        if (isCorrect) variant = "correct";
                        else if (isSelected) variant = "incorrect";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={isAnswered}
                            className={cn(
                                "w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group",
                                variant === "default" && "border-muted/20 hover:border-primary/50 bg-background/50 hover:bg-background",
                                variant === "correct" && "border-green-500 bg-green-50 text-green-700",
                                variant === "incorrect" && "border-red-500 bg-red-50 text-red-700"
                            )}
                        >
                            <span>{option}</span>
                            {isAnswered && isCorrect && <CheckCircle2 size={24} className="text-green-500" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle size={24} className="text-red-500" />}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-primary-light hover:-translate-y-1 transition-all flex items-center justify-center gap-2 ml-auto animate-in slide-in-from-right-4 duration-300"
                >
                    {currentQuestion === quiz.length - 1 ? "Show Final Result" : "Next Question"}
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
}
