"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingFactsProps {
    onComplete?: () => void;
    isVisible: boolean;
    uploadProgress?: number;
    status?: "uploading" | "processing";
}

interface Fact {
    description: string;
    citation: string;
    source: string;
}

export default function LoadingFacts({ onComplete, isVisible, uploadProgress = 0, status = "processing" }: LoadingFactsProps) {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [internalFadingOut, setInternalFadingOut] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Academic facts about sludge content, brain rot, and neurodegenerative content
    const facts: Fact[] = [
        {
            description: "At one U.S. university, students who spend hours on TikTok report shorter attention spans and slightly lower GPAs.",
            citation: "Haliti-Sylaj & Sadiku, 2024",
            source: "https://files.eric.ed.gov/fulltext/EJ1454296.pdf"
        },
        {
            description: "Lab tests revealed that watching a stream of quick videos made people forget planned tasks more often, hinting at strained short-term memory.",
            citation: "Chiossi et al., 2023",
            source: "https://arxiv.org/abs/2302.03714"
        },
        {
            description: "In one study with three separate groups, people who juggle lots of media at the same time scored worse on basic attention tests.",
            citation: "Rioja et al., 2023",
            source: "https://doi.org/10.1037/tmb0000106"
        },
        {
            description: "A 2025 meta-analysis covering 33 studies confirmed that the heavier someone multitasks with media, the weaker their sustained attention tends to be.",
            citation: "Chen et al., 2025",
            source: "https://doi.org/10.1007/s12144-025-07624-2"
        },
        {
            description: "Classic learning research finds that showing two information streams side-by-side forces your mind to keep switching focus, which drains mental energy.",
            citation: "Chandler & Sweller, 1992",
            source: "https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/j.2044-8279.1992.tb01017.x"
        },
        {
            description: "An EEG experiment found that heavy short-video users have weaker front-brain signals linked to self-control and focus.",
            citation: "Yan et al., 2024",
            source: "https://doi.org/10.3389/fnhum.2024.1383913"
        },
        {
            description: "Survey work with 2,239 students shows that weaker self-control and a “live-in-the-present” mindset both predict a higher risk of short-video addiction.",
            citation: "Liu et al., 2025",
            source: "https://doi.org/10.3389/fpsyg.2025.1538948"
        }
    ];

    // Effect to handle visibility changes
    useEffect(() => {
        if (!isVisible && !internalFadingOut) {
            // Start fade out when component should be hidden
            setInternalFadingOut(true);
            setTimeout(() => {
                setIsFadingOut(true);
                if (onComplete) {
                    setTimeout(() => {
                        onComplete();
                    }, 500);
                }
            }, 500);
        } else if (isVisible) {
            // Reset states when becoming visible again
            setIsFadingOut(false);
            setInternalFadingOut(false);
        }
    }, [isVisible, onComplete, internalFadingOut]);

    // Rotate facts every 5 seconds when visible
    useEffect(() => {
        if (!isVisible) return;

        const factInterval = setInterval(() => {
            setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        }, 5000);

        return () => {
            clearInterval(factInterval);
        };
    }, [facts.length, isVisible]);

    // Don't render if not visible, unless we're in the middle of fading out
    if (!isVisible && !internalFadingOut) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-white/90 backdrop-blur-sm transition-opacity duration-500 ${isFadingOut || internalFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                } flex flex-col items-center justify-center`}
        >
            <div className="mb-8 flex flex-col items-center">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-purple-100 flex items-center justify-center">
                        <Brain className="w-10 h-10 text-purple-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full">
                        <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                    </div>
                </div>
                <h2 className="text-xl font-bold mt-4 text-center">Analyzing Content</h2>
                <p className="text-gray-500 text-center mt-1">
                    {status === "uploading" ? "Uploading your video..." : "Our AI is processing your video"}
                </p>
            </div>

            <div className="w-full max-w-md mb-8">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-linear"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>{status === "uploading" ? "Uploading" : "Processing"}</span>
                    <span>{Math.round(uploadProgress)}%</span>
                </div>
            </div>

            <Card className="w-full max-w-md border border-purple-100 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start">
                        <div className="mr-4 mt-1">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Brain className="w-4 h-4 text-purple-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">Did you know?</h3>
                            <p className="text-gray-600">{facts[currentFactIndex].description}</p>
                            <p className="text-gray-500 text-sm mt-1">
                                <a href={facts[currentFactIndex].source} target="_blank" rel="noopener noreferrer" className="underline">
                                    {facts[currentFactIndex].citation}
                                </a>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}