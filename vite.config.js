import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next/resolvers'

const resourcesReg = /\/resources\/[^\/\.]*\.[^\/\.]+$/i;
const pluginsReg = /\/plugins\/([^\/\.]*)\.[^\/\.]+$/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [BootstrapVueNextResolver()] }),
    splitVendorChunkPlugin()
  ],
  build: {
    assetsInlineLimit: 0, // We want to control of the caching of files
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (resourcesReg.test(assetInfo.name)) {
              return 'assets/resources/[name].[hash][extname]';
          } else {
              return 'assets/[name].[hash][extname]'
          }
        },
        manualChunks(id) {
          if (pluginsReg.test(id)) {
            return "vendor";
          }
        }
      }
    }
  }
})
