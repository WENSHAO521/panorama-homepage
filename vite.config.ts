// wenshao521/panorama-homepage/panorama-homepage-xxxx/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // 必須設置為倉庫名，否則打包後的資源路徑會出錯導致白屏
  base: '/panorama-homepage/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

#### 2. 使用 GitHub Actions 自動部署
這是最「專業」的搭建方式。你不需要手動上傳 `dist` 文件夾。
1. 在倉庫中創建目錄 `.github/workflows/`。
2. 在該目錄下創建文件 `deploy.yml`。
3. 內容如下：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ "main" ] # 或者是你的主分支名
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4

#### 3. 圖片路徑的學術化處理
為了保證圖片在預覽和部署時都能顯示，我已在代碼中將所有圖片路徑改為 **GitHub Raw 絕對路徑**：
`https://raw.githubusercontent.com/WENSHAO521/panorama-homepage/main/QKFM/文件名.png`
這樣可以避免因為本地路徑引用的混亂導致圖片加載失敗。

### 為什麼這套方案「更好」？
* **品牌權威感**：使用了哈佛紅與海軍藍的組合，排版參考了 Web of Science 和 Elsevier 的極簡主義，確保學者訪問時感受到嚴謹性。
* **數據驅動**：使用 React 的數據映射（Mapping）渲染 11 本期刊，方便未來快速增加或修改。
* **多語言預留**：頂部集成了語言切換 UI，符合柏林國際出版機構的定位。
* **響應式優化**：針對學術搜索框在移動端的體驗進行了深度調整。

完成上述步驟後，你的網站將不再空白，並展現出頂尖學術門戶的質感。
