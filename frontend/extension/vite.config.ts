import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), crx({ manifest }), tailwindcss()],
    envDir: '../',
    // This is required for the extension to work in dev mode, vite adds token checking to
    // websocket connections by default, which crx does not support.
    legacy: {
      skipWebSocketTokenCheck: true,
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[hash].js',
          chunkFileNames: 'assets/[hash].js',
          assetFileNames: 'assets/[hash].[ext]',
        },
      },
      outDir: mode === 'production' ? 'build' : 'dist', // 'build' for production, 'dist' for dev
    },
  };
});
