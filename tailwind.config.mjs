/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sea-dark': '#0a0e17',
        'sea-card': '#111827',
        'sea-cyan': '#22d3ee',
        'sea-gold': '#d4a853',
        'sea-text': '#e5e7eb',
        'sea-muted': '#9ca3af',
        'sea-green': '#22c55e',
        'sea-yellow': '#eab308',
        'sea-gray': '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'PingFang SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
