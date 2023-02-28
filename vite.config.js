import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: process.env.BASE_URL || 'https://blog-fire.herokuapp.com/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api',
                },
            },
        },
    },
});
