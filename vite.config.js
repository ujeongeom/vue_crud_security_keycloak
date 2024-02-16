import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  //lcocal test 시 주석 삭제 
  // ---- Start -----
   server: {
     host: 'localhost',
     port: 3000,
     proxy: {
       '/api': {
         target: 'http://localhost:9080',
         changeOrigin: true
       }
     }
   },
  // ---- end -----
  //lcocal test 시 주석 삭제 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
