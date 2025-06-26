import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function ResearchSection() {
  return (
    <section id="research" className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Enhanced gradient blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-700 border-blue-200">
            Research Focus
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advancing AI Content Moderation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our research spans multiple domains with a focus on practical applications, open-source development, and
            academic rigor.
          </p>
        </div>

        {/* Key Publication with preview - better use of space */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Publication preview image */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
                <Image src="/images/thesis_preview.png" alt="Thesis Preview" width={300} height={300} />
              </div>
            </div>

            {/* Publication details */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-100 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        Thesis
                      </Badge>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">Pending Publication</Badge>
                    </div>
                    <span className="text-sm -500">2025</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                    Visual-Qwen & Sludge-Qwen:
                    Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize &rdquo;Sludge Content&rdquo; from Short Form Videos
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">FEU Institute of Technology - Computer Science Thesis</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Key Contributions:</span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Open-source 6k human-model-annotated expert-validated multimodal dataset of short-form videos of sludge & non-sludge content</li>
                      <li>• Multimodal architecture that leverages attention mechanisms and integrates video and textual features</li>
                      <li>• Pre-trained Vision-Language Model (Visual-Qwen) that can be fine tuned on various datasets</li>
                      <li>• Fine tuned model (Sludge-Qwen) for detecting sludge and non-sludge content from short-form videos</li>
                      <li>• Study in tackling a modern global digital problem with High Acceptance from target audience and experts</li>
                      <li>• TPU training methodology at FEU Institute of Technology</li>
                    </ul>
                  </div>

                  {/* <div className="flex items-center gap-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-3 w-3 mr-1" />
                      Read Thesis
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download PDF
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
