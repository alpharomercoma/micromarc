"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Download } from "lucide-react";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="home" className="relative pt-16 pb-20 overflow-hidden">
      {/* Enhanced gradient background with blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />

      {/* Modern gradient blobs */}
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
          {/* Academic badge */}
          <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-blue-200 text-blue-700">
            FEU Institute of Technology Research Project
          </Badge>

          {/* Main heading - centralized and standardized */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Combating{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Internet Brain Rot
            </span>{" "}
            Through AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Advanced AI-powered content moderation research to foster healthier digital environments. Open-source
            models, comprehensive datasets, and rigorous academic methodology.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/thesis">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Research
              </Button>
            </Link>

            <a href="https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="px-8 py-3 border-gray-300">
                <Download className="mr-2 h-4 w-4" />
                Download Dataset
              </Button>
            </a>
          </div>

          {/* Demo video section - more compact */}
          {/* <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {!isVideoPlaying ? (
                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 mb-4"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch AI Demo
                    </Button>
                    <p className="text-white/80 text-sm">Real-time content moderation in action</p>
                  </div>
                ) : (
                  <div className="text-white text-center">
                    <div className="animate-pulse mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-lg font-medium">AI Content Analysis Demo</p>
                    <p className="text-sm text-white/70 mt-1">Processing and filtering harmful content</p>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Accuracy Rate on Sludge Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">6000+</div>
              <div className="text-sm text-gray-600">Specialized Multimodal Dataset Rows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Domain Expert & Target Audience Validations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">$350K+</div>
              <div className="text-sm text-gray-600">Grant Funding for Research & Development</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
