"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Cpu, Database, Globe, Rocket, Smartphone, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";
import { IoIosStats } from "react-icons/io";

export function TimelineSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const milestones = [
    {
      date: "Dec 2024",
      title: "Startup Founded",
      description: "MicroMarc Research officially established",
      status: "completed",
      icon: Rocket,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "Jan 2025",
      title: "Research Inception",
      description: "Initial research and development of the MicroMarc AI system",
      status: "completed",
      icon: Rocket,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "Feb 2025",
      title: "Initial Dataset & Grant",
      description: "Ethically scraped 2K dataset + TPU Research Cloud grant secured",
      status: "completed",
      icon: Database,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "Mar 2025",
      title: "Novel Architecture",
      description: "Developed breakthrough multimodal AI architecture",
      status: "completed",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "Apr 2025",
      title: "Model Training",
      description: "Trained initial multimodal content moderation model",
      status: "completed",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "May 2025",
      title: "Expert Validation",
      description: "Verified with 12 AI/Data experts & 40+ content creators/moderators",
      status: "completed",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
    {
      date: "Jun 2025",
      title: "Defence & Growth",
      description: "Defend academic research and secure grant for growth",
      status: "current",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      date: "Jul 2025",
      title: "Scaling & Publicity",
      description: "Crowdsourcing and publicizing research + scaling development",
      status: "upcoming",
      icon: IoIosStats,
      color: "from-gray-400 to-gray-500",
    },
    {
      date: "Aug 2025",
      title: "Edge Optimization & Integration",
      description: "Optimize model for mobile and edge device inference + integration with target platforms",
      status: "upcoming",
      icon: Smartphone,
      color: "from-gray-400 to-gray-500",
    },
    {
      date: "Sep 2025",
      title: "Beta Testing",
      description: "Launch beta program with select social media platforms & users",
      status: "upcoming",
      icon: Globe,
      color: "from-gray-400 to-gray-500",
    },
    {
      date: "Oct 2025",
      title: "Mobile App Development",
      description: "Complete mobile application for parents and content creators",
      status: "upcoming",
      icon: Smartphone,
      color: "from-gray-400 to-gray-500",
    },
    {
      date: "Nov 2025",
      title: "API & Developer Tools",
      description: "Launch comprehensive API suite and developer documentation",
      status: "upcoming",
      icon: Cpu,
      color: "from-gray-400 to-gray-500",
    },
    {
      date: "Dec 2025",
      title: "Commercial Launch",
      description: "Full commercial launch and Series A funding preparation",
      status: "upcoming",
      icon: TrendingUp,
      color: "from-gray-400 to-gray-500",
    },
  ];

  const visibleMilestones = isExpanded ? milestones : milestones.slice(0, 6);

  return (
    <section id="timeline" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200 bg-white/80">
            Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Development Timeline</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From research inception to commercial launch - tracking our milestones and future roadmap.
          </p>
        </div>

        {/* Timeline - improved UI */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {visibleMilestones.map((milestone, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${milestone.status === "current" ? "ring-2 ring-blue-500 ring-opacity-50 shadow-blue-100" : ""
                  }`}
              >
                <div className={`h-1 bg-gradient-to-r ${milestone.color}`} />
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <milestone.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-600">{milestone.date}</span>
                        {milestone.status === "current" && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Toggle button */}
          <div className="text-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  View Full Timeline ({milestones.length - 6} more)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
