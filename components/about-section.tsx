import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Shield, Target, Users, Zap } from "lucide-react";

export function AboutSection() {
  const features = [
    { icon: Brain, title: "Transfer Learning", description: "Augmented tools built on top of industry-leading models" },
    { icon: Shield, title: "Content Protection", description: "Moderation of harmful, explicit, and uneducational content" },
    {
      icon: Zap, title: "Edge Computing", description: "Real-time, low-latency inference anywhere, anytime"
    },
    { icon: Target, title: "Precision Filtering", description: "High accuracy, customizable, and critical content analysis" },
  ];

  return (
    <section id="about" className="py-16 bg-white relative overflow-hidden">
      {/* Enhanced gradient blobs - more visible */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-700 border-blue-200">
            Our Mission
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Advancing Digital Wellness Through AI Research
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded by computer science students at FEU Institute of Technology, we&apos;re developing cutting-edge solutions
            to combat the degradation of online discourse and critical thinking.
          </p>
        </div>

        {/* Main content grid - improved layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-center mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Research-Driven Approach</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Our interdisciplinary research combines deep learning and behavioral
                psychology to understand and address the root causes of neurodegenerative online content.
              </p>
              <p>
                Through rigorous academic methodology and open-source development, we&apos;re building transparent,
                accountable AI systems that can be audited and improved by the global research community.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Peer-Reviewed Research</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">Open Collaboration</span>
              </div>
            </div>
          </div>

          {/* Landscape image - responsive and properly sized */}
          <div className="lg:col-span-1">
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center justify-center">
              <img
                src="/images/theoretical_framework.png"
                alt="AI Research Visualization"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Features grid - compact single row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
