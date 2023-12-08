import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

const resourcesReg = /\/resources\/[^\/\.]*\.[^\/\.]+$/i;
const pluginsReg = /\/plugins\/([^\/\.]*)\.[^\/\.]+$/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin()
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
          let pluginMatch = id.match(pluginsReg);
          if (pluginMatch != null) {
            return "vendor." + pluginMatch[1];
          }
        }
      }
    }
  }
})
