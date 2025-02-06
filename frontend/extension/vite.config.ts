import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

// add host_permissions to allow vite to connect to the dev server
let updatedManifest: any = manifest;
if (process.env.NODE_ENV === 'development') {
  updatedManifest = {
    ...manifest,
    host_permissions: ['http://localhost:5173/*'],
  };
}

export default defineConfig({
  plugins: [react(), crx({ manifest: updatedManifest })],
  envDir: '../',
  // This is required for the extension to work in dev mode, vite adds token checking to
  // websocket connections by default, which crx does not support.
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
