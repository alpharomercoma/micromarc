"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AboutSection() {
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [sludgeOpen, setSludgeOpen] = useState(false);

  return (
    <section id="about" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-700 border-blue-200">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A frozen-projector tri-modal classifier
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Visual-Qwen reads each clip across three signals at once: an EVA-CLIP frame embedding, a Q-Former cross-modal attention bottleneck, and a Whisper transcript of the audio. Qwen3-4B fuses the streams and emits a sludge / not-sludge verdict.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <button
              type="button"
              onClick={() => setDiagramOpen(true)}
              className="group relative w-full block rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enlarge architecture diagram"
            >
              <img
                src="/images/theoretical_framework.png"
                alt="Visual-Qwen architecture: EVA-CLIP-G/14 vision encoder feeding a Q-Former, projected into Qwen3-4B alongside Whisper transcripts"
                className="w-full h-auto block"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-gray-700" />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-xs text-white">
                Click to enlarge the full architecture diagram
              </div>
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is sludge?</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Multi-feed short-form clips that stack unrelated content (gameplay over reaction video over text crawl) to defeat algorithmic moderation built for single coherent scenes.
              </p>
              <button
                type="button"
                onClick={() => setSludgeOpen(true)}
                className="group relative block rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                aria-label="Enlarge sludge example"
              >
                <img
                  src="/images/skibidi.png"
                  alt="Example of a sludge video: multiple unrelated streams stacked together"
                  className="w-full h-auto block"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-3 w-3 text-gray-700" />
                </div>
              </button>
            </div>

            <div className="pt-2">
              <Link
                href="/thesis"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                Full architecture breakdown on /thesis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {diagramOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDiagramOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Architecture diagram, enlarged"
        >
          <div className="relative w-full max-w-7xl max-h-[95vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setDiagramOpen(false)}
              className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none shadow"
              aria-label="Close enlarged diagram"
            >
              &times;
            </button>
            <img
              src="/images/theoretical_framework.png"
              alt="Visual-Qwen architecture, full resolution"
              className="w-full h-auto rounded-lg bg-white shadow-2xl"
            />
          </div>
        </div>
      )}

      {sludgeOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSludgeOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sludge example, enlarged"
        >
          <div className="relative max-w-4xl max-h-[95vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSludgeOpen(false)}
              className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none shadow"
              aria-label="Close enlarged sludge example"
            >
              &times;
            </button>
            <img
              src="/images/skibidi.png"
              alt="Sludge video example, full resolution"
              className="max-w-full max-h-[95vh] rounded-lg bg-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
