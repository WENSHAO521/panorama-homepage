/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#d8dadc",
        "on-surface-variant": "#4b5563",
        "surface-container": "#f3f4f6",
        "on-background": "#000000",
        "outline": "#000000",
        "on-error-container": "#93000a",
        "inverse-surface": "#000000",
        "on-primary-fixed": "#000000",
        "on-primary": "#ffffff",
        "on-secondary-fixed": "#111827",
        "on-surface": "#000000",
        "error-container": "#ffdad6",
        "outline-variant": "#e5e7eb",
        "on-primary-container": "#374151",
        "tertiary-fixed": "#f9fafb",
        "on-primary-fixed-variant": "#111827",
        "primary": "#000000",
        "background": "#ffffff",
        "surface-container-high": "#e5e7eb",
        "surface-tint": "#000000",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#f9fafb",
        "inverse-on-surface": "#ffffff",
        "on-secondary-container": "#4b5563",
        "secondary-container": "#f3f4f6"
      },
      fontFamily: {
        "headline": ["Inter", "'Noto Sans KR'", "sans-serif"],
        "body": ["Noto Serif", "'Noto Serif KR'", "serif"],
        "label": ["Inter", "'Noto Sans KR'", "sans-serif"]
      }
    }
  }
}
