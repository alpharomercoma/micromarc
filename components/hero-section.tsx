"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";
import Link from "next/link";

const KAGGLE_DATASET = "https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-16 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" />

      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-32 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto pt-12 pb-16">
          <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-blue-200 text-blue-700">
            FEU Institute of Technology Undergraduate Thesis
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Detecting{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Internet Brain Rot
            </span>{" "}
            with Multimodal AI
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Visual-Qwen pairs a Q-Former vision encoder with Qwen3-4B and Whisper transcripts to flag &ldquo;sludge&rdquo; short-form videos: the stacked, multi-feed clips engineered to bypass single-modality moderators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/thesis">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <BookOpen className="mr-2 h-4 w-4" />
                Read the Thesis
              </Button>
            </Link>

            <a href={KAGGLE_DATASET} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="px-8 py-3 border-gray-300">
                <Download className="mr-2 h-4 w-4" />
                Get the Dataset
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">96.67%</div>
              <div className="text-sm text-gray-600">Video-level accuracy on 300-video test split</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">97.19%</div>
              <div className="text-sm text-gray-600">F1-score (95.58% precision, 98.86% recall)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">~6,000</div>
              <div className="text-sm text-gray-600">Multimodal samples in the open Kaggle dataset</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">4B</div>
              <div className="text-sm text-gray-600">Parameter Qwen3 backbone, LoRA-tuned</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
