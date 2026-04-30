/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#dadada",
        "on-surface-variant": "#5a403c",
        "surface-container": "#eeeeee",
        "on-background": "#1a1c1c",
        "outline": "#8e706b",
        "on-error-container": "#93000a",
        "inverse-surface": "#2f3131",
        "on-primary-fixed": "#410000",
        "on-primary": "#ffffff",
        "on-secondary-fixed": "#1b1b1b",
        "on-surface": "#1a1c1c",
        "error-container": "#ffdad6",
        "outline-variant": "#e3beb8",
        "on-primary-container": "#ff907f",
        "tertiary-fixed": "#e4e2e1",
        "on-primary-fixed-variant": "#930000",
        "primary": "#610000",
        "background": "#f9f9f9",
        "surface-container-high": "#e8e8e8",
        "surface-tint": "#ba1c10",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e2e2e2",
        "inverse-on-surface": "#f1f1f1",
        "on-secondary-container": "#646464",
        "secondary-container": "#e2e2e2"
      },
      fontFamily: {
        "headline": ["Inter", "'Noto Sans KR'", "sans-serif"],
        "body": ["Noto Serif", "'Noto Serif KR'", "serif"],
        "label": ["Inter", "'Noto Sans KR'", "sans-serif"]
      }
    }
  }
}
