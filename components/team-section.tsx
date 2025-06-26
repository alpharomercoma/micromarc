import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Justine Jude Pura",
      role: "Advisor",
      image: "/images/team/pura.jpg",
    },
    {
      name: "Marc Olata",
      role: "Founder & CEO",
      image: "/images/team/olata.png",
    },
    {
      name: "Alpha Romer Coma",
      role: "Founding Engineer",
      image: "/images/team/coma.jpg",
    },
    {
      name: "Job Isaac Ong",
      role: "Founding Data Scientist",
      image: "/images/team/ong.jpg",
    },
    {
      name: "Kristoffer Ian Sioson",
      role: "Founding Data Scientist",
      image: "/images/team/sioson.png",
    },
  ];

  return (
    <section id="team" className="py-16 bg-white relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Researchers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Four dedicated CS students and their extraordinary advisor from FEU Institute of Technology, combining
            academic excellence with entrepreneurial vision.
          </p>
        </div>

        {/* Compact team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-4 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-100 mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium text-xs mb-2">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Institution highlight */}
        {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 text-center shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">🏛️ FEU Institute of Technology</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Our team combines rigorous academic training with entrepreneurial ambition, supported by world-class faculty
            and cutting-edge research facilities in Manila, Philippines.
          </p>
        </div> */}
      </div>
    </section>
  );
}
