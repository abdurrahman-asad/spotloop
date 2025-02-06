import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  // add host_permissions to allow vite to connect to the dev server
  let hostPermissions = {};
  if (mode === 'development') {
    hostPermissions = {
      host_permissions: ['http://localhost:5173/*'],
    };
  }

  return {
    plugins: [react(), crx({ manifest: { ...manifest, ...hostPermissions } }), tailwindcss()],
    envDir: '../',
    // This is required for the extension to work in dev mode, vite adds token checking to
    // websocket connections by default, which crx does not support.
    legacy: {
      skipWebSocketTokenCheck: true,
    },
    build: {
      outDir: 'build',
    },
  };
});
