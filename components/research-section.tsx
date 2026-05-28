import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, FileText, Github, Sparkles } from "lucide-react";
import Link from "next/link";

const PAPER_PDF = "/visual-qwen-paper.pdf";
const GITHUB_URL = "https://github.com/alpharomercoma/vqwen-qformer";
const KAGGLE_DATASET = "https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500";
const HF_MODEL = "https://huggingface.co/alpharomercoma/vqwen-qformer-tiktok-v2";

const stats = [
  { value: "96.67%", label: "Video-level test accuracy", sublabel: "300-video held-out split" },
  { value: "97.19%", label: "F1-score", sublabel: "precision 95.58% / recall 98.86%" },
  { value: "+0.77 pp", label: "Lift from frozen projector", sublabel: "regularization finding" },
  { value: "~6,000", label: "Multimodal samples", sublabel: "open on Kaggle" },
];

const contributions = [
  {
    title: "Cross-modal Q-Former",
    body: "A 32-token attention bottleneck distills heterogeneous vision and audio signals into a single embedding the LLM can fuse.",
    href: "/thesis#model",
    cta: "See the architecture",
  },
  {
    title: "Frozen-projector ablation",
    body: "Freezing the stage-1 Linear projector during LoRA fine-tuning beat training it by 0.77 pp. Less aligned drift, better generalization.",
    href: "/thesis#model",
    cta: "Read the ablation",
  },
  {
    title: "Open 2K TikTok-sludge dataset",
    body: "Two thousand short-form clips, human-validated, paired with Whisper-V3-Turbo transcripts. Released on Kaggle under an open license.",
    href: KAGGLE_DATASET,
    cta: "Open on Kaggle",
    external: true,
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-700 border-blue-200">
            Research
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What the paper shows
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three headline contributions, every number traceable to the public test split.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                {s.value}
              </div>
              <div className="text-sm font-medium text-gray-900 leading-tight">{s.label}</div>
              <div className="text-xs text-gray-500 mt-1">{s.sublabel}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {contributions.map((c) => {
            const Wrapper = ({ children }: { children: React.ReactNode }) =>
              c.external ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {children}
                </a>
              ) : (
                <Link href={c.href} className="block h-full">
                  {children}
                </Link>
              );

            return (
              <Wrapper key={c.title}>
                <div className="group h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">{c.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{c.body}</p>
                  <span className="inline-flex items-center gap-1 text-blue-600 group-hover:text-blue-700 text-sm font-medium">
                    {c.cta}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Visual-Qwen: Augmenting Multimodal Deep Learning with Attention Mechanisms
              </h3>
              <p className="text-sm text-gray-600">
                FEU Institute of Technology, 2025. Open paper, open code, open dataset, open weights.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={PAPER_PDF} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Paper
                </Button>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">
                  <Github className="h-3.5 w-3.5 mr-1.5" />
                  Code
                </Button>
              </a>
              <a href={KAGGLE_DATASET} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">
                  <Database className="h-3.5 w-3.5 mr-1.5" />
                  Dataset
                </Button>
              </a>
              <a href={HF_MODEL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Model
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
