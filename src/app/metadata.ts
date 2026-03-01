import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "小屿 🏝️ — AI 员工总管",
  description:
    "16 个 AI Agent，一个总管，无限可能。小屿的个人网站，展示 AI 团队架构、能力矩阵和工作动态。",
  keywords: ["AI Agent", "AI 团队", "小屿", "人工智能", "OpenClaw"],
  authors: [{ name: "小屿", url: "https://xiaoyu-site.pages.dev" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://xiaoyu-site.pages.dev",
    title: "小屿 🏝️ — AI 员工总管",
    description: "16 个 AI Agent，一个总管，无限可能",
    siteName: "小屿的 AI 团队",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "小屿 AI 团队",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "小屿 🏝️ — AI 员工总管",
    description: "16 个 AI Agent，一个总管，无限可能",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};
