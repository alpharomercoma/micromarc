import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function CollaboratorsSection() {
  const collaborators = [
    {
      name: "FEU Institute of Technology",
      type: "Academic Institution",
      description: "Our home institution providing research support, facilities, and academic guidance.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Founding Partner",
    },
    {
      name: "Philippine Computing Science Congress",
      type: "Research Community",
      description: "Platform for sharing our research findings with the broader CS community in the Philippines.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Research Collaboration",
    },
    {
      name: "Open Source Initiative",
      type: "Technology Community",
      description: "Supporting our commitment to open-source development and community-driven innovation.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Community Partner",
    },
    {
      name: "AI Ethics Research Group",
      type: "Research Consortium",
      description: "Collaborative research on ethical AI development and responsible content moderation.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Research Partner",
    },
    {
      name: "Digital Wellness Foundation",
      type: "Non-Profit Organization",
      description: "Shared mission to promote healthier digital environments and combat information pollution.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Mission Partner",
    },
    {
      name: "Southeast Asian AI Network",
      type: "Regional Network",
      description: "Regional collaboration on AI research and development in Southeast Asia.",
      logo: "/placeholder.svg?height=100&width=200",
      partnership: "Network Member",
    },
  ]

  const getPartnershipColor = (partnership: string) => {
    switch (partnership) {
      case "Founding Partner":
        return "bg-blue-100 text-blue-800"
      case "Research Collaboration":
        return "bg-purple-100 text-purple-800"
      case "Community Partner":
        return "bg-green-100 text-green-800"
      case "Research Partner":
        return "bg-orange-100 text-orange-800"
      case "Mission Partner":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section id="collaborators" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Partners & Collaborators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in the power of collaboration. Working with academic institutions, research communities, and
            mission-aligned organizations to amplify our impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collaborators.map((collaborator, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <img
                      src={collaborator.logo || "/placeholder.svg"}
                      alt={`${collaborator.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <Badge className={getPartnershipColor(collaborator.partnership)}>{collaborator.partnership}</Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{collaborator.name}</h3>

                <p className="text-sm text-blue-600 font-medium mb-3 text-center">{collaborator.type}</p>

                <p className="text-gray-600 text-sm leading-relaxed">{collaborator.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Collaborating?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;re always looking for new partnerships with organizations that share our mission of creating healthier
              digital environments through AI innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Research Collaboration</h4>
              <p className="text-sm text-gray-600">Joint research projects and academic partnerships</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Technology Partnership</h4>
              <p className="text-sm text-gray-600">Integration and platform partnerships</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mission Alignment</h4>
              <p className="text-sm text-gray-600">Organizations focused on digital wellness</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
