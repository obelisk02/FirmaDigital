import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import mkcert from 'vite-plugin-mkcert'
//, mkcert()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.key', '**/*.cer'],
  server: {
    proxy: {
      '/api': {
        target: 'https://tableroelectronico.michoacan.gob.mx/',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('❌ Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const fullUrl = options.target + proxyReq.path;
            console.log('📤 Enviando:', req.method, fullUrl);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('📥 Respuesta:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
})
