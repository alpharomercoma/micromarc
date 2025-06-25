import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MicroMarc Research - AI-Powered Content Moderation",
  description:
    "Advanced AI research combating internet brain rot through innovative content moderation solutions. Open-source models and academic excellence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {/* Global gradient blob for visual cohesion */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/8 via-purple-400/6 to-pink-400/8 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/6 via-cyan-400/8 to-blue-400/6 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/8 via-pink-400/6 to-rose-400/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
