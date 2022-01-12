import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        // 'vue-i18n',
        // '@vueuse/head',
        // '@vueuse/core',
        // 'vitest',
      ],
    }),

    // Inspect the intermediate state of Vite plugins
    // Inspect(),

    Components({
      dirs: ['src/components', 'src/views'],

      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      // resolvers: [
      //   // auto import icons
      //   // https://github.com/antfu/unplugin-icons
      //   IconsResolver({
      //     componentPrefix: '',
      //     // enabledCollections: ['carbon']
      //   }),
      // ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
})
