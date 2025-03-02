import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

export default defineConfig(() => {
  // add host_permissions to allow vite to connect to the dev server
  // let hostPermissions = {};
  // if (mode === 'development') {
  //   hostPermissions = {
  //     host_permissions: ['http://localhost:5173/*'],
  //   };
  // }

  return {
    plugins: [react(), crx({ manifest: { ...manifest } }), tailwindcss()],
    envDir: '../',
    // This is required for the extension to work in dev mode, vite adds token checking to
    // websocket connections by default, which crx does not support.
    legacy: {
      skipWebSocketTokenCheck: true,
    },
    build: {
      outDir: 'build',
    },
    resolve: {
      alias: {
        '@ui': path.resolve(__dirname, '../ui'), // @ is only configured for UI as of now, we'll update this in the future if needed somewhere else too
      },
    },
  };
});
