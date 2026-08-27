import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next/resolvers'

export default defineConfig({
  plugins: [vue(), Components({ resolvers: [BootstrapVueNextResolver()] })],
  test: {
    environment: 'jsdom',
    // The Vue compiler's `entities` dep decodes a base64 table at import time.
    // jsdom's atob is stricter than Node's and rejects it, so give jsdom a
    // Node-backed atob rather than pinning transitive dependency versions.
    setupFiles: ['./tests/setup.js'],
    include: ['tests/unit/**/*.spec.js'],
    globals: true
  }
})
