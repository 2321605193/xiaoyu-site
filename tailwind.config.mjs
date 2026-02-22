/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sea-dark': '#0a0e17',
        'sea-deeper': '#060a12',
        'sea-card': '#111827',
        'sea-card-hover': '#1a2332',
        'sea-cyan': '#22d3ee',
        'sea-gold': '#d4a853',
        'sea-text': '#f8fafc',
        'sea-muted': '#94a3b8',
        'sea-green': '#22c55e',
        'sea-yellow': '#eab308',
        'sea-gray': '#64748b',
        'sea-border': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        sans: ['DM Sans', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        heading: ['Space Grotesk', 'PingFang SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
