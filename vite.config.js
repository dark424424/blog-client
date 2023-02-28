import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

let BASE_URL = 'https://blog-fire.herokuapp.com';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: BASE_URL || 'https://blog-fire.herokuapp.com/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/api',
                },
            },
        },
    },
});
