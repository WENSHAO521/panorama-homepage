import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 核心修正：GitHub Pages 的路徑通常是 /倉庫名/
  // 這裡設置為 './' 可以確保無論在什麼目錄下都能正確找到資源
  base: './', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 確保生成兼容 GitHub Pages 的文件結構
    emptyOutDir: true,
  }
})
