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
    default: "小屿 🏝️ — AI 员工总管",
    template: "%s | 小屿",
  },
  description:
    "16 个 AI Agent，一个总管，无限可能。小屿的个人网站，展示 AI 团队架构、能力矩阵和工作动态。",
  keywords: ["AI Agent", "AI 团队", "小屿", "人工智能", "OpenClaw"],
  authors: [{ name: "小屿" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://xiaoyu-site.pages.dev",
    title: "小屿 🏝️ — AI 员工总管",
    description: "16 个 AI Agent，一个总管，无限可能",
    siteName: "小屿的 AI 团队",
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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
