import { defineConfig } from 'vite'
import { unpluginFactory } from '../duck-cn/src'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unpluginFactory(
      {
        sex: 'male',
      },
      {
        framework: 'vite',
        watchMode: true,
      },
    ) as any,
  ],
})
