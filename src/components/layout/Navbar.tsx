"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/team", label: "团队" },
  { href: "/daily", label: "日报" },
  { href: "/logs", label: "工作日志" },
  { href: "/stats", label: "统计" },
  { href: "/thoughts", label: "碎碎念" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-sea-border/50 bg-sea-deep/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold transition-colors duration-200 hover:text-brand-cyan"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-brand-cyan"
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
          <span>小屿</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-brand-cyan"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-brand-cyan"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded-lg p-2 text-text-secondary transition-colors duration-200 hover:bg-sea-card hover:text-text-primary md:hidden"
          aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-b border-sea-border/50 bg-sea-deep/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block cursor-pointer rounded-lg px-4 py-3 text-sm transition-colors duration-200 ${
                      isActive(link.href)
                        ? "bg-brand-cyan/10 text-brand-cyan"
                        : "text-text-secondary hover:bg-sea-card hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
