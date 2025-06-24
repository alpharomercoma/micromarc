import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Visual-Qwen: Augmenting Multimodal Deep Learning with Attention Mechanisms to Recognize 'Sludge Content' from Short Form Videos",
  description: "Visual-Qwen consists of a frozen CLIP ViT-L/14 vision encoder and a Whisper V3 Turbo audio transcription module, a lightweight Query-Former (Q-Former), and a frozen Qwen3-4B large language model.",
  keywords: "Visual-Qwen, Qwen, multimodal AI, attention mechanism, sludge content, short form videos",
  authors: [{ name: "Alpha Romer Coma" }, { name: "Marc Olata" }, { name: "Job Isaac Ong" }, { name: "Kristoffer Ian Sioson" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
