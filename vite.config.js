import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import topLevelAwait from 'vite-plugin-top-level-await';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: '/',
    build: {
      sourcemap: false
    },
    server: {
      open: true, // 运行后自动打开浏览器
      port: env.VITE_APP_PORT, // 挂载端口
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASEURL,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      topLevelAwait()
    ],
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
  })

}