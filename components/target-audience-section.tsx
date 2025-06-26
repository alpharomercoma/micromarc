import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Building2, Code, Heart, Shield, Smartphone, Video } from "lucide-react";

export function TargetAudienceSection() {
  const targetAudiences = [
    {
      icon: Building2,
      title: "Social Media Platforms",
      description: "Enterprise-grade content moderation APIs",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Heart,
      title: "Parents & Families",
      description: "Mobile app for child digital wellness",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Video,
      title: "Content Creators",
      description: "Specialized content analysis & recommendations",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Shield,
      title: "Content Moderators",
      description: "AI-powered content moderation tools",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Brain,
      title: "Digitally Conscious Users",
      description: "Background agents for healthier browsing",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const revenueStreams = [
    {
      icon: Smartphone,
      title: "Consumer Applications",
      description: "Mobile apps for digital wellness",
      color: "bg-blue-500",
    },
    {
      icon: Code,
      title: "Developer APIs",
      description: "Integration services for platforms",
      color: "bg-indigo-500",
    },
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description: "Custom moderation systems",
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="target-audience" className="py-16 bg-gradient-to-br from-white to-gray-50/50 relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
            Market Opportunity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Target Audience & Business Model</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Addressing multiple market segments with AI-powered content moderation solutions.
          </p>
        </div>

        {/* Compact target audiences */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {targetAudiences.map((audience, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <div className={`h-1 bg-gradient-to-r ${audience.color}`} />
              <CardContent className="p-4 text-center">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${audience.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <audience.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{audience.title}</h3>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compact revenue streams and market metrics */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Revenue streams */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Revenue Streams</h3>
            <div className="space-y-3">
              {revenueStreams.map((stream, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg ${stream.color} flex items-center justify-center`}>
                    <stream.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{stream.title}</div>
                    <div className="text-xs text-gray-600">{stream.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business model overview */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Business Model</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">SaaS + API</div>
                <div className="text-sm text-gray-600">Hybrid Revenue Model</div>
              </div>
              <div className="grid grid-cols-1 gap-3 text-center">
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="text-sm font-semibold text-gray-900">Subscription Services</div>
                  <div className="text-xs text-gray-600">Consumer and enterprise tiers</div>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="text-sm font-semibold text-gray-900">Usage-Based Pricing</div>
                  <div className="text-xs text-gray-600">API calls and processing volume</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
