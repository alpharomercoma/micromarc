"use client";

import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ExternalLink, FileVideo, Link, Loader2, Pause, Play, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LoadingFacts from "./loading-facts";

// Simulated response type with timestamps
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
    processing_time: number;
}

// Video constraints
const MAX_VIDEO_DURATION = 300; // seconds (5 minutes)
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
const SUPPORTED_FORMAT = "video/mp4";

export default function UploadSection() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "downloading" | "uploading" | "processing" | "complete" | "error">("idle");
    const [_, setResults] = useState<AnalysisResult | null>(null);
    const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoOrientation, setVideoOrientation] = useState<"horizontal" | "vertical">("horizontal");
    const [error, setError] = useState<string | null>(null);
    const [downloadTime, setDownloadTime] = useState<number | null>(null);
    const [processingTime, setProcessingTime] = useState<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            validateAndHandleFile(droppedFile);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            validateAndHandleFile(selectedFile);
        }
    };

    const validateAndHandleFile = (videoFile: File) => {
        setError(null);

        // Check file format
        if (videoFile.type !== SUPPORTED_FORMAT) {
            setError("Only MP4 video format is supported.");
            return;
        }

        // Check file size
        if (videoFile.size > MAX_VIDEO_SIZE) {
            setError(`Video size exceeds the maximum limit of 50 MB.`);
            return;
        }

        // Create object URL for video preview and duration check
        const url = URL.createObjectURL(videoFile);

        // Create a temporary video element to check duration
        const tempVideo = document.createElement("video");
        tempVideo.src = url;
        tempVideo.onloadedmetadata = () => {
            if (tempVideo.duration > MAX_VIDEO_DURATION) {
                URL.revokeObjectURL(url);
                setError(`Video duration exceeds the maximum limit of ${MAX_VIDEO_DURATION} seconds (5 minutes).`);
                return;
            }

            // If all validations pass, set the file and URL
            setFile(videoFile);
            setVideoUrl(url);
        };

        tempVideo.onerror = () => {
            URL.revokeObjectURL(url);
            setError("Error loading video. Please try another file.");
        };
    };

    const validateUrl = (inputUrl: string, showError: boolean = true): boolean => {
        if (showError) setError(null);

        if (!inputUrl.trim()) {
            if (showError) setError("Please enter a valid URL.");
            return false;
        }

        // Validate YouTube and TikTok URLs - more comprehensive patterns
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|m\.youtube\.com\/watch\?v=)[a-zA-Z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/[a-zA-Z0-9]+|m\.tiktok\.com\/v\/\d+)/;

        if (!youtubeRegex.test(inputUrl) && !tiktokRegex.test(inputUrl)) {
            if (showError) setError("Please enter a valid YouTube or TikTok URL.");
            return false;
        }

        return true;
    };

    const handleUrlChange = (inputUrl: string) => {
        setUrl(inputUrl);

        // Show preview immediately for valid URLs
        if (inputUrl.trim() && validateUrl(inputUrl, false)) {
            setPreviewUrl(inputUrl);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleUrlSubmit = () => {
        if (!validateUrl(url)) return;

        // For URL input, we'll process it directly
        setVideoUrl(url);
        simulateUrlProcessing();
    };

    const simulateUrlProcessing = async () => {
        setUploadStatus("downloading");
        setShowLoadingOverlay(true);
        setDownloadProgress(0);
        setUploadProgress(0);
        setDownloadTime(null);
        setProcessingTime(null);

        let downloadInterval: NodeJS.Timeout | undefined;

        try {
            // Simulate download progress
            downloadInterval = setInterval(() => {
                setDownloadProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(downloadInterval);
                        return 95;
                    }
                    return prev + Math.random() * 15;
                });
            }, 200);

            const downloadStart = Date.now();

            // API call for URL processing
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const response = await fetch(`${apiEndpoint}/analyze-url`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            if (downloadInterval) clearInterval(downloadInterval);

            if (response.ok) {
                const result = await response.json();

                // Update progress and status for processing phase
                setDownloadProgress(100);
                setDownloadTime(result.download_time || (Date.now() - downloadStart) / 1000);
                setUploadStatus("processing");
                setUploadProgress(100);
                setProcessingTime(result.processing_time);

                // Store results and video URL in sessionStorage
                sessionStorage.setItem("videoUrl", url);
                sessionStorage.setItem("analysisResult", JSON.stringify(result));

                // Hide the loading overlay and navigate to results page
                setShowLoadingOverlay(false);
                setTimeout(() => {
                    router.push("/results");
                }, 500);
            } else {
                if (downloadInterval) clearInterval(downloadInterval);
                setShowLoadingOverlay(false);
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.error || "Error processing video URL. Please try again.");
                setUploadStatus("error");
            }
        } catch (error) {
            if (downloadInterval) clearInterval(downloadInterval);
            setShowLoadingOverlay(false);
            setError("Network error occurred. Please check your connection and try again.");
            setUploadStatus("error");
        }
    };

    // Detect video orientation when video metadata is loaded
    const handleVideoMetadata = () => {
        if (videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            setVideoOrientation(videoWidth >= videoHeight ? "horizontal" : "vertical");
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

    const clearFile = () => {
        if (videoUrl && file) {
            URL.revokeObjectURL(videoUrl);
        }
        setFile(null);
        setVideoUrl(null);
        setPreviewUrl(null);
        setUrl("");
        setUploadProgress(0);
        setDownloadProgress(0);
        setUploadStatus("idle");
        setResults(null);
        setIsPlaying(false);
        setError(null);
        setDownloadTime(null);
        setProcessingTime(null);
    };

    const resetErrorState = () => {
        setError(null);
        setUploadStatus("idle");
        setUploadProgress(0);
        setDownloadProgress(0);
        setShowLoadingOverlay(false);
    };

    const simulateUpload = async () => {
        if (!file) return;

        setUploadStatus("uploading");
        setShowLoadingOverlay(true);

        try {
            const formData = new FormData();
            formData.append("video", file);

            // Track progress with XMLHttpRequest
            const xhr = new XMLHttpRequest();
            const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8080";
            xhr.open("POST", apiEndpoint, true);

            // Track upload progress
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(progress);
                }
            };

            // Handle completion
            xhr.onload = async () => {
                if (xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);

                    // Store results and video URL in sessionStorage
                    sessionStorage.setItem("videoUrl", videoUrl || "");
                    sessionStorage.setItem("analysisResult", JSON.stringify(result));

                    // Hide the loading overlay and navigate to results page
                    setShowLoadingOverlay(false);
                    setTimeout(() => {
                        router.push("/results");
                    }, 500); // Give time for the overlay to fade out
                } else {
                    setShowLoadingOverlay(false);
                    setError("Error processing video. Please try again.");
                    setUploadStatus("error");
                }
            };

            // Handle errors
            xhr.onerror = () => {
                setShowLoadingOverlay(false);
                setError("Network error occurred. Please check your connection and try again.");
                setUploadStatus("error");
            };

            // Send the request
            xhr.send(formData);

            // Change to processing state once upload completes
            xhr.upload.onload = () => {
                setUploadStatus("processing");
                // Keep the progress bar at 100% during processing
                setUploadProgress(100);
            };
        } catch (error) {
            setShowLoadingOverlay(false);
            setError("An error occurred while uploading the video.");
            setUploadStatus("error");
        }
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value as "upload" | "link");
        clearFile(); // Clear any existing file/url when switching tabs
    };

    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />


            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200 bg-white/80">
                        Try it Yourself
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upload Your Video</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Demo with our fine-tuned multimodal model specializing in recognizing sludge videos - a subtype of internet brain rot that grabs attention by presenting mutliple streams of visual clips (e.g. Subway Surfers, Family Guy, Soap Cutting,)
                    </p>
                </div>
            </div>
            <section id="upload" className="px-4 md:px-8 max-w-4xl mx-auto relative">
                <LoadingFacts
                    isVisible={showLoadingOverlay}
                    uploadProgress={activeTab === "link" && uploadStatus === "downloading" ? downloadProgress : uploadProgress}
                    status={uploadStatus === "uploading" || uploadStatus === "downloading" ? "uploading" : "processing"}
                />
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-80">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="upload" className="flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload File
                            </TabsTrigger>
                            <TabsTrigger value="link" className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Paste Link
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload">
                            <div className="grid md:grid-cols-5 gap-6">
                                {/* Upload area - takes 3/5 of the space on medium screens and above */}
                                <div
                                    className={`md:col-span-3 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                                        ? "border-purple-500 bg-purple-50"
                                        : file
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-300 hover:border-purple-400"
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {!file ? (
                                        <>
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <Upload className="w-12 h-12 text-gray-400" />
                                                <div>
                                                    <p className="text-lg font-medium">Drag and drop your video here</p>
                                                    <p className="text-sm text-gray-500 mt-2">or click to browse files</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="video/mp4"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="video-upload"
                                                    ref={(input) => {
                                                        if (input) {
                                                            (window as any).videoFileInput = input;
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    variant="outline"
                                                    className="mt-2"
                                                    onClick={() => {
                                                        const input = document.getElementById('video-upload') as HTMLInputElement;
                                                        if (input) {
                                                            input.click();
                                                        }
                                                    }}
                                                >
                                                    Select Video
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="flex items-center justify-between w-full max-w-md">
                                                <div className="flex items-center space-x-3">
                                                    <FileVideo className="w-8 h-8 text-purple-500" />
                                                    <div className="text-left">
                                                        <p className="font-medium truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                                                        <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={clearFile}
                                                    disabled={uploadStatus === "uploading" || uploadStatus === "processing"}
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            </div>

                                            {uploadStatus === "idle" && (
                                                <Button onClick={simulateUpload} className="mt-4">
                                                    Upload & Analyze
                                                </Button>
                                            )}

                                            {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                                                <div className="w-full max-w-md space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium">
                                                            {uploadStatus === "uploading" ? "Uploading..." : "Processing..."}
                                                        </span>
                                                        <span className="text-sm text-gray-500">{uploadProgress}%</span>
                                                    </div>
                                                    <Progress value={uploadProgress} className="w-full" />
                                                    <div className="flex items-center justify-center text-sm text-gray-500">
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        {uploadStatus === "uploading" ? "Uploading your video..." : "AI is analyzing your content..."}
                                                    </div>
                                                </div>
                                            )}

                                            {uploadStatus === "error" && <div className="text-red-500">An error occurred. Please try again.</div>}
                                        </div>
                                    )}
                                </div>

                                {/* Video preview area - takes 2/5 of the space on medium screens and above */}
                                <div className="md:col-span-2 flex flex-col items-center justify-center">
                                    {videoUrl && file ? (
                                        <div className="relative w-full h-full flex flex-col items-center justify-center">
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
                                            <p className="text-sm text-gray-500 mt-3 text-center">Video Preview</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4">
                                            <p className="text-gray-400 text-center">Video preview will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>Supported format: MP4 only (Max size: 100MB, Max duration: 5 minutes)</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="link">
                            <div className="grid md:grid-cols-5 gap-6">
                                {/* URL input area - takes 3/5 of the space on medium screens and above */}
                                <div className="md:col-span-3 border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-purple-400 transition-colors">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Link className="w-12 h-12 text-gray-400" />
                                        <div>
                                            <p className="text-lg font-medium">Paste YouTube or TikTok URL</p>
                                            <p className="text-sm text-gray-500 mt-2">Enter a direct link to analyze the video</p>
                                        </div>

                                        <div className="w-full max-w-md space-y-4">
                                            <Input
                                                type="url"
                                                placeholder="https://youtube.com/watch?v=... or https://tiktok.com/@user/video/..."
                                                value={url}
                                                onChange={(e) => handleUrlChange(e.target.value)}
                                                className="w-full"
                                                disabled={uploadStatus === "processing" || uploadStatus === "downloading"}
                                            />

                                            {uploadStatus === "idle" && (
                                                <Button
                                                    onClick={handleUrlSubmit}
                                                    className="w-full"
                                                    disabled={!url.trim()}
                                                >
                                                    Analyze Video
                                                </Button>
                                            )}

                                            {uploadStatus === "downloading" && (
                                                <div className="w-full space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-medium">Downloading...</span>
                                                        <span className="text-sm text-gray-500">{Math.round(downloadProgress)}%</span>
                                                    </div>
                                                    <Progress value={downloadProgress} className="w-full" />
                                                    <div className="flex items-center justify-center text-sm text-gray-500">
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Downloading video from platform...
                                                    </div>
                                                </div>
                                            )}

                                            {uploadStatus === "processing" && (
                                                <div className="w-full space-y-3">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium">Download Complete</span>
                                                            <span className="text-sm text-green-600">✓ {downloadTime?.toFixed(1)}s</span>
                                                        </div>
                                                        <Progress value={100} className="w-full bg-green-100" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium">AI Processing...</span>
                                                            <span className="text-sm text-gray-500">{uploadProgress}%</span>
                                                        </div>
                                                        <Progress value={uploadProgress} className="w-full" />
                                                        <div className="flex items-center justify-center text-sm text-gray-500">
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            AI is analyzing your content...
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {uploadStatus === "error" && (
                                                <div className="w-full space-y-3">
                                                    <div className="text-red-500 text-center text-sm">An error occurred. Please try again.</div>
                                                    <Button
                                                        onClick={resetErrorState}
                                                        variant="outline"
                                                        className="w-full"
                                                    >
                                                        Try Again
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Video preview area - takes 2/5 of the space on medium screens and above */}
                                <div className="md:col-span-2 flex flex-col items-center justify-center">
                                    {previewUrl ? (
                                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                                            {(() => {
                                                // Extract YouTube video ID for embed
                                                const youtubeMatch = previewUrl.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
                                                const isYouTube = youtubeMatch && youtubeMatch[1];

                                                if (isYouTube) {
                                                    return (
                                                        <div className="w-full mx-auto rounded-lg overflow-hidden shadow-lg">
                                                            <iframe
                                                                width="100%"
                                                                height="200"
                                                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                                                title="YouTube video player"
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                className="rounded-lg"
                                                            />
                                                            <p className="text-sm text-gray-500 mt-2 text-center">Video Preview</p>
                                                        </div>
                                                    );
                                                } else {
                                                    // For TikTok or non-embeddable content
                                                    return (
                                                        <div className="w-full mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg p-4 text-center">
                                                            <ExternalLink className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                            <p className="text-sm font-medium text-gray-600">Valid Video Link</p>
                                                            <p className="text-xs text-gray-500 mt-1 break-all">{previewUrl}</p>
                                                            <p className="text-xs text-gray-400 mt-2">Click &rdquo;Analyze Video&rdquo; to process</p>
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4">
                                            <p className="text-gray-400 text-center">
                                                {url.trim() && !validateUrl(url, false)
                                                    ? "Please enter a valid YouTube or TikTok URL"
                                                    : "Video preview will appear here"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>Supported platforms: YouTube (videos, shorts) and TikTok (Max duration: 5 minutes)</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}