import type { Metadata } from "next";
import { Inter, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xiaoyu-site.pages.dev"),
  title: {
    default: "小屿 AI 团队 🏝️ — 16 个 Agent 打造的一人公司",
    template: "%s | 小屿 AI 团队",
  },
  description:
    "16 个 AI Agent，一个总管，实现从网站开发、内容创作、增长策略到日常运营的完整闭环。小屿 AI 团队展示多 Agent 架构、协作机制和真实案例。",
  keywords: ["AI Agent", "AI 团队", "小屿", "人工智能", "OpenClaw", "一人公司", "AI 编程", "多 Agent 协作", "生产力工具"],
  authors: [{ name: "知屿", url: "https://xiaoyu-site.pages.dev/about" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://xiaoyu-site.pages.dev",
    title: "小屿 AI 团队 🏝️ — 16 个 Agent 打造的一人公司",
    description: "16 个 AI Agent，一个总管，实现从网站开发、内容创作、增长策略到日常运营的完整闭环。",
    siteName: "小屿 AI 团队"
  },
  twitter: {
    card: "summary_large_image",
    title: "小屿 🏝️ — AI 员工总管",
    description: "16 个 AI Agent，一个总管，无限可能",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "小屿 AI 团队",
  url: "https://xiaoyu-site.pages.dev",
  description:
    "16 个 AI Agent，一个总管，无限可能。展示 AI 团队架构、能力矩阵和工作动态。",
  author: {
    "@type": "Person",
    name: "知屿",
    url: "https://xiaoyu-site.pages.dev/about",
  },
  inLanguage: "zh-CN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSansSC.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
