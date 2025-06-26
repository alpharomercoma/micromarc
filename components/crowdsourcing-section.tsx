"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Database, MessageSquare, Star, Upload } from "lucide-react";
import { useState } from "react";

export function CrowdsourcingSection() {
  const [activeTab, setActiveTab] = useState("contribute")

  const contributionTypes = [
    {
      icon: Database,
      title: "Data Contribution",
      description: "Help expand our training datasets",
      count: "2.3K contributors",
    },
    {
      icon: Code,
      title: "Code Contribution",
      description: "Contribute to open-source models",
      count: "156 contributors",
    },
    {
      icon: MessageSquare,
      title: "Research Feedback",
      description: "Provide methodology feedback",
      count: "89 reviewers",
    },
    {
      icon: Star,
      title: "Model Evaluation",
      description: "Help test model performance",
      count: "234 evaluators",
    },
  ]

  return (
    <section id="crowdsourcing" className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Enhanced gradient blobs */}
      <div className="absolute top-20 left-20 w-56 h-56 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-700 border-blue-200">
            Community Driven
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contribute to the Research</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our global community of researchers and developers. Your contributions help advance the fight against
            internet brain rot.
          </p>
        </div>

        {/* Main content grid - compact layout */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Contribution types - compact */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {contributionTypes.map((type, index) => (
                <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <type.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{type.title}</h4>
                        <p className="text-xs text-gray-500">{type.count}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick stats - compact */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3 text-center">Community Impact</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">2.8K+</div>
                  <div className="text-xs text-gray-600">Contributors</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-indigo-600">150K+</div>
                  <div className="text-xs text-gray-600">Data Points</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">95%</div>
                  <div className="text-xs text-gray-600">Quality Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution form - compact */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gray-900">Quick Contribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={activeTab === "contribute" ? "default" : "outline"}
                    onClick={() => setActiveTab("contribute")}
                    className="flex-1 text-xs h-7"
                  >
                    Contribute
                  </Button>
                  <Button
                    size="sm"
                    variant={activeTab === "feedback" ? "default" : "outline"}
                    onClick={() => setActiveTab("feedback")}
                    className="flex-1 text-xs h-7"
                  >
                    Feedback
                  </Button>
                </div>

                {activeTab === "contribute" ? (
                  <div className="space-y-3">
                    <Input placeholder="Your name" className="text-xs h-8" />
                    <Input placeholder="Email" type="email" className="text-xs h-8" />
                    <select className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs h-8">
                      <option>Select type</option>
                      <option>Dataset</option>
                      <option>Code</option>
                      <option>Research</option>
                      <option>Evaluation</option>
                    </select>
                    <Textarea placeholder="Describe..." rows={2} className="text-xs" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs h-8">
                      <Upload className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Input placeholder="Name (optional)" className="text-xs h-8" />
                    <Input placeholder="Email (optional)" type="email" className="text-xs h-8" />
                    <Textarea placeholder="Your feedback..." rows={2} className="text-xs" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs h-8">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Send
                    </Button>
                  </div>
                )}

                <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 font-medium text-xs mb-1">Join Community</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 text-xs h-6"
                  >
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
