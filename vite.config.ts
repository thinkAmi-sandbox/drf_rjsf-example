import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 開発環境の main.tsx が置いてある場所
  root: resolve('./frontend/src'),

  // Djangoでの静的ファイル配信設定である STATIC_URL と同じになるよう設定
  base: '/static/',

  // 今回はproductionでは動かさないため、build 関係は設定しない

  server: {
    // https://ja.vitejs.dev/config/server-options.html#server-open
    // ファイルを開きたくないため、false
    open: false,
    // https://ja.vitejs.dev/config/server-options.html#server-watch
    watch: {
      // WSL2上で動かすため、true
      usePolling: true,
    },
    middlewareMode: false
  }
})
