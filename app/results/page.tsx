"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    ArrowLeft,
    BarChart3,
    CheckCircle,
    Clock,
    Copy,
    ExternalLink,
    Eye,
    FileText,
    LightbulbIcon,
    List,
    Loader2,
    MessageSquare,
    Pause,
    Play
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FeatureWithTimestamp {
    text: string;
    start_time: number;
    end_time: number;
}

interface AnalysisResult {
    is_sludge: boolean;
    layout_category: string;
    confidence: number;
    summary: string;
    text_features: FeatureWithTimestamp[];
    visual_features: FeatureWithTimestamp[];
    recommendations: string[];
}

interface AnalysisResultWithProcessingTime {
    classification: AnalysisResult;
    processing_time: number;
}

// Helper function to determine video type
const getVideoType = (url: string): 'youtube' | 'tiktok' | 'blob' | 'unknown' => {
    if (url.startsWith('blob:')) return 'blob';

    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/;
    const tiktokRegex = /(?:tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/[a-zA-Z0-9]+|m\.tiktok\.com\/v\/\d+)/;

    if (youtubeRegex.test(url)) return 'youtube';
    if (tiktokRegex.test(url)) return 'tiktok';

    return 'unknown';
};

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
};

export default function ResultsPage() {
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoOrientation, setVideoOrientation] = useState<"horizontal" | "vertical">("horizontal");
    const [isLoading, setIsLoading] = useState(true);
    const [processingTime, setProcessingTime] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Get video URL and analysis results from sessionStorage
        const storedVideoUrl = sessionStorage.getItem("videoUrl");
        const storedResults = sessionStorage.getItem("analysisResult");

        if (storedVideoUrl) {
            setVideoUrl(storedVideoUrl);
        }

        if (storedResults) {
            try {
                const parsedResults = JSON.parse(storedResults) as AnalysisResultWithProcessingTime;
                setResults(parsedResults.classification);
                setProcessingTime(parsedResults.processing_time);
                setIsLoading(false);
            } catch (error) {
                console.error("Error parsing analysis results:", error);
            }
        } else {
            // If no results are in session storage, keep the loading state
            setIsLoading(true);
        }

        return () => { };
    }, []);

    // Detect video orientation when video metadata is loaded
    const handleVideoMetadata = () => {
        if (videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            setVideoOrientation(videoWidth >= videoHeight ? "horizontal" : "vertical");
        }
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
    };

    const playSegment = (start: number, end: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = start;
            videoRef.current.play();
            setIsPlaying(true);

            // Stop playing after segment ends
            const stopPlayback = () => {
                if (videoRef.current && videoRef.current.currentTime >= end) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                    videoRef.current.removeEventListener("timeupdate", stopPlayback);
                }
            };

            videoRef.current.addEventListener("timeupdate", stopPlayback);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const renderVideoDisplay = () => {
        if (!videoUrl) return null;

        const videoType = getVideoType(videoUrl);

        switch (videoType) {
            case 'youtube':
                const youtubeId = getYouTubeVideoId(videoUrl);
                if (youtubeId) {
                    return (
                        <div className="w-full mx-auto rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                width="100%"
                                height="280"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg"
                            />
                            <div className="mt-3 text-center">
                                <p className="text-sm text-gray-500">YouTube Video</p>
                                <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center justify-center mt-1"
                                >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Open in YouTube
                                </a>
                            </div>
                        </div>
                    );
                }
                break;

            case 'tiktok':
                return (
                    <div className="w-full mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                        <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-600 mb-2">TikTok Video Analyzed</p>
                        <p className="text-xs text-gray-500 mb-3 break-all">{videoUrl}</p>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View on TikTok
                        </a>
                    </div>
                );

            case 'blob':
                // Original video player for uploaded files
                return (
                    <div
                        className={`relative w-full mx-auto bg-black rounded-lg overflow-hidden shadow-lg ${videoOrientation === "vertical" ? "max-w-[240px]" : "max-w-full"
                            }`}
                    >
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            className="w-full h-auto"
                            onLoadedMetadata={handleVideoMetadata}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                    </div>
                );

            default:
                return (
                    <div className="w-full mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                        <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-600 mb-2">Video URL Analyzed</p>
                        <p className="text-xs text-gray-500 mb-3 break-all">{videoUrl}</p>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open Link
                        </a>
                    </div>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="flex items-center justify-center mb-8">
                        <Button variant="ghost" asChild className="mr-4">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                    <div className="p-8">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Loading results...</h3>
                        <p className="text-gray-500 mt-2">Please wait while we retrieve your analysis</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">No Analysis Results Found</h1>
                <p className="mb-6 text-gray-600">Please upload a video to analyze first.</p>
                <Button asChild>
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        );
    }

    const isSludge = results.is_sludge;
    const confidencePercentage = Math.round(results.confidence * 100);

    return (
        <main className="min-h-screen relative overflow-hidden bg-white">
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Button variant="ghost" asChild className="mr-4">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Analysis Results</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column - Video and Classification */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Compact classification result */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center">
                                    <div className={`p-3 rounded-full ${isSludge ? "bg-red-100" : "bg-green-100"} mr-4`}>
                                        {isSludge ? (
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                        ) : (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {isSludge ? "Sludge Content Detected" : "No Sludge Content Detected"}
                                        </h3>
                                        <div className="flex items-center mt-1">
                                            <span className="text-xs font-medium mr-2">Confidence:</span>
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${isSludge ? "bg-red-500" : "bg-green-500"}`}
                                                    style={{ width: `${confidencePercentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium ml-2">{confidencePercentage}%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Processing time display */}
                        {processingTime && (
                            <Card>
                                <CardContent className="pt-4 pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-purple-500" />
                                            <span className="text-sm font-medium">Processing Time</span>
                                        </div>
                                        <Badge variant="outline" className="font-mono">
                                            {formatTime(processingTime)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Video preview with adaptive layout */}
                        {videoUrl && (
                            <Card className="overflow-visible">
                                <CardHeader>
                                    <CardTitle>Analyzed Video</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    {renderVideoDisplay()}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right column - Analysis details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    Analysis Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{results.summary}</p>
                            </CardContent>
                        </Card>

                        {/* Tabs for features and recommendations */}
                        <Tabs defaultValue="visual" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="visual" className="flex items-center justify-center">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Visual Features
                                </TabsTrigger>
                                <TabsTrigger value="textual" className="flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Text Features
                                </TabsTrigger>
                                <TabsTrigger value="recommendations" className="flex items-center justify-center">
                                    <LightbulbIcon className="w-4 h-4 mr-2" />
                                    Recommendations
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="visual" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Visual Elements</CardTitle>
                                        <CardDescription>Key visual characteristics identified in the video</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {results.visual_features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <List className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1">
                                                        <span>{feature.text}</span>
                                                        {getVideoType(videoUrl!) === 'blob' && (
                                                            <Badge
                                                                variant="outline"
                                                                className="ml-2 cursor-pointer hover:bg-purple-100 transition-colors"
                                                                onClick={() => playSegment(feature.start_time, feature.end_time)}
                                                            >
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                {formatTime(feature.start_time)} - {formatTime(feature.end_time)}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="textual" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Text Elements</CardTitle>
                                        <CardDescription>Key textual characteristics identified in the video</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {results.text_features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <List className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1">
                                                        <span>{feature.text}</span>
                                                        {getVideoType(videoUrl!) === 'blob' && (
                                                            <Badge
                                                                variant="outline"
                                                                className="ml-2 cursor-pointer hover:bg-purple-100 transition-colors"
                                                                onClick={() => playSegment(feature.start_time, feature.end_time)}
                                                            >
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                {formatTime(feature.start_time)} - {formatTime(feature.end_time)}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="recommendations" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Content Recommendations</CardTitle>
                                        <CardDescription>Suggestions based on content analysis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {results.recommendations.map((recommendation, index) => (
                                                <li key={index} className="flex items-start">
                                                    <LightbulbIcon className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1">
                                                        <span>{recommendation}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        {/* Academic citation */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center text-sm">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Academic Citation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    <p className="text-xs text-gray-600 font-mono bg-gray-50 p-3 rounded pr-10">
                                        Coma, A.R., Olata, M., Ong, J.I., Sioson, K.I. (2025). Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize &rdquo;Sludge&rdquo; Videos From Short-Form Content.
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                'Coma, A.R., Olata, M., Ong, J.I., Sioson, K.I. (2025). Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize "Sludge" Videos From Short-Form Content.',
                                            );
                                            // You could add a toast notification here
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                        <span className="sr-only">Copy citation</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}