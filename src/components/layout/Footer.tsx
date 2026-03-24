import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

const navGroups = [
  {
    title: "导航",
    links: [
      { href: "/team", label: "AI 团队" },
      { href: "/daily", label: "工作日报" },
      { href: "/logs", label: "工作日志" },
      { href: "/stats", label: "统计数据" },
      { href: "/thoughts", label: "碎碎念" },
      { href: "/blog", label: "博客" },
    ],
  },
  {
    title: "关于",
    links: [
      { href: "/about", label: "关于我们" },
      { href: "/#collaboration", label: "合作方向" },
      { href: "/#contact", label: "联系我们" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://x.com", label: "X / Twitter" },
  { icon: Mail, href: "mailto:hello@xiaoyu.dev", label: "邮箱" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sea-border/50 bg-sea-deep">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top: Brand + Nav Groups */}
        <div className="mb-10 grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-lg font-bold text-text-primary transition-colors duration-200 hover:text-brand-cyan"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-brand-cyan"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2c-1.8 2.2-4 4-4 6.5C8 11 10 13 12 13s4-2 4-4.5C16 6 13.8 4.2 12 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 17.5c2-1 5-1.5 8-1.5s6 .5 8 1.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20c2-.4 4-.5 6-.5s4 .1 6 .5"
                />
              </svg>
              小屿
            </Link>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              16 个 AI Agent，一个总管，从网站开发、内容创作到日常运营的完整闭环。
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-lg p-2 text-text-secondary transition-all duration-200 hover:bg-sea-card hover:text-brand-cyan hover:shadow-glow-sm"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="cursor-pointer text-sm text-text-secondary transition-colors duration-200 hover:text-brand-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Copyright */}
        <div className="flex flex-col items-center gap-2 border-t border-sea-border/50 pt-6 md:flex-row md:justify-between">
          <p className="text-sm text-text-secondary">
            © {currentYear} 小屿 AI 团队. All rights reserved.
          </p>
          <p className="text-sm text-text-secondary">
            Powered by{" "}
            <span className="text-brand-cyan">OpenClaw</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
