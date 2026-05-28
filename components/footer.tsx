import { Button } from "@/components/ui/button";
import { Database, FileText, Github, Mail } from "lucide-react";

const PAPER_PDF = "/visual-qwen-paper.pdf";
const GITHUB_URL = "https://github.com/alpharomercoma/vqwen-qformer";
const KAGGLE_DATASET = "https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500";
const HF_MODEL = "https://huggingface.co/alpharomercoma/vqwen-qformer-tiktok-v2";
const CONTACT_EMAIL = "alpharomercoma@proton.me";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-base">M</span>
              </div>
              <h3 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  MicroMarc
                </span>{" "}
                Research
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              An undergraduate thesis project at FEU Institute of Technology building open multimodal models for detecting brain-rot &ldquo;sludge&rdquo; videos on short-form platforms.
            </p>
            <div className="flex space-x-2">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Artifacts</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={PAPER_PDF} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-2" />
                  Paper (PDF)
                </a>
              </li>
              <li>
                <a href={KAGGLE_DATASET} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Database className="h-3 w-3 mr-2" />
                  Dataset (Kaggle)
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Github className="h-3 w-3 mr-2" />
                  Source (GitHub)
                </a>
              </li>
              <li>
                <a href={HF_MODEL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-2" />
                  Model (Hugging Face)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Site</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/thesis" className="text-gray-300 hover:text-white transition-colors">
                  Thesis page
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-300 hover:text-white transition-colors">
                  Meet the team
                </a>
              </li>
              <li>
                <a href="#sponsors" className="text-gray-300 hover:text-white transition-colors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} MicroMarc Research. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="https://www.feutech.edu.ph/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                FEU Institute of Technology
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
