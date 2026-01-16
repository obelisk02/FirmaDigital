import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Configurar el proxy para las peticiones a la API
app.use('/api', createProxyMiddleware({
    target: 'https://tableroelectronico.michoacan.gob.mx/',
    changeOrigin: true,
    secure: false, // Si el certificado del servidor destino es auto-firmado
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] ${req.method} ${req.path} -> ${proxyReq.host}${proxyReq.path}`);
    },
    onError: (err, req, res) => {
        console.error('[Proxy Error]', err);
        res.status(500).send('Proxy Error');
    }
}));

// Manejar cualquier otra ruta devolviendo el index.html (para SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
