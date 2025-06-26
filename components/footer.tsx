import { Button } from "@/components/ui/button";
import { Database, ExternalLink, FileText, Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Strategic gradient blob */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info with logo */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  MicroMarc
                </span>{" "}
                Research
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Advancing AI-powered content moderation through rigorous academic research. Combating internet brain rot
              with open-source solutions and community collaboration.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 transition-colors duration-200"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Research resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Research</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-2" />
                  Publications
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Database className="h-3 w-3 mr-2" />
                  Datasets
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Github className="h-3 w-3 mr-2" />
                  Open Source
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#team" className="text-gray-300 hover:text-white transition-colors">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#sponsors" className="text-gray-300 hover:text-white transition-colors">
                  Our Partners
                </a>
              </li>
              {/* <li>
                <a href="#contribute" className="text-gray-300 hover:text-white transition-colors">
                  Contribute
                </a>
              </li> */}
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-gray-400 mb-4 md:mb-0">© {currentYear} MicroMarc Research. All rights reserved.</div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <span>🏛️ FEU Institute of Technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
