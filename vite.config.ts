/// <reference types="vitest" />
import { defineConfig } from 'vite'

import path from 'path'
import { devDependencies } from './package.json'
import dts from 'vite-plugin-dts'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './lib'),
        },
    },
    build: {
        lib: {
            entry: './lib/index.ts',
            name: 'vite-react-ts-button',
            fileName: (format) => `duck-ui.${format}.js`,
            formats: ['cjs', 'es'],
        },
        rollupOptions: {
            external: [...Object.keys(devDependencies)],
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
    plugins: [dts()],
})
