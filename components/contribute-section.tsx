"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Eye, GitFork, Github, MessageSquare, Star, TestTube, Users } from "lucide-react";

export function ContributeSection() {
  const contributionWays = [
    {
      icon: Github,
      title: "Open Source Development",
      description: "Contribute to our GitHub repositories",
      action: "View on GitHub",
      stats: "156 contributors",
      color: "from-gray-700 to-gray-900",
      link: "#",
    },
    {
      icon: TestTube,
      title: "Beta Testing Program",
      description: "Test our latest models and provide feedback",
      action: "Join Beta",
      stats: "234 testers",
      color: "from-blue-500 to-indigo-500",
      link: "#",
    },
    {
      icon: MessageSquare,
      title: "Research Collaboration",
      description: "Academic partnerships and joint research",
      action: "Contact Us",
      stats: "12 institutions",
      color: "from-purple-500 to-violet-500",
      link: "#",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Join discussions and share insights",
      action: "Join Community",
      stats: "2.8K members",
      color: "from-emerald-500 to-teal-500",
      link: "#",
    },
  ];

  const githubStats = [
    { icon: Star, label: "Stars", value: "1.2K" },
    { icon: GitFork, label: "Forks", value: "234" },
    { icon: Eye, label: "Watchers", value: "89" },
    { icon: Users, label: "Contributors", value: "156" },
  ];

  return (
    <section id="contribute" className="py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header - more compact */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-blue-700 border-blue-200">
            Open Source & Community
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Contribute to the Research</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our mission through open collaboration and community-driven innovation.
          </p>
        </div>

        {/* Main contribution ways - more compact */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {contributionWays.map((way, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <div className={`h-1 bg-gradient-to-r ${way.color}`} />
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${way.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <way.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900">{way.title}</h3>
                      <span className="text-xs text-blue-600 font-medium">{way.stats}</span>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm">{way.description}</p>
                    <Button className={`bg-gradient-to-r ${way.color} hover:opacity-90 text-white`} size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {way.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GitHub stats and community highlights - more compact */}


        {/* Community impact */}


      </div>
    </section>
  );
}
