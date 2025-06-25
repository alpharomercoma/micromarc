"use client";
import Image from "next/image";
import { FaBookOpen } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { IoIosHappy } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
export default function Home() {
  function handleUnavailable() {
    alert("The Paper, Code, Video, and Model are being finalized. Please check back from mid-July of 2025 onwards.");
  }
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl text-balance md:text-5xl font-bold text-center mb-8 text-gray-900 leading-tight">
          Visual-Qwen & Sludge-Qwen:
        </h1>

        <h2 className="text-2xl md:text-3xl text-center mb-8 text-gray-700 leading-relaxed">
          Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize &rdquo;Sludge Content&rdquo; from Short Form Videos
        </h2>

        {/* Authors */}
        <div className="text-center mb-6">
          <p className="text-2xl text-blue-600 mb-2">
            <span className="font-medium">Alpha Romer Coma, Marc Olata, Job Isaac Ong, Kristoffer Ian Sioson</span>
          </p>
          <p className="text-xl text-gray-500 mb-4">
            FEU Institute of Technology
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {/* center the text in the button */}
          {/* alert popup that the paper is not yet available on click */}
          <a href="#" onClick={handleUnavailable} className="bg-blue-600 flex items-center justify-center hover:bg-blue-700 text-white px-6 py-2 rounded-4xl font-medium transition-colors">
            <FaBookOpen className="inline-block mr-2" />
            Paper
          </a>
          <a href="#" onClick={handleUnavailable} className="bg-gray-800 flex items-center justify-center hover:bg-gray-900 text-white px-6 py-2 rounded-4xl font-medium transition-colors">
            <FaGithub className="inline-block mr-2" />
            Code
          </a>
          <a href="#" onClick={handleUnavailable} className="bg-red-600 flex items-center justify-center hover:bg-red-700 text-white px-6 py-2 rounded-4xl font-medium transition-colors">
            <FaYoutube className="inline-block mr-2" />
            Video
          </a>
          <a href="https://www.kaggle.com/datasets/jobisaacong/tiktok-sludge-dataset-500" target="_blank" rel="noopener noreferrer" className="bg-yellow-600 flex items-center justify-center hover:bg-yellow-700 text-white px-6 py-2 rounded-4xl font-medium transition-colors">
            <FaDatabase className="inline-block mr-2" />
            Dataset
          </a>
          <a href="#" onClick={handleUnavailable} className="bg-green-600 flex items-center justify-center hover:bg-green-700 text-white px-6 py-2 rounded-4xl font-medium transition-colors">
            <IoIosHappy className="inline-block mr-2" />
            Model
          </a>
        </div>

        {/* Abstract Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Abstract</h3>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-md">
              The proliferation of &rdquo;sludge&rdquo; content in short-form videos featuring multiple, unrelated clips playing simultaneously presents a significant challenge to conventional content moderation systems on platforms like TikTok and YouTube Shorts. This format is engineered to manipulate recommendation algorithms and circumvent moderation by creating deliberate audiovisual mismatches, a tactic that unimodal analysis tools fail to reliably detect. This research addresses this gap by developing and evaluating Visual-Qwen, a novel multimodal deep learning architecture augmented with attention mechanisms for the automated recognition of sludge videos.
            </p>
            <p className="mb-4">
              The proposed model integrates a frozen CLIP ViT-L/14 vision encoder and a Whisper V3 Turbo audio transcription module to extract visual and textual features, respectively. A lightweight Query-Former (Q-Former) acts as a cross-modal attention fusion mechanism, distilling these heterogeneous inputs into a compact set of learned embeddings. These fused features are then projected into a frozen Qwen3-4B large language model, which generates a final classification and a human-readable explanation. To ensure robust and generalizable performance, the model was trained on a custom-built dataset of 2,000 sludge and non-sludge videos, which was ethically sourced, annotated via a human-in-the-loop pipeline, and validated by industry experts against ISO/IEC 25012 data quality standards.
            </p>
            <p className="mb-4">
              Evaluated on a held-out test set, the Visual-Qwen model achieved 93.50% accuracy, 91.09% precision, 95.83% recall, and a 93.40% F1-score. Furthermore, evaluations conducted with content creators, content moderators, and machine learning experts confirmed the system&quot;s high utility and trustworthiness, scoring favorably on assessments based on the Technology Acceptance Model (TAM) and ISO/IEC TR 24028 guidelines. This study demonstrates that an attention-augmented multimodal approach can effectively identify complex and evasive content formats, offering a significant contribution to developing more sophisticated and resilient automated content moderation systems.
            </p>
          </div>
        </section>

        {/* Video Presentation Section */}
        {/* <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Video Presentation</h3>
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <div className="aspect-video bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-600 text-lg">Video Content Placeholder</span>
            </div>
            <p className="text-gray-600">Video presentation would be embedded here</p>
          </div>
        </section> */}

        {/* Model Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Model</h3>
          <p className="text-lg text-gray-800 mb-4">
            Visual-Qwen consists of a frozen CLIP ViT-L/14 vision encoder and a Whisper V3 Turbo audio transcription module, a lightweight Query-Former (Q-Former), and a frozen Qwen3-4B large language model.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
            <Image src="/images/theoretical_framework.png" alt="Visual-Qwen Architecture" width={1000} height={1000} />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Dataset</h3>
          <p className="text-lg text-gray-800 mb-4">
            The dataset consist of 2000*3 (or 6000) rows of paired multimodal data (video, audio, and text) and is ethically sourced, abiding by the YouTube Researcher Program.
            It was annotated via a human-in-the-loop pipeline, and validated by Data Scientists against ISO/IEC 25012 data quality standards.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
            <Image src="/images/dataset.png" alt="Visual-Qwen Architecture" width={1000} height={1000} />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Training</h3>
          <p className="text-lg text-gray-800 mb-4">
            The model was trained on Google Cloud&quot;s TPU v4-64 pods granted by the TPU Research Cloud with MiniGPT&quot;s 5M row dataset and our 2k row fine-tuning dataset, ingested via Cloud Storage FUSE.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
            <Image src="/images/training.png" alt="Visual-Qwen Architecture" width={1000} height={1000} />
          </div>
        </section>

        {/* BibTeX Section */}
        {/* <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">BibTeX</h3>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              {`@article{coma2025visualqwen,
  title={Visual-Qwen & Sludge-Qwen: Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize "Sludge Content" from Short Form Videos},
  author={Coma, A.R., Olata, M., Sioson, K.I. and Ong, J.I.},
  journal={},
  year={2025}
}`}
            </pre>
          </div>
        </section> */}

        {/* Acknowledgement Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Acknowledgement</h3>
          <p className="text-gray-600">
            This website is adapted from
            <a href="https://github.com/Vision-CAIR/MiniGPT-4" target="_blank" rel="noopener noreferrer"> MiniGPT-4</a>
            , licensed under a BSD-3-Clause License.
          </p>
        </section>
      </div>
    </main>
  );
}
