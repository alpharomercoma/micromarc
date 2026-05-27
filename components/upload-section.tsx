"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

// Live demo lives on Hugging Face Spaces (free CPU). Vercel cannot host
// the 4B-parameter model itself; this iframe embeds the Space directly.
const SPACE_URL = "https://alpharomercoma-vqwen-qformer.hf.space";

export default function UploadSection() {
    const [demoOpen, setDemoOpen] = useState(false);

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
                        Demo with our fine-tuned multimodal model specializing in recognizing sludge videos &mdash; a subtype of internet brain rot that grabs attention by presenting multiple streams of visual clips (e.g.&nbsp;Subway Surfers, Family Guy, soap-cutting).
                    </p>
                </div>
            </div>

            <section id="upload" className="px-4 md:px-8 max-w-3xl mx-auto relative mb-10">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center backdrop-blur-sm bg-opacity-80">
                    <div className="flex flex-col items-center gap-4">
                        <Button
                            onClick={() => setDemoOpen(true)}
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-md"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Open Live Demo
                        </Button>
                        <p className="text-sm text-gray-500 max-w-md">
                            Hosted on Hugging Face Spaces (free CPU). Inference takes ~3&ndash;5&nbsp;minutes per video &mdash; please be patient.
                        </p>
                        <a
                            href={SPACE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
                        >
                            Or open in a new tab <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Live demo modal: dimmed backdrop, iframe to HF Space.
                Mirrors the videoOpen / posterOpen pattern in app/thesis/page.tsx. */}
            {demoOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setDemoOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="VQwen sludge detector live demo"
                >
                    <div
                        className="relative w-full max-w-6xl h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setDemoOpen(false)}
                            className="absolute -top-10 right-0 text-white/90 hover:text-white text-3xl leading-none"
                            aria-label="Close live demo"
                        >
                            &times;
                        </button>
                        <a
                            href={SPACE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute -top-10 left-0 text-white/90 hover:text-white text-sm underline"
                        >
                            Open in new tab &nearr;
                        </a>
                        <iframe
                            src={SPACE_URL}
                            title="VQwen sludge detector demo"
                            className="w-full h-full rounded-lg shadow-2xl bg-white"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        />
                        <noscript>
                            <p className="text-white text-center mt-4">
                                JavaScript is required to embed the live demo.{" "}
                                <a href={SPACE_URL} className="underline">Open it directly.</a>
                            </p>
                        </noscript>
                    </div>
                </div>
            )}
        </>
    );
}
