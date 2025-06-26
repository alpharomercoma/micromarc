"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function SponsorsSection() {
  const sponsors = [
    {
      name: "YouTube Researcher Program",
      logo: "/images/logo/youtube.png",
      description: "Ethical Data Collection",
    },
    {
      name: "TPU Research Cloud",
      logo: "/images/logo/trc.png",
      description: "AI Infrastructure",
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <section id="sponsors" className="py-16 bg-white relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
            Our Supporters
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sponsors & Partners</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Grateful for the support of organizations sharing our vision of healthier digital environments.
          </p>
        </div>

        {/* Responsive sponsors grid with flexible logo sizes */}
        <div className="grid lg:grid-cols-3 gap-8 items-center mb-8">
          {sponsors.map((sponsor, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-4 min-h-[60px]">
                  <img
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: "50px", maxWidth: "140px" }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-gray-900">{sponsor.name}</h3>
                </div>
                <p className="text-gray-600 text-xs">{sponsor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership opportunities */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 shadow-sm text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">🤝 Become a Partner</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
            Support cutting-edge AI research and help combat internet brain rot through strategic partnerships.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">💼 Corporate</div>
              <div className="text-xs text-gray-600">Infrastructure & funding</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">🔬 Research</div>
              <div className="text-xs text-gray-600">Joint opportunities</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-sm font-semibold text-gray-900">🌟 Mission</div>
              <div className="text-xs text-gray-600">Aligned partnerships</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
