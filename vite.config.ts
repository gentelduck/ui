/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

import path from 'path'

import dts from 'vite-plugin-dts'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './libs/src/'),
        },
    },
    build: {
        lib: {
            entry: './duck-ui/index.ts',
            name: '@ahmedayob/duck-ui',
            fileName: (format) => `duck-ui.${format}.js`,
            formats: ['cjs', 'es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    test: {
        globals: true,
    },
    plugins: [dts()],
})
