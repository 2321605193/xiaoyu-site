import { Github, Twitter, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: Twitter,
    href: "https://x.com",
    label: "X / Twitter",
  },
  {
    icon: Mail,
    href: "mailto:hello@xiaoyu.dev",
    label: "邮箱",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sea-border/50 bg-sea-deep">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-lg">🏝️</span>
          <span>© {currentYear} 小屿. All rights reserved.</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-text-secondary transition-all duration-200 hover:bg-sea-card hover:text-brand-cyan hover:shadow-glow-sm"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
